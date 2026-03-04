-- Gumtree MVP Board - Database Setup
-- Copy and paste this entire script into Supabase SQL Editor and click RUN

-- Create users table
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  created_at timestamp default now()
);

-- Create features table
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

-- Create indexes
create index if not exists features_user_id_idx on public.features(user_id);
create index if not exists features_column_name_idx on public.features(column_name);

-- Enable realtime for features
alter publication supabase_realtime add table public.features;

-- Row Level Security (RLS) Policies

-- Allow all authenticated users to read/write their own data
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

-- Enable RLS on tables
alter table public.features enable row level security;

-- Success!
-- Your database is now ready for the Gumtree MVP Board.
