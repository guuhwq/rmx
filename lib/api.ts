import type { Machine, Shift, Operator, Alert } from "./types"
import { mockMachines, mockShifts, mockOperators, mockAlerts } from "./data"

// Simulação de delay de rede
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// API de Máquinas
export const machineAPI = {
  async getAll(): Promise<Machine[]> {
    await delay(500)
    return [...mockMachines]
  },

  async getById(id: string): Promise<Machine | null> {
    await delay(300)
    return mockMachines.find((m) => m.id === id) || null
  },

  async updateStatus(id: string, status: Machine["status"]): Promise<boolean> {
    await delay(400)
    const machine = mockMachines.find((m) => m.id === id)
    if (machine) {
      machine.status = status
      return true
    }
    return false
  },

  async updateOperator(id: string, operatorName: string): Promise<boolean> {
    await delay(300)
    const machine = mockMachines.find((m) => m.id === id)
    if (machine) {
      machine.currentOperator = operatorName
      return true
    }
    return false
  },
}

// API de Turnos
export const shiftAPI = {
  async getAll(): Promise<Shift[]> {
    await delay(400)
    return [...mockShifts]
  },

  async getCurrent(): Promise<Shift | null> {
    await delay(300)
    const now = new Date()
    const currentHour = now.getHours()

    // Lógica simples para determinar turno atual
    if (currentHour >= 6 && currentHour < 14) {
      return mockShifts.find((s) => s.type === "MANHA") || null
    } else if (currentHour >= 14 && currentHour < 22) {
      return mockShifts.find((s) => s.type === "TARDE") || null
    } else {
      return mockShifts.find((s) => s.type === "NOITE") || null
    }
  },

  async updateProduction(id: string, actual: number): Promise<boolean> {
    await delay(400)
    const shift = mockShifts.find((s) => s.id === id)
    if (shift) {
      shift.production.actual = actual
      shift.production.efficiency = Math.round((actual / shift.production.target) * 100)
      return true
    }
    return false
  },
}

// API de Operadores
export const operatorAPI = {
  async getAll(): Promise<Operator[]> {
    await delay(400)
    return [...mockOperators]
  },

  async getByShift(shiftType: Shift["type"]): Promise<Operator[]> {
    await delay(300)
    return mockOperators.filter((op) => op.shift === shiftType || op.shift === "FLEXIVEL")
  },

  async updateStatus(id: string, isActive: boolean): Promise<boolean> {
    await delay(300)
    const operator = mockOperators.find((op) => op.id === id)
    if (operator) {
      operator.isActive = isActive
      return true
    }
    return false
  },
}

// API de Alertas
export const alertAPI = {
  async getAll(): Promise<Alert[]> {
    await delay(300)
    return [...mockAlerts].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  },

  async getUnread(): Promise<Alert[]> {
    await delay(200)
    return mockAlerts.filter((alert) => !alert.isRead)
  },

  async markAsRead(id: string): Promise<boolean> {
    await delay(200)
    const alert = mockAlerts.find((a) => a.id === id)
    if (alert) {
      alert.isRead = true
      return true
    }
    return false
  },

  async create(alert: Omit<Alert, "id" | "timestamp" | "isRead">): Promise<Alert> {
    await delay(300)
    const newAlert: Alert = {
      ...alert,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false,
    }
    mockAlerts.unshift(newAlert)
    return newAlert
  },
}

// API de Dashboard - Estatísticas gerais
export const dashboardAPI = {
  async getStats() {
    await delay(600)
    const activeMachines = mockMachines.filter((m) => m.status === "ATIVA").length
    const totalMachines = mockMachines.length
    const currentShift = await shiftAPI.getCurrent()
    const unreadAlerts = await alertAPI.getUnread()

    return {
      machinesActive: activeMachines,
      machinesTotal: totalMachines,
      machineEfficiency: Math.round(mockMachines.reduce((acc, m) => acc + m.efficiency, 0) / totalMachines),
      currentShift: currentShift?.name || "Nenhum",
      shiftEfficiency: currentShift?.production.efficiency || 0,
      alertsCount: unreadAlerts.length,
      criticalAlerts: unreadAlerts.filter((a) => a.severity === "CRITICA").length,
    }
  },
}
