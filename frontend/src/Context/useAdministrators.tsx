import React, { useMemo, useState } from 'react'
import { LoginDataState } from './ContextTypes/AuthenticationTypes'
import { Administrator } from './ContextTypes/AdministratorsTypes'

function useAdministrators(loginData: LoginDataState, verifyUser: () => Promise<boolean>) {
  const [administrators, setAdministrators] = useState<Administrator[]>([
    {
      manager_id: "1",
      manager_name: "María González",
      manager_email: "maria.gonzalez@ejemplo.com",
      created_at: "12-04-2025 14:30",
      estado: true,
      is_master: true
    },
    {
      manager_id: "2",
      manager_name: "Juan Pérez",
      manager_email: "juan.perez@ejemplo.com",
      created_at: "15-04-2025 09:45",
      estado: false,
      is_master: false,
    },
    {
      manager_id: "3",
      manager_name: "Ana Rodríguez",
      manager_email: "ana.rodriguez@ejemplo.com",
      created_at: "18-04-2025 16:20",
      estado: false,
      is_master: false,
    },
    {
      manager_id: "4",
      manager_name: "Luis Martínez",
      manager_email: "luis.martinez@ejemplo.com",
      created_at: "20-04-2025 11:15",
      estado: true,
      is_master: false
    },
  ])
  return useMemo(() => ({
    administrators
  }), [
    administrators,
  ])
}

export default useAdministrators
