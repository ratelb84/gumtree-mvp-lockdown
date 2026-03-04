#!/bin/bash

SUPABASE_URL="https://hqfszlxdkvwlvpwqqmbd.supabase.co"
SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZnN6bHhka3Z3bHZwd3FxbWJkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjU1MTE4OCwiZXhwIjoyMDg4MTI3MTg4fQ.EAOsrTO51SrDiyRz5DHp0uGYSpUSans-uNlqZcABPyk"

echo "🔧 Setting up Supabase tables..."

# Create users table
curl -X POST "$SUPABASE_URL/rest/v1/rpc/exec" \
  -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "sql": "create table if not exists public.users (id uuid primary key default gen_random_uuid(), email text unique not null, name text, created_at timestamp default now());"
  }' 2>/dev/null

# Create features table  
curl -X POST "$SUPABASE_URL/rest/v1/rpc/exec" \
  -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "sql": "create table if not exists public.features (id text primary key, user_id uuid not null references public.users(id) on delete cascade, title text not null, description text, category text not null, column_name text not null, created_at timestamp default now(), updated_at timestamp default now());"
  }' 2>/dev/null

echo "✅ Setup complete!"
echo "📍 Project URL: $SUPABASE_URL"
