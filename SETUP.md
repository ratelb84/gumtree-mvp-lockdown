# Gumtree MVP Lockdown - Database Setup

## Status
- ✅ Code deployed to Vercel
- ✅ Script ready to seed features
- ⏳ Database table needs to be created (Docker network restrictions prevent autonomous setup)

## How to Run Setup Locally

The `create-and-seed-autonomous.js` script is ready to run on your Mac or any machine with network access to Supabase.

### Prerequisites
```bash
npm install pg
```

### Run Setup
```bash
node create-and-seed-autonomous.js
```

This will:
1. Connect directly to Supabase PostgreSQL
2. Create the `features` table
3. Insert all 34 MVP features

### Why Not from Docker?
The Hostinger Docker container has network restrictions that block:
- Direct PostgreSQL connections
- External API requests to `metals.live`, `wttr.in`, etc.

This is a platform limitation, not a code issue.

## Database Credentials
- **Host:** `db.hqfszlxdkvwlvpwqqmbd.supabase.co`
- **Port:** 5432
- **User:** postgres
- **Password:** Stored in `create-and-seed-autonomous.js`
- **Database:** postgres

## Next Steps
1. Run `node create-and-seed-autonomous.js` from your Mac
2. Visit https://gumtree-mvp-lockdown.vercel.app
3. Log in (any of: don/betine/damian/pedro)
4. MVP board will load features from Supabase in real-time
