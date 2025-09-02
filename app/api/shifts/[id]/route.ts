import { type NextRequest, NextResponse } from "next/server"
import { shiftAPI } from "@/lib/api"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { actualProduction } = body

    if (actualProduction !== undefined) {
      const success = await shiftAPI.updateProduction(params.id, actualProduction)
      if (!success) {
        return NextResponse.json({ success: false, error: "Turno não encontrado" }, { status: 404 })
      }
    }

    const shifts = await shiftAPI.getAll()
    const updatedShift = shifts.find((s) => s.id === params.id)

    return NextResponse.json({ success: true, data: updatedShift })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao atualizar turno" }, { status: 500 })
  }
}
