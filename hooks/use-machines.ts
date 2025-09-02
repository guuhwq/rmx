"use client"

import { useState, useEffect } from "react"
import type { Machine } from "@/lib/types"

export function useMachines() {
  const [machines, setMachines] = useState<Machine[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMachines = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/machines")
      const result = await response.json()

      if (result.success) {
        setMachines(result.data)
        setError(null)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("Erro ao carregar máquinas")
    } finally {
      setLoading(false)
    }
  }

  const updateMachineStatus = async (id: string, status: Machine["status"]) => {
    try {
      const response = await fetch(`/api/machines/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      const result = await response.json()
      if (result.success) {
        setMachines((prev) => prev.map((m) => (m.id === id ? result.data : m)))
        return true
      } else {
        setError(result.error)
        return false
      }
    } catch (err) {
      setError("Erro ao atualizar status da máquina")
      return false
    }
  }

  const updateMachineOperator = async (id: string, operator: string) => {
    try {
      const response = await fetch(`/api/machines/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operator }),
      })

      const result = await response.json()
      if (result.success) {
        setMachines((prev) => prev.map((m) => (m.id === id ? result.data : m)))
        return true
      } else {
        setError(result.error)
        return false
      }
    } catch (err) {
      setError("Erro ao atualizar operador da máquina")
      return false
    }
  }

  useEffect(() => {
    fetchMachines()
  }, [])

  return {
    machines,
    loading,
    error,
    refetch: fetchMachines,
    updateStatus: updateMachineStatus,
    updateOperator: updateMachineOperator,
  }
}
