-- KTCC database schema. Apply in Supabase SQL Editor after creating a project.
-- Security: all writes require a session and are enforced by Row Level Security.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text,
 role text not null default 'visitor' check (role in ('visitor','creator','umkm','startup','community','space_manager','event_organizer','partner','admin')),
 created_at timestamptz not null default now()
);

create or replace function public.is_ktcc_admin() returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id=auth.uid() and role='admin') $$;
revoke all on function public.is_ktcc_admin() from public;
grant execute on function public.is_ktcc_admin() to authenticated;

create or replace function public.create_ktcc_profile() returns trigger
language plpgsql security definer set search_path = public
as $$ begin
 insert into public.profiles(id, display_name, role)
 values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name',''), 'visitor')
 on conflict (id) do nothing;
 return new;
end $$;
drop trigger if exists on_auth_user_created_ktcc on auth.users;
create trigger on_auth_user_created_ktcc after insert on auth.users
for each row execute procedure public.create_ktcc_profile();

create table if not exists public.listings (
 id uuid primary key default gen_random_uuid(),
 slug text not null unique,
 kind text not null check (kind in ('product','digital','creator','event','startup','space','initiative','community','opportunity','article')),
 owner_id uuid references auth.users(id) on delete set null,
 status text not null default 'pending' check (status in ('pending','published','archived')),
 data jsonb not null default '{}'::jsonb,
 source_url text,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 constraint listings_data_object check (jsonb_typeof(data)='object'),
 constraint published_verified_initiative check (
    status <> 'published' or kind <> 'initiative' or
    (source_url is not null and source_url like 'https://%')
 )
);
create index if not exists listings_public_kind on public.listings(kind, created_at desc) where status='published';
create index if not exists listings_owner on public.listings(owner_id);
create index if not exists listings_data_gin on public.listings using gin (data jsonb_path_ops);

create or replace function public.ktcc_set_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at=now(); return new; end $$;
drop trigger if exists listings_touch on public.listings;
create trigger listings_touch before update on public.listings
for each row execute procedure public.ktcc_set_updated_at();

alter table public.profiles enable row level security;
alter table public.listings enable row level security;

-- Profiles: owner can read their own profile, admin can review. No client update policy
-- to prevent a user escalating their own role. Edit roles only via trusted SQL/service role.
drop policy if exists "profiles_read_self_or_admin" on public.profiles;
create policy "profiles_read_self_or_admin" on public.profiles for select to authenticated
using (id=auth.uid() or public.is_ktcc_admin());

-- Everyone may view published entries. The owner may review their submissions.
drop policy if exists "listings_public_or_owner_select" on public.listings;
drop policy if exists "listings_public_read" on public.listings;
create policy "listings_public_read" on public.listings for select to anon
using (status='published');
create policy "listings_public_or_owner_select" on public.listings for select to authenticated
using (status='published' or owner_id=auth.uid() or public.is_ktcc_admin());

-- Public submissions are always pending; only an admin may submit approved records.
drop policy if exists "listings_authenticated_insert" on public.listings;
create policy "listings_authenticated_insert" on public.listings for insert to authenticated
with check (
 (owner_id=auth.uid() and status='pending') or public.is_ktcc_admin()
);

-- Owners may edit pending content only. Published content moderation is admin-only.
drop policy if exists "listings_owner_or_admin_update" on public.listings;
create policy "listings_owner_or_admin_update" on public.listings for update to authenticated
using ((owner_id=auth.uid() and status='pending') or public.is_ktcc_admin())
with check ((owner_id=auth.uid() and status='pending') or public.is_ktcc_admin());

drop policy if exists "listings_admin_delete" on public.listings;
create policy "listings_admin_delete" on public.listings for delete to authenticated
using (public.is_ktcc_admin());

-- Optional image bucket; uploads are private to each account's user-id prefix.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('ktcc-assets','ktcc-assets',true,5242880,array['image/png','image/jpeg','image/webp'])
on conflict (id) do nothing;

drop policy if exists "ktcc_assets_public_read" on storage.objects;
create policy "ktcc_assets_public_read" on storage.objects for select to anon,authenticated
using (bucket_id='ktcc-assets');

drop policy if exists "ktcc_assets_authenticated_upload" on storage.objects;
create policy "ktcc_assets_authenticated_upload" on storage.objects for insert to authenticated
with check (bucket_id='ktcc-assets' and (storage.foldername(name))[1]=auth.uid()::text);

drop policy if exists "ktcc_assets_owner_update" on storage.objects;
create policy "ktcc_assets_owner_update" on storage.objects for update to authenticated
using (bucket_id='ktcc-assets' and ((storage.foldername(name))[1]=auth.uid()::text or public.is_ktcc_admin()))
with check (bucket_id='ktcc-assets' and ((storage.foldername(name))[1]=auth.uid()::text or public.is_ktcc_admin()));

drop policy if exists "ktcc_assets_owner_delete" on storage.objects;
create policy "ktcc_assets_owner_delete" on storage.objects for delete to authenticated
using (bucket_id='ktcc-assets' and ((storage.foldername(name))[1]=auth.uid()::text or public.is_ktcc_admin()));

-- To grant admin role after signing in, run with trusted SQL Editor access:
-- update public.profiles set role='admin' where id='<verified-user-uuid>';
-- Never run role promotion from an untrusted client.

-- Self-service category selection for ordinary ecosystem participants.
-- Elevated 'admin' and 'partner' roles are deliberately excluded from self-service.
create or replace function public.ktcc_choose_member_role(chosen_role text, chosen_name text)
returns void language plpgsql security definer set search_path=public
as $$
begin
 if auth.uid() is null then raise exception 'Authentication required'; end if;
 if chosen_role not in ('visitor','creator','umkm','startup','community','space_manager','event_organizer')
 then raise exception 'This role requires partner/admin verification'; end if;
 if length(trim(chosen_name)) < 1 or length(chosen_name) > 120
 then raise exception 'Display name must be 1 to 120 characters'; end if;
 update public.profiles set role=chosen_role, display_name=trim(chosen_name)
 where id=auth.uid() and role<>'admin';
end $$;
revoke all on function public.ktcc_choose_member_role(text,text) from public;
grant execute on function public.ktcc_choose_member_role(text,text) to authenticated;
