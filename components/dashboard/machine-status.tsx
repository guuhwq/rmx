"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useMachines } from "@/hooks/use-machines"
import { Loader2, Settings, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

const statusIcons = {
  ATIVA: <CheckCircle className="h-4 w-4 text-green-600" />,
  INATIVA: <XCircle className="h-4 w-4 text-gray-400" />,
  MANUTENCAO: <Settings className="h-4 w-4 text-yellow-600" />,
  ERRO: <AlertTriangle className="h-4 w-4 text-red-600" />,
}

const statusColors = {
  ATIVA: "bg-green-100 text-green-800 border-green-200",
  INATIVA: "bg-gray-100 text-gray-800 border-gray-200",
  MANUTENCAO: "bg-yellow-100 text-yellow-800 border-yellow-200",
  ERRO: "bg-red-100 text-red-800 border-red-200",
}

export function MachineStatus() {
  const { machines, loading, error } = useMachines()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Status das Máquinas</CardTitle>
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
          <CardTitle>Status das Máquinas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive text-sm">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status das Máquinas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {machines.map((machine) => (
          <div key={machine.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              {statusIcons[machine.status]}
              <div>
                <p className="font-medium text-foreground">{machine.name}</p>
                <p className="text-sm text-muted-foreground">{machine.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{machine.efficiency}%</span>
              <Badge className={statusColors[machine.status]}>{machine.status}</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
