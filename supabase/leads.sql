-- Run in Supabase SQL Editor. Adjust RLS policies for production.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  event_date date,
  location text,
  message text,
  source text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "Allow anonymous insert"
  on public.leads
  for insert
  to anon
  with check (true);

-- Optional: deny select/update/delete for anon
-- create policy "No public read" on public.leads for select to anon using (false);
