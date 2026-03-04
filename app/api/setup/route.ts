import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hqfszlxdkvwlvpwqqmbd.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZnN6bHhka3Z3bHZwd3FxbWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NTExODgsImV4cCI6MjA4ODEyNzE4OH0.4OlPny5uJFTslf6iWfF7fAaVl0x2I_VG63QPa1Amq8Q'

export async function GET() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

    // Try to query features - if table doesn't exist, it will fail
    const { data, error } = await supabase.from('features').select('count()').limit(0)

    if (error && error.code === 'PGRST205') {
      // Table doesn't exist - we can't create it with anon key
      return Response.json(
        {
          status: 'error',
          message: 'Features table does not exist',
          code: 'TABLE_NOT_FOUND',
          solution: 'Use Supabase dashboard SQL Editor to create the table',
        },
        { status: 500 }
      )
    }

    if (error) {
      throw error
    }

    return Response.json({
      status: 'ok',
      message: 'Features table exists and is accessible',
      dataCount: data?.length || 0,
    })
  } catch (err: any) {
    return Response.json(
      {
        status: 'error',
        message: err?.message || 'Setup check failed',
        details: err,
      },
      { status: 500 }
    )
  }
}
