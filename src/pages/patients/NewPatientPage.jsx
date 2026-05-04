import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPatient } from '../../api/patients'
import { useAuth } from '../../context/AuthContext'

export function NewPatientPage() {
  const { clinicId } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    name: '',
    species: '',
    breed: '',
    sex: '',
    birth_date: '',
    weight_kg: '',
    microchip: '',
    sterilized: false,
    notes: '',
  })

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await createPatient({
        ...form,
        clinic_id: clinicId,
        weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
        birth_date: form.birth_date || null,
      })
      navigate('/patients')
    } catch (e) {
      setError('Ocurrió un error al guardar el paciente.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate('/patients')} className="text-gray-400 hover:text-gray-600">←</button>
        <h1 className="text-lg font-semibold text-gray-900">Nuevo paciente</h1>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input name="name" value={form.name} onChange={handleChange} required
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Especie *</label>
              <select name="species" value={form.species} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Seleccionar</option>
                <option>Canino</option>
                <option>Felino</option>
                <option>Ave</option>
                <option>Reptil</option>
                <option>Bovino</option>
                <option>Equino</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Raza</label>
              <input name="breed" value={form.breed} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
              <select name="sex" value={form.sex} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Seleccionar</option>
                <option value="M">Macho</option>
                <option value="F">Hembra</option>
                <option value="desconocido">Desconocido</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
              <input name="birth_date" type="date" value={form.birth_date} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
              <input name="weight_kg" type="number" step="0.01" value={form.weight_kg} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Microchip</label>
              <input name="microchip" value={form.microchip} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input name="sterilized" type="checkbox" checked={form.sterilized} onChange={handleChange}
              className="rounded border-gray-300 text-green-600" />
            <label className="text-sm text-gray-700">Esterilizado</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate('/patients')}
              className="flex-1 border border-gray-200 text-gray-600 font-medium py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50">
              {loading ? 'Guardando...' : 'Guardar paciente'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}