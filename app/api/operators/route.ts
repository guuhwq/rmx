import { NextResponse } from "next/server"
import { operatorAPI } from "@/lib/api"

export async function GET() {
  try {
    const operators = await operatorAPI.getAll()
    return NextResponse.json({ success: true, data: operators })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao buscar operadores" }, { status: 500 })
  }
}
