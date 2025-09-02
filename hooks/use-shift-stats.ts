"use client"

import { useState, useEffect } from "react"

interface ShiftStats {
  totalShifts: number
  currentShift: string
  currentShiftType: string | null
  currentEfficiency: number
  currentTarget: number
  currentActual: number
  dailyStats: {
    morning: { target: number; actual: number; efficiency: number }
    afternoon: { target: number; actual: number; efficiency: number }
    night: { target: number; actual: number; efficiency: number }
  }
  averageEfficiency: number
}

export function useShiftStats() {
  const [stats, setStats] = useState<ShiftStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/shifts/stats")
      const result = await response.json()

      if (result.success) {
        setStats(result.data)
        setError(null)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("Erro ao carregar estatísticas dos turnos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()

    // Atualizar estatísticas a cada 2 minutos
    const interval = setInterval(fetchStats, 120000)
    return () => clearInterval(interval)
  }, [])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}
