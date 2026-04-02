-- Run in Supabase → SQL Editor.
-- Default bucket id matches src/lib/storagePublicUrl.ts (override with VITE_SUPABASE_STORAGE_BUCKET).
--
-- If the INSERT below fails (permissions), create the bucket in Dashboard → Storage
-- (name exactly as id, enable "Public bucket"), then run only the CREATE POLICY block.

-- 1) Bucket — must be public so getPublicUrl() works in the browser without signed URLs.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'fotografie-opowiedziane-swiatlem',
  'fotografie-opowiedziane-swiatlem',
  true,
  52428800,
  array['image/jpeg', 'image/png', 'image/webp']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 2) Allow anyone to read objects (needed if RLS is enabled on storage.objects).
drop policy if exists "Public read portfolio images"
  on storage.objects;

create policy "Public read portfolio images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'fotografie-opowiedziane-swiatlem');

-- 3) Upload files in Dashboard → Storage → this bucket, matching paths in src/data/portfolio.ts
--    (e.g. portfolio/sesja-narzeczenska/…jpg) and src/data/site.ts (about/profile.jpg or your path)
--
-- If you use a subfolder for all uploads, set VITE_SUPABASE_STORAGE_PREFIX in .env.local
-- (no leading/trailing slash), e.g. uploads → object key becomes uploads/realizacje/01.jpg
