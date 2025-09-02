import { NextResponse } from "next/server"
import { shiftAPI } from "@/lib/api"

export async function GET() {
  try {
    const currentShift = await shiftAPI.getCurrent()
    if (!currentShift) {
      return NextResponse.json({ success: false, error: "Nenhum turno ativo no momento" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: currentShift })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao buscar turno atual" }, { status: 500 })
  }
}
