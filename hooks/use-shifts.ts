"use client"

import { useState, useEffect } from "react"
import type { Shift } from "@/lib/types"

export function useShifts() {
  const [shifts, setShifts] = useState<Shift[]>([])
  const [currentShift, setCurrentShift] = useState<Shift | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchShifts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/shifts")
      const result = await response.json()

      if (result.success) {
        setShifts(result.data)
        setError(null)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("Erro ao carregar turnos")
    } finally {
      setLoading(false)
    }
  }

  const fetchCurrentShift = async () => {
    try {
      const response = await fetch("/api/shifts/current")
      const result = await response.json()

      if (result.success) {
        setCurrentShift(result.data)
      } else {
        setCurrentShift(null)
      }
    } catch (err) {
      setCurrentShift(null)
    }
  }

  const updateProduction = async (id: string, actualProduction: number) => {
    try {
      const response = await fetch(`/api/shifts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actualProduction }),
      })

      const result = await response.json()
      if (result.success) {
        setShifts((prev) => prev.map((s) => (s.id === id ? result.data : s)))
        if (currentShift?.id === id) {
          setCurrentShift(result.data)
        }
        return true
      } else {
        setError(result.error)
        return false
      }
    } catch (err) {
      setError("Erro ao atualizar produção do turno")
      return false
    }
  }

  useEffect(() => {
    fetchShifts()
    fetchCurrentShift()

    // Atualizar turno atual a cada minuto
    const interval = setInterval(fetchCurrentShift, 60000)
    return () => clearInterval(interval)
  }, [])

  return {
    shifts,
    currentShift,
    loading,
    error,
    refetch: fetchShifts,
    updateProduction,
  }
}
