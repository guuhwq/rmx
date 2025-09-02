import { NextResponse } from "next/server"
import { machineAPI } from "@/lib/api"

export async function GET() {
  try {
    const machines = await machineAPI.getAll()
    return NextResponse.json({ success: true, data: machines })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao buscar máquinas" }, { status: 500 })
  }
}
