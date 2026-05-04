import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPatients } from '../../api/patients'
import { useAuth } from '../../context/AuthContext'

export function PatientsPage() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { user, clinicUser } = useAuth()

  useEffect(() => {
    console.log('usuario:', user)
    console.log('clinicUser:', clinicUser)

    if (!clinicUser) {
      console.log('esperando clinicUser...')
      return
    }

    async function load() {
      console.log('iniciando carga de pacientes')
      try {
        const data = await getPatients()
        console.log('pacientes:', data)
        setPatients(data ?? [])
      } catch (e) {
        console.error('error:', e)
        setPatients([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [clinicUser])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Cargando pacientes...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">ExpediVet</h1>
        <button
          onClick={() => navigate('/patients/new')}
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Nuevo paciente
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Pacientes</h2>

        {patients.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <p className="text-gray-400 text-sm">No hay pacientes registrados todavía.</p>
            <button
              onClick={() => navigate('/patients/new')}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Registrar primer paciente
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {patients.map(patient => (
              <div
                key={patient.id}
                onClick={() => navigate(`/patients/${patient.id}`)}
                className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex items-center justify-between cursor-pointer hover:border-green-200 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">{patient.name}</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {patient.species}{patient.breed ? ` · ${patient.breed}` : ''}{patient.owners?.full_name ? ` · ${patient.owners.full_name}` : ''}
                  </p>
                </div>
                <span className="text-gray-300 text-lg">→</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}