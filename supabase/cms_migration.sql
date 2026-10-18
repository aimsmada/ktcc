-- KTCC Content Studio v2. Run schema.sql FIRST, then this file in the same Supabase project.
-- Run as a trusted Supabase SQL Editor administrator, not through public browser clients.

create table if not exists public.site_settings (
  key text primary key check (length(key) <= 100),
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);
create table if not exists public.site_pages (
  path text primary key check (path ~ '^/[a-z0-9/-]*$' and length(path) <= 120),
  eyebrow text not null default '',
  title text not null default '',
  accent text not null default '',
  description text not null default '',
  hero_media_url text not null default '',
  hero_media_type text not null default 'image' check (hero_media_type in ('image','video','gif')),
  seo_title text not null default '',
  seo_description text not null default '',
  published boolean not null default true,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);
create table if not exists public.site_sections (
  id uuid primary key default gen_random_uuid(),
  page_path text not null references public.site_pages(path) on delete cascade,
  section_type text not null check (section_type in ('text','feature','image','video','gallery','cta','quote','embed')),
  title text not null default '',
  eyebrow text not null default '',
  body text not null default '',
  media_url text not null default '',
  media_alt text not null default '',
  action_label text not null default '',
  action_url text not null default '',
  media_items jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint section_media_items_array check (jsonb_typeof(media_items)='array')
);
create index if not exists site_sections_published_sort on public.site_sections(page_path,sort_order) where published;
create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'ktcc-assets',
  path text not null unique,
  public_url text not null,
  file_name text not null,
  mime_type text not null,
  bytes bigint not null check (bytes >= 0),
  alt_text text not null default '',
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create table if not exists public.engagement_requests (
 id uuid primary key default gen_random_uuid(),
 listing_id uuid not null references public.listings(id) on delete cascade,
 requester_id uuid not null references auth.users(id) on delete cascade,
 request_type text not null check (request_type in ('event_registration','space_enquiry','collaboration')),
 message text not null default '',
 requested_date date,
 requested_slot text,
 status text not null default 'received' check (status in ('received','reviewing','accepted','declined')),
 created_at timestamptz not null default now()
);
create index if not exists engagement_admin_date on public.engagement_requests(created_at desc);

-- Ensure all public data tables are subject to RLS, with public reading only published items.
alter table public.site_settings enable row level security;
alter table public.site_pages enable row level security;
alter table public.site_sections enable row level security;
alter table public.media_assets enable row level security;
alter table public.engagement_requests enable row level security;

create policy "site_settings_public_read" on public.site_settings for select to anon,authenticated using (true);
create policy "site_settings_admin_write" on public.site_settings for all to authenticated using (public.is_ktcc_admin()) with check (public.is_ktcc_admin());
create policy "pages_public_read" on public.site_pages for select to anon using (published);
create policy "pages_member_read" on public.site_pages for select to authenticated using (published or public.is_ktcc_admin());
create policy "pages_admin_write" on public.site_pages for all to authenticated using (public.is_ktcc_admin()) with check (public.is_ktcc_admin());
create policy "sections_public_read" on public.site_sections for select to anon using (published and exists (select 1 from public.site_pages p where p.path=page_path and p.published));
create policy "sections_member_read" on public.site_sections for select to authenticated using ((published and exists (select 1 from public.site_pages p where p.path=page_path and p.published)) or public.is_ktcc_admin());
create policy "sections_admin_write" on public.site_sections for all to authenticated using (public.is_ktcc_admin()) with check (public.is_ktcc_admin());
create policy "media_assets_public_read" on public.media_assets for select to anon,authenticated using (true);
create policy "media_assets_admin_write" on public.media_assets for all to authenticated using (public.is_ktcc_admin()) with check (public.is_ktcc_admin());
create policy "engagement_request_self_read" on public.engagement_requests for select to authenticated using (requester_id=auth.uid() or public.is_ktcc_admin());
create policy "engagement_request_self_create" on public.engagement_requests for insert to authenticated with check (requester_id=auth.uid() and status='received' and exists (select 1 from public.listings l where l.id=listing_id and l.status='published'));
create policy "engagement_request_admin_update" on public.engagement_requests for update to authenticated using (public.is_ktcc_admin()) with check (public.is_ktcc_admin());

-- File storage (image/GIF/video), upload/delete by verified admins only.
-- Upload from browser directly to Supabase Storage after an authenticated session.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('ktcc-assets','ktcc-assets',true,52428800,array['image/png','image/jpeg','image/webp','image/gif','image/avif','video/mp4','video/webm'])
on conflict (id) do update set file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types,public=true;

-- Important: schema.sql had a user-prefix upload policy; remove it to make media library admin-only.
drop policy if exists "ktcc_assets_authenticated_upload" on storage.objects;
drop policy if exists "ktcc_assets_owner_update" on storage.objects;
drop policy if exists "ktcc_assets_owner_delete" on storage.objects;
create policy "ktcc_media_admin_upload" on storage.objects for insert to authenticated with check (bucket_id='ktcc-assets' and public.is_ktcc_admin());
create policy "ktcc_media_admin_update" on storage.objects for update to authenticated using (bucket_id='ktcc-assets' and public.is_ktcc_admin()) with check (bucket_id='ktcc-assets' and public.is_ktcc_admin());
create policy "ktcc_media_admin_delete" on storage.objects for delete to authenticated using (bucket_id='ktcc-assets' and public.is_ktcc_admin());

-- Server-side trigger stamps (database is source of truth, never trust client updated_at).
drop trigger if exists site_settings_touch on public.site_settings;
create trigger site_settings_touch before update on public.site_settings for each row execute procedure public.ktcc_set_updated_at();
drop trigger if exists site_pages_touch on public.site_pages;
create trigger site_pages_touch before update on public.site_pages for each row execute procedure public.ktcc_set_updated_at();
drop trigger if exists site_sections_touch on public.site_sections;
create trigger site_sections_touch before update on public.site_sections for each row execute procedure public.ktcc_set_updated_at();

-- Initialize editable branding, contact and menu defaults (real contact details must be added by an admin).
insert into public.site_settings(key,value) values
 ('branding', '{"siteName":"Kutai Timur Creative Center","tagline":"Kutim First — Kaltim Connected — Global Ready","logoUrl":"/brand/ktcc-logo.webp","footerText":"© 2026 KTCC. All rights reserved.","contactEmail":"","instagram":"","youtube":""}'::jsonb),
 ('navigation','{"links":[{"label":"Discover","href":"/discover"},{"label":"Market","href":"/market"},{"label":"Creators","href":"/creators"},{"label":"Events","href":"/events"},{"label":"Startups","href":"/startups"},{"label":"Spaces","href":"/spaces"},{"label":"Kutim 2045","href":"/future"}]}'::jsonb)
on conflict (key) do nothing;

-- Grant an admin only after a trusted account has signed in:
-- update public.profiles set role='admin' where id='<trusted-user-id>';
-- This script creates no public administrator credentials and no fake government projects.
