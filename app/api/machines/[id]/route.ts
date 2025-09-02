import { type NextRequest, NextResponse } from "next/server"
import { machineAPI } from "@/lib/api"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const machine = await machineAPI.getById(params.id)
    if (!machine) {
      return NextResponse.json({ success: false, error: "Máquina não encontrada" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: machine })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao buscar máquina" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status, operator } = body

    if (status) {
      const success = await machineAPI.updateStatus(params.id, status)
      if (!success) {
        return NextResponse.json({ success: false, error: "Máquina não encontrada" }, { status: 404 })
      }
    }

    if (operator !== undefined) {
      const success = await machineAPI.updateOperator(params.id, operator)
      if (!success) {
        return NextResponse.json({ success: false, error: "Máquina não encontrada" }, { status: 404 })
      }
    }

    const updatedMachine = await machineAPI.getById(params.id)
    return NextResponse.json({ success: true, data: updatedMachine })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao atualizar máquina" }, { status: 500 })
  }
}
