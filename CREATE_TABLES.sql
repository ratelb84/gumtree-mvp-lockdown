-- Gumtree MVP Board - CREATE TABLES
-- Copy and paste this ENTIRE script into Supabase SQL Editor
-- Go to: https://app.supabase.com/projects/hqfszlxdkvwlvpwqqmbd/sql
-- Click "New Query", paste this, then click "RUN"

-- Step 1: Create users table
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  created_at timestamp default now()
);

-- Step 2: Create features table
create table if not exists public.features (
  id text primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  description text,
  category text not null,
  column_name text not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Step 3: Create indexes for performance
create index if not exists features_user_id_idx on public.features(user_id);
create index if not exists features_column_name_idx on public.features(column_name);

-- Step 4: Enable realtime
alter publication supabase_realtime add table public.features;

-- Step 5: Enable Row Level Security
alter table public.features enable row level security;

-- Step 6: Create RLS Policies
create policy "Users can view own features"
  on public.features for select
  using (auth.uid() = user_id);

create policy "Users can insert own features"
  on public.features for insert
  with check (auth.uid() = user_id);

create policy "Users can update own features"
  on public.features for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own features"
  on public.features for delete
  using (auth.uid() = user_id);

-- Done! Your database is ready for the Gumtree MVP Board
