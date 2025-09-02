import { NextResponse } from "next/server"
import { alertAPI } from "@/lib/api"

export async function GET() {
  try {
    const alerts = await alertAPI.getAll()
    return NextResponse.json({ success: true, data: alerts })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao buscar alertas" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, severity, message, machineId, operatorId } = body

    if (!type || !severity || !message) {
      return NextResponse.json(
        { success: false, error: "Campos obrigatórios: type, severity, message" },
        { status: 400 },
      )
    }

    const newAlert = await alertAPI.create({
      type,
      severity,
      message,
      machineId,
      operatorId,
    })

    return NextResponse.json({ success: true, data: newAlert }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao criar alerta" }, { status: 500 })
  }
}
