import { NextResponse } from "next/server"
import { operatorAPI } from "@/lib/api"

export async function GET() {
  try {
    const operators = await operatorAPI.getAll()

    const stats = {
      total: operators.length,
      active: operators.filter((op) => op.isActive).length,
      inactive: operators.filter((op) => !op.isActive).length,
      byRole: {
        OPERADOR: operators.filter((op) => op.role === "OPERADOR").length,
        SUPERVISOR: operators.filter((op) => op.role === "SUPERVISOR").length,
        TECNICO: operators.filter((op) => op.role === "TECNICO").length,
        GERENTE: operators.filter((op) => op.role === "GERENTE").length,
      },
      byShift: {
        MANHA: operators.filter((op) => op.shift === "MANHA").length,
        TARDE: operators.filter((op) => op.shift === "TARDE").length,
        NOITE: operators.filter((op) => op.shift === "NOITE").length,
        FLEXIVEL: operators.filter((op) => op.shift === "FLEXIVEL").length,
      },
      certifications: {
        "NR-12": operators.filter((op) => op.certifications.includes("NR-12")).length,
        "NR-10": operators.filter((op) => op.certifications.includes("NR-10")).length,
        "Operação CNC": operators.filter((op) => op.certifications.includes("Operação CNC")).length,
        Metrologia: operators.filter((op) => op.certifications.includes("Metrologia")).length,
      },
    }

    return NextResponse.json({ success: true, data: stats })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao calcular estatísticas dos operadores" }, { status: 500 })
  }
}
