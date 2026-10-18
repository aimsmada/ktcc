-- KTCC v3 visual editor. Execute after schema.sql and cms_migration.sql.
-- Published overrides customize ANY directly visible text node, media source, or link.
-- All writes restricted to verified admins through RLS.
create table if not exists public.visual_overrides (
  page_path text not null check (page_path = 'global' or (page_path ~ '^/[a-z0-9/-]*$' and length(page_path) <= 120)),
  element_key text not null check (length(element_key) between 1 and 600),
  content_type text not null check (content_type in ('text','media','link','placeholder')),
  content_value text not null check (length(content_value) <= 25000),
  published boolean not null default true,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now(),
  primary key (page_path, element_key)
);
create index if not exists ktcc_visual_overrides_pub on public.visual_overrides(page_path) where published;
alter table public.visual_overrides enable row level security;
drop policy if exists "ktcc_visual_public_read" on public.visual_overrides;
create policy "ktcc_visual_public_read" on public.visual_overrides for select to anon
using (published);
drop policy if exists "ktcc_visual_member_read" on public.visual_overrides;
create policy "ktcc_visual_member_read" on public.visual_overrides for select to authenticated
using (published or public.is_ktcc_admin());
drop policy if exists "ktcc_visual_admin_insert" on public.visual_overrides;
create policy "ktcc_visual_admin_insert" on public.visual_overrides for insert to authenticated
with check (public.is_ktcc_admin());
drop policy if exists "ktcc_visual_admin_update" on public.visual_overrides;
create policy "ktcc_visual_admin_update" on public.visual_overrides for update to authenticated
using (public.is_ktcc_admin()) with check (public.is_ktcc_admin());
drop policy if exists "ktcc_visual_admin_delete" on public.visual_overrides;
create policy "ktcc_visual_admin_delete" on public.visual_overrides for delete to authenticated
using (public.is_ktcc_admin());
-- Brand colors and custom images are JSON values stored in site_settings ('appearance').
