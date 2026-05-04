import { supabase } from '../lib/supabaseClient'

export async function getPatients() {
  const { data, error } = await supabase
    .from('patients')
    .select('*, owners(full_name, phone)')
    .order('created_at', { ascending: false })
  
  console.log('patients data:', data)
  console.log('patients error:', error)
  
  if (error) throw error
  return data ?? []
}

export async function getPatientById(id) {
  const { data, error } = await supabase
    .from('patients')
    .select('*, owners(full_name, phone, email)')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export async function createPatient(patient) {
  const { data, error } = await supabase
    .from('patients')
    .insert(patient)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updatePatient(id, updates) {
  const { data, error } = await supabase
    .from('patients')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}