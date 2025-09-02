import { NextResponse } from "next/server"
import { shiftAPI } from "@/lib/api"

export async function GET() {
  try {
    const shifts = await shiftAPI.getAll()
    return NextResponse.json({ success: true, data: shifts })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao buscar turnos" }, { status: 500 })
  }
}
