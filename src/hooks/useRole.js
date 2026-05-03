import { useAuth } from '../context/AuthContext'

export function useRole() {
  const { role, clinicUser } = useAuth()

  return {
    isTitular: role === 'titular',
    isContratado: role === 'contratado',
    isRecepcionista: role === 'recepcionista',
    canViewRecords: ['titular', 'contratado'].includes(role),
    canEdit: (vetId) =>
      role === 'titular' || (role === 'contratado' && vetId === clinicUser?.id),
    canDelete: role === 'titular',
    canPrescribe: ['titular', 'contratado'].includes(role),
  }
}