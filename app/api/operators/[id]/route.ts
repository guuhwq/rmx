import { type NextRequest, NextResponse } from "next/server"
import { operatorAPI } from "@/lib/api"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { isActive } = body

    if (isActive !== undefined) {
      const success = await operatorAPI.updateStatus(params.id, isActive)
      if (!success) {
        return NextResponse.json({ success: false, error: "Operador não encontrado" }, { status: 404 })
      }
    }

    const operators = await operatorAPI.getAll()
    const updatedOperator = operators.find((op) => op.id === params.id)

    return NextResponse.json({ success: true, data: updatedOperator })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao atualizar operador" }, { status: 500 })
  }
}
