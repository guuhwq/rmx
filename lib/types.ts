export interface Machine {
  id: string
  name: string
  type: "CNC" | "TORNO" | "FRESADORA" | "PRENSA" | "SOLDADORA"
  status: "ATIVA" | "INATIVA" | "MANUTENCAO" | "ERRO"
  location: string
  lastMaintenance: Date
  nextMaintenance: Date
  operatingHours: number
  efficiency: number // 0-100%
  currentOperator?: string
  specifications: {
    power: string
    capacity: string
    model: string
    manufacturer: string
  }
}

export interface Shift {
  id: string
  name: string
  startTime: string // HH:MM format
  endTime: string
  type: "MANHA" | "TARDE" | "NOITE"
  isActive: boolean
  operators: string[]
  machines: string[]
  supervisor: string
  date: Date
  production: {
    target: number
    actual: number
    efficiency: number
  }
}

export interface Operator {
  id: string
  name: string
  email: string
  role: "OPERADOR" | "SUPERVISOR" | "TECNICO" | "GERENTE"
  shift: "MANHA" | "TARDE" | "NOITE" | "FLEXIVEL"
  skills: string[]
  certifications: string[]
  isActive: boolean
  hireDate: Date
  machinePermissions: string[] // machine IDs
}

export interface Production {
  id: string
  machineId: string
  operatorId: string
  shiftId: string
  startTime: Date
  endTime?: Date
  quantity: number
  target: number
  quality: "APROVADO" | "REJEITADO" | "RETRABALHO"
  notes?: string
}

export interface Maintenance {
  id: string
  machineId: string
  type: "PREVENTIVA" | "CORRETIVA" | "EMERGENCIAL"
  status: "AGENDADA" | "EM_ANDAMENTO" | "CONCLUIDA" | "CANCELADA"
  scheduledDate: Date
  completedDate?: Date
  technicianId: string
  description: string
  cost?: number
  parts?: string[]
}

export interface Alert {
  id: string
  type: "MANUTENCAO" | "PRODUCAO" | "QUALIDADE" | "SEGURANCA"
  severity: "BAIXA" | "MEDIA" | "ALTA" | "CRITICA"
  message: string
  machineId?: string
  operatorId?: string
  timestamp: Date
  isRead: boolean
  resolvedAt?: Date
}
