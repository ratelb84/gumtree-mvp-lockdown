// Setup script to initialize Supabase database
// Run with: node setup-supabase.js

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hqfszlxdkvwlvpwqqmbd.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZnN6bHhka3Z3bHZwd3FxbWJkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjU1MTE4OCwiZXhwIjoyMDg4MTI3MTg4fQ.EAOsrTO51SrDiyRz5DHp0uGYSpUSans-uNlqZcABPyk';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function setupDatabase() {
    try {
        console.log('🔧 Setting up Supabase...');
        
        // Create users table
        const { error: usersError } = await supabase.rpc('exec', {
            sql: `
                create table if not exists public.users (
                    id uuid primary key default gen_random_uuid(),
                    email text unique not null,
                    name text,
                    created_at timestamp default now()
                );
            `
        });
        
        if (usersError && !usersError.message.includes('already exists')) {
            console.error('Users table error:', usersError);
        }

        // Create features table
        const { error: featuresError } = await supabase.rpc('exec', {
            sql: `
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
            `
        });

        if (featuresError && !featuresError.message.includes('already exists')) {
            console.error('Features table error:', featuresError);
        }

        console.log('✅ Database schema ready!');
        console.log('📝 Project URL:', SUPABASE_URL);
        
    } catch (e) {
        console.error('Setup error:', e);
    }
}

setupDatabase();
