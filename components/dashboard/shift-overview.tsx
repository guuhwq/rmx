"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useShifts } from "@/hooks/use-shifts"
import { Loader2, Clock, Users, Target } from "lucide-react"

export function ShiftOverview() {
  const { currentShift, loading, error } = useShifts()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Turno Atual</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (error || !currentShift) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Turno Atual</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Nenhum turno ativo no momento</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Turno Atual</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">{currentShift.name}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {currentShift.startTime} - {currentShift.endTime}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Produção</span>
            <span className="text-foreground">
              {currentShift.production.actual} / {currentShift.production.target}
            </span>
          </div>
          <Progress value={currentShift.production.efficiency} className="h-2" />
          <p className="text-xs text-muted-foreground">Eficiência: {currentShift.production.efficiency}%</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">{currentShift.operators.length}</p>
              <p className="text-xs text-muted-foreground">Operadores</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">{currentShift.machines.length}</p>
              <p className="text-xs text-muted-foreground">Máquinas</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
