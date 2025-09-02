"use client"

import { useState, useEffect } from "react"
import type { Operator } from "@/lib/types"

export function useOperators() {
  const [operators, setOperators] = useState<Operator[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOperators = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/operators")
      const result = await response.json()

      if (result.success) {
        setOperators(result.data)
        setError(null)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("Erro ao carregar operadores")
    } finally {
      setLoading(false)
    }
  }

  const updateOperatorStatus = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/operators/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      })

      const result = await response.json()
      if (result.success) {
        setOperators((prev) => prev.map((op) => (op.id === id ? result.data : op)))
        return true
      } else {
        setError(result.error)
        return false
      }
    } catch (err) {
      setError("Erro ao atualizar status do operador")
      return false
    }
  }

  const getOperatorsByShift = async (shiftType: string) => {
    try {
      const response = await fetch(`/api/operators/by-shift/${shiftType.toLowerCase()}`)
      const result = await response.json()

      if (result.success) {
        return result.data
      } else {
        setError(result.error)
        return []
      }
    } catch (err) {
      setError("Erro ao carregar operadores do turno")
      return []
    }
  }

  useEffect(() => {
    fetchOperators()
  }, [])

  return {
    operators,
    loading,
    error,
    refetch: fetchOperators,
    updateStatus: updateOperatorStatus,
    getByShift: getOperatorsByShift,
  }
}
