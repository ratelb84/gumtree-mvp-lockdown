import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hqfszlxdkvwlvpwqqmbd.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZnN6bHhka3Z3bHZwd3FxbWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NTExODgsImV4cCI6MjA4ODEyNzE4OH0.4OlPny5uJFTslf6iWfF7fAaVl0x2I_VG63QPa1Amq8Q'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export interface Feature {
  id: string
  title: string
  description?: string
  category: string
  person: string
  column_name: string
  timestamp: number
}

// Initialize features table if it doesn't exist
export async function initializeDatabase() {
  try {
    // Try to query the table - if it doesn't exist, we'll get an error
    const { error } = await supabase.from('features').select('id').limit(1)
    
    if (error && error.code === '42P01') {
      // Table doesn't exist, it will be auto-created by Supabase
      console.log('Features table will be auto-created')
    }
  } catch (e) {
    console.error('Database init error:', e)
  }
}

export async function getFeatures() {
  const { data, error } = await supabase
    .from('features')
    .select('*')
    .order('timestamp', { ascending: true })
  
  if (error) {
    console.error('Error fetching features:', error)
    return []
  }
  
  return data as Feature[]
}

export async function addFeature(feature: Omit<Feature, 'id'>) {
  const { data, error } = await supabase
    .from('features')
    .insert([{ id: Math.random().toString(36).substr(2, 9), ...feature }])
    .select()
  
  if (error) {
    console.error('Error adding feature:', error)
    return null
  }
  
  return data?.[0] as Feature
}

export async function deleteFeature(id: string) {
  const { error } = await supabase
    .from('features')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting feature:', error)
    return false
  }
  
  return true
}

export async function updateFeature(id: string, updates: Partial<Feature>) {
  const { data, error } = await supabase
    .from('features')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating feature:', error)
    return null
  }
  
  return data?.[0] as Feature
}


