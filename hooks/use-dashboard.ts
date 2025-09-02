"use client"

import { useState, useEffect } from "react"

interface DashboardStats {
  machinesActive: number
  machinesTotal: number
  machineEfficiency: number
  currentShift: string
  shiftEfficiency: number
  alertsCount: number
  criticalAlerts: number
}

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/dashboard")
      const result = await response.json()

      if (result.success) {
        setStats(result.data)
        setError(null)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("Erro ao carregar dashboard")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()

    // Atualizar dashboard a cada 10 segundos
    const interval = setInterval(fetchStats, 10000)
    return () => clearInterval(interval)
  }, [])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}
