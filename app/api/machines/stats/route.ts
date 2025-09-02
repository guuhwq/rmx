import { NextResponse } from "next/server"
import { machineAPI } from "@/lib/api"

export async function GET() {
  try {
    const machines = await machineAPI.getAll()

    const stats = {
      total: machines.length,
      active: machines.filter((m) => m.status === "ATIVA").length,
      inactive: machines.filter((m) => m.status === "INATIVA").length,
      maintenance: machines.filter((m) => m.status === "MANUTENCAO").length,
      error: machines.filter((m) => m.status === "ERRO").length,
      averageEfficiency: Math.round(machines.reduce((acc, m) => acc + m.efficiency, 0) / machines.length),
      byType: {
        CNC: machines.filter((m) => m.type === "CNC").length,
        TORNO: machines.filter((m) => m.type === "TORNO").length,
        FRESADORA: machines.filter((m) => m.type === "FRESADORA").length,
        PRENSA: machines.filter((m) => m.type === "PRENSA").length,
        SOLDADORA: machines.filter((m) => m.type === "SOLDADORA").length,
      },
    }

    return NextResponse.json({ success: true, data: stats })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao calcular estatísticas" }, { status: 500 })
  }
}
