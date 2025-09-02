import { type NextRequest, NextResponse } from "next/server"
import { operatorAPI } from "@/lib/api"
import type { Shift } from "@/lib/types"

export async function GET(request: NextRequest, { params }: { params: { shiftType: string } }) {
  try {
    const shiftType = params.shiftType.toUpperCase() as Shift["type"]

    if (!["MANHA", "TARDE", "NOITE"].includes(shiftType)) {
      return NextResponse.json({ success: false, error: "Tipo de turno inválido" }, { status: 400 })
    }

    const operators = await operatorAPI.getByShift(shiftType)
    return NextResponse.json({ success: true, data: operators })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao buscar operadores do turno" }, { status: 500 })
  }
}
