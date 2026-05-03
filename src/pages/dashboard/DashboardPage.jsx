import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export function DashboardPage() {
  const { clinic, clinicUser, role } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">ExpediVet</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{clinicUser?.full_name}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Bienvenido, {clinicUser?.full_name}
          </h2>
          <p className="text-gray-500 mt-1">{clinic?.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500">Rol</p>
            <p className="text-lg font-medium text-gray-900 mt-1 capitalize">{role}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500">Clínica</p>
            <p className="text-lg font-medium text-gray-900 mt-1">{clinic?.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}