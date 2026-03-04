# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to https://app.supabase.com
2. Click **New Project**
3. Name: `gumtree-mvp`
4. Password: Save this safely
5. Region: Choose closest to you (e.g., Europe or Africa if available)
6. Wait for it to initialize (~2 min)

## Step 2: Get Your Credentials

1. In Supabase Dashboard → **Settings** → **API**
2. Copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (in "Project API keys")

## Step 3: Create Database Tables

1. Go to **SQL Editor** in Supabase
2. Create new query and paste this:

```sql
-- Create users table
create table public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  created_at timestamp default now()
);

-- Create features table
create table public.features (
  id text primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  description text,
  category text not null,
  column_name text not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Create indexes for faster queries
create index features_user_id_idx on public.features(user_id);
create index features_column_name_idx on public.features(column_name);

-- Enable realtime for features table
alter publication supabase_realtime add table public.features;
```

3. Click **Run**

## Step 4: Set Row Level Security (RLS)

1. Go to **Authentication** → **Policies** → **features** table
2. Create policy:
   - Name: `Users can see their own features`
   - Statement: `SELECT` 
   - Check: `auth.uid() = user_id`
3. Create another:
   - Name: `Users can insert their own features`
   - Statement: `INSERT`
   - Check: `auth.uid() = user_id`
4. Create another:
   - Name: `Users can update their own features`
   - Statement: `UPDATE`
   - Check: `auth.uid() = user_id`
5. Create another:
   - Name: `Users can delete their own features`
   - Statement: `DELETE`
   - Check: `auth.uid() = user_id`

## Step 5: Configure Board

1. Open https://gumtree-mvp-lockdown.vercel.app
2. Press F12 (Developer Console)
3. Paste this:

```javascript
localStorage.setItem('supabase_url', 'YOUR_PROJECT_URL');
localStorage.setItem('supabase_key', 'YOUR_ANON_KEY');
```

Replace with your actual credentials from Step 2.

4. Press Enter and refresh the page

## Step 6: Test

1. Sign up with email + password
2. Add a feature
3. Open board in another browser → should see same features in real-time
4. Changes appear instantly across all users

## Done!

Your board now has:
- ✅ Real-time sync across all users
- ✅ Persistent cloud database (PostgreSQL)
- ✅ Secure authentication
- ✅ User isolation (each user sees only their features)

If you hit issues, let me know!
