import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xdangchukqpgbmawfpok.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkYW5nY2h1a3FwZ2JtYXdmcG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NzU4MTUsImV4cCI6MjA4NzA1MTgxNX0.fpPOwn60XOiOptXvcUMxY-hqQ2kcVSySNanHny2PVo4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'expedivet-auth',
    storage: window.localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  }
})