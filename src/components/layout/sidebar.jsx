import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabaseClient'

const menuItems = [
  { label: 'Inicio', path: '/dashboard', icon: '🏠' },
  { label: 'Pacientes', path: '/patients', icon: '🐾' },
  { label: 'Expedientes', path: '/records', icon: '📋' },
  { label: 'Vacunas', path: '/vaccinations', icon: '💉' },
  { label: 'Recetas', path: '/prescriptions', icon: '📝' },
  { label: 'Citas', path: '/appointments', icon: '📅' },
]

const settingsItems = [
  { label: 'Configuración', path: '/settings', icon: '⚙️', roles: ['titular'] },
]

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { clinic, clinicUser, role } = useAuth()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="w-60 min-h-screen bg-white border-r border-gray-100 flex flex-col">
      <div className="px-5 py-5 border-b border-gray-100">
        <p className="text-base font-semibold text-gray-900">ExpediVet</p>
        <p className="text-xs text-gray-400 mt-0.5">{clinic?.name}</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
              location.pathname === item.path
                ? 'bg-green-50 text-green-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        <div className="pt-4 border-t border-gray-100 mt-4 space-y-1">
          {settingsItems
            .filter(item => !item.roles || item.roles.includes(role))
            .map(item => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                  location.pathname === item.path
                    ? 'bg-green-50 text-green-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
        </div>
      </nav>

      <div className="px-5 py-4 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-700">{clinicUser?.full_name}</p>
        <p className="text-xs text-gray-400 capitalize">{role}</p>
        <button
          onClick={handleLogout}
          className="mt-2 text-xs text-gray-400 hover:text-gray-600"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}