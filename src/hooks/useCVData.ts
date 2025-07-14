'use client'

import { useLocalStorage } from './useLocalStorage'
import { CVData } from '@/types/cv'

interface CVSession {
  originalDescription: string
  cvData: CVData | null
  timestamp: number
}

const STORAGE_KEY = 'micv-cv-session'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 horas en milisegundos

export function useCVData() {
  const [session, setSession, removeSession] = useLocalStorage<CVSession | null>(STORAGE_KEY, null)

  // Verificar si la sesión es válida (no ha expirado)
  const isSessionValid = (session: CVSession | null): boolean => {
    if (!session) return false
    
    const now = Date.now()
    const isExpired = now - session.timestamp > SESSION_DURATION
    
    if (isExpired) {
      removeSession()
      return false
    }
    
    return true
  }

  // Guardar datos del CV en la sesión
  const saveCVData = (description: string, cvData: CVData) => {
    const newSession: CVSession = {
      originalDescription: description,
      cvData,
      timestamp: Date.now()
    }
    setSession(newSession)
  }

  // Obtener datos del CV de la sesión
  const getCVData = (): { description: string; cvData: CVData } | null => {
    if (!isSessionValid(session)) {
      return null
    }
    
    return {
      description: session!.originalDescription,
      cvData: session!.cvData!
    }
  }

  // Verificar si hay datos para una descripción específica
  const hasDataForDescription = (description: string): boolean => {
    if (!isSessionValid(session)) {
      return false
    }
    
    // Comparar las descripciones (ignorando espacios en blanco extra)
    const normalizedStored = session!.originalDescription.trim().toLowerCase()
    const normalizedInput = description.trim().toLowerCase()
    
    return normalizedStored === normalizedInput
  }

  // Limpiar la sesión
  const clearSession = () => {
    removeSession()
  }

  // Verificar si hay una sesión activa
  const hasActiveSession = (): boolean => {
    return isSessionValid(session)
  }

  return {
    saveCVData,
    getCVData,
    hasDataForDescription,
    clearSession,
    hasActiveSession,
    currentSession: session
  }
}
