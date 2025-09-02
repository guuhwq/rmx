import { type NextRequest, NextResponse } from "next/server"
import { alertAPI } from "@/lib/api"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await alertAPI.markAsRead(params.id)
    if (!success) {
      return NextResponse.json({ success: false, error: "Alerta não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Alerta marcado como lido" })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao marcar alerta como lido" }, { status: 500 })
  }
}
