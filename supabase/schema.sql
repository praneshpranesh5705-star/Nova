-- NOVA HUB foundation schema
-- Run this in the Supabase SQL Editor after creating your project.
create extension if not exists pgcrypto;
create extension if not exists vector;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  file_path text,
  mime_type text,
  status text not null default 'uploaded' check (status in ('uploaded','processing','indexed','failed')),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  chunk_index integer not null default 0,
  embedding vector(1536),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.content (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('article','book','chapter')),
  title text not null,
  slug text unique not null,
  body text not null default '',
  status text not null default 'draft' check (status in ('draft','review','published')),
  topics text[] not null default '{}',
  cover_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete set null,
  name text not null,
  description text,
  project_type text not null default 'general',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.sensor_readings (
  id bigint generated always as identity primary key,
  project_id uuid not null references public.projects(id) on delete cascade,
  device_id text not null,
  moisture numeric,
  temperature numeric,
  humidity numeric,
  payload jsonb not null default '{}',
  recorded_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.documents enable row level security;
alter table public.knowledge_chunks enable row level security;
alter table public.content enable row level security;
alter table public.projects enable row level security;
alter table public.sensor_readings enable row level security;

create policy "profiles own" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "documents own" on public.documents for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "chunks own" on public.knowledge_chunks for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "content owner" on public.content for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "published content readable" on public.content for select using (status = 'published' or auth.uid() = owner_id);
create policy "projects own" on public.projects for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "sensor project owner" on public.sensor_readings for all using (exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid())) with check (exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid()));

create index if not exists knowledge_chunks_document_idx on public.knowledge_chunks(document_id);
create index if not exists sensor_readings_project_time_idx on public.sensor_readings(project_id, recorded_at desc);
