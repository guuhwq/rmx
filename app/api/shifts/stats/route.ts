import { NextResponse } from "next/server"
import { shiftAPI } from "@/lib/api"

export async function GET() {
  try {
    const shifts = await shiftAPI.getAll()
    const currentShift = await shiftAPI.getCurrent()

    const stats = {
      totalShifts: shifts.length,
      currentShift: currentShift?.name || "Nenhum",
      currentShiftType: currentShift?.type || null,
      currentEfficiency: currentShift?.production.efficiency || 0,
      currentTarget: currentShift?.production.target || 0,
      currentActual: currentShift?.production.actual || 0,
      dailyStats: {
        morning: {
          target: shifts.find((s) => s.type === "MANHA")?.production.target || 0,
          actual: shifts.find((s) => s.type === "MANHA")?.production.actual || 0,
          efficiency: shifts.find((s) => s.type === "MANHA")?.production.efficiency || 0,
        },
        afternoon: {
          target: shifts.find((s) => s.type === "TARDE")?.production.target || 0,
          actual: shifts.find((s) => s.type === "TARDE")?.production.actual || 0,
          efficiency: shifts.find((s) => s.type === "TARDE")?.production.efficiency || 0,
        },
        night: {
          target: shifts.find((s) => s.type === "NOITE")?.production.target || 0,
          actual: shifts.find((s) => s.type === "NOITE")?.production.actual || 0,
          efficiency: shifts.find((s) => s.type === "NOITE")?.production.efficiency || 0,
        },
      },
      averageEfficiency: Math.round(shifts.reduce((acc, s) => acc + s.production.efficiency, 0) / shifts.length),
    }

    return NextResponse.json({ success: true, data: stats })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao calcular estatísticas dos turnos" }, { status: 500 })
  }
}
