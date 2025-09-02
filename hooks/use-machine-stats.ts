"use client"

import { useState, useEffect } from "react"

interface MachineStats {
  total: number
  active: number
  inactive: number
  maintenance: number
  error: number
  averageEfficiency: number
  byType: {
    CNC: number
    TORNO: number
    FRESADORA: number
    PRENSA: number
    SOLDADORA: number
  }
}

export function useMachineStats() {
  const [stats, setStats] = useState<MachineStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/machines/stats")
      const result = await response.json()

      if (result.success) {
        setStats(result.data)
        setError(null)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("Erro ao carregar estatísticas")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()

    // Atualizar estatísticas a cada 30 segundos
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}
