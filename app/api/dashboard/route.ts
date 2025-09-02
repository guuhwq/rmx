import { NextResponse } from "next/server"
import { dashboardAPI } from "@/lib/api"

export async function GET() {
  try {
    const stats = await dashboardAPI.getStats()
    return NextResponse.json({ success: true, data: stats })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao carregar estatísticas do dashboard" }, { status: 500 })
  }
}
