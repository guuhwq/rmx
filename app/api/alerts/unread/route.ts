import { NextResponse } from "next/server"
import { alertAPI } from "@/lib/api"

export async function GET() {
  try {
    const unreadAlerts = await alertAPI.getUnread()
    return NextResponse.json({ success: true, data: unreadAlerts })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao buscar alertas não lidos" }, { status: 500 })
  }
}
