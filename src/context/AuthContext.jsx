import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [clinicUser, setClinicUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await loadClinicUser(session.user.id)
        } else {
          setClinicUser(null)
        }
        setLoading(false)
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  async function loadClinicUser(authUserId) {
    const { data } = await supabase
      .from('clinic_users')
      .select('*, clinics(*)')
      .eq('auth_user_id', authUserId)
      .single()
    setClinicUser(data)
  }

  const value = {
    user,
    clinicUser,
    loading,
    role: clinicUser?.role,
    clinicId: clinicUser?.clinic_id,
    clinic: clinicUser?.clinics,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)