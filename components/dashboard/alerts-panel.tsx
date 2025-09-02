"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAlerts } from "@/hooks/use-alerts"
import { Loader2, AlertTriangle, Info, AlertCircle, Zap } from "lucide-react"

const severityIcons = {
  BAIXA: <Info className="h-4 w-4 text-blue-600" />,
  MEDIA: <AlertCircle className="h-4 w-4 text-yellow-600" />,
  ALTA: <AlertTriangle className="h-4 w-4 text-orange-600" />,
  CRITICA: <Zap className="h-4 w-4 text-red-600" />,
}

const severityColors = {
  BAIXA: "bg-blue-100 text-blue-800 border-blue-200",
  MEDIA: "bg-yellow-100 text-yellow-800 border-yellow-200",
  ALTA: "bg-orange-100 text-orange-800 border-orange-200",
  CRITICA: "bg-red-100 text-red-800 border-red-200",
}

export function AlertsPanel() {
  const { alerts, loading, error, markAsRead } = useAlerts()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Alertas Recentes</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Alertas Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive text-sm">{error}</p>
        </CardContent>
      </Card>
    )
  }

  const recentAlerts = alerts.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertas Recentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentAlerts.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nenhum alerta recente</p>
        ) : (
          recentAlerts.map((alert) => (
            <div key={alert.id} className={`p-3 border rounded-lg ${alert.isRead ? "opacity-60" : ""}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1">
                  {severityIcons[alert.severity]}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.timestamp.toLocaleString("pt-BR")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={severityColors[alert.severity]}>{alert.severity}</Badge>
                  {!alert.isRead && (
                    <Button size="sm" variant="ghost" onClick={() => markAsRead(alert.id)} className="text-xs">
                      Marcar como lido
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
