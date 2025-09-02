"use client"

import { useState, useEffect } from "react"
import type { Alert } from "@/lib/types"

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAlerts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/alerts")
      const result = await response.json()

      if (result.success) {
        setAlerts(result.data)
        setUnreadCount(result.data.filter((alert: Alert) => !alert.isRead).length)
        setError(null)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("Erro ao carregar alertas")
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/alerts/${id}/read`, {
        method: "PATCH",
      })

      const result = await response.json()
      if (result.success) {
        setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, isRead: true } : alert)))
        setUnreadCount((prev) => Math.max(0, prev - 1))
        return true
      } else {
        setError(result.error)
        return false
      }
    } catch (err) {
      setError("Erro ao marcar alerta como lido")
      return false
    }
  }

  const createAlert = async (alertData: {
    type: Alert["type"]
    severity: Alert["severity"]
    message: string
    machineId?: string
    operatorId?: string
  }) => {
    try {
      const response = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alertData),
      })

      const result = await response.json()
      if (result.success) {
        setAlerts((prev) => [result.data, ...prev])
        setUnreadCount((prev) => prev + 1)
        return result.data
      } else {
        setError(result.error)
        return null
      }
    } catch (err) {
      setError("Erro ao criar alerta")
      return null
    }
  }

  useEffect(() => {
    fetchAlerts()

    // Atualizar alertas a cada 30 segundos
    const interval = setInterval(fetchAlerts, 30000)
    return () => clearInterval(interval)
  }, [])

  return {
    alerts,
    unreadCount,
    loading,
    error,
    refetch: fetchAlerts,
    markAsRead,
    createAlert,
  }
}
