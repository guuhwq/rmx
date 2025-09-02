"use client"

import { useDashboard } from "@/hooks/use-dashboard"
import { StatsCard } from "@/components/dashboard/stats-card"
import { MachineStatus } from "@/components/dashboard/machine-status"
import { ShiftOverview } from "@/components/dashboard/shift-overview"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { Loader2, Factory, Users, Clock, AlertTriangle } from "lucide-react"

export default function Dashboard() {
  const { stats, loading, error } = useDashboard()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-4" />
          <p className="text-destructive">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/images/rmx-logo.png" alt="RMX Automation Logo" className="h-10 w-10 object-contain" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">RMX Automation</h1>
                <p className="text-sm text-muted-foreground">Sistema de Monitoramento Industrial</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                Última atualização: {new Date().toLocaleTimeString("pt-BR")}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Máquinas Ativas"
            value={`${stats?.machinesActive}/${stats?.machinesTotal}`}
            subtitle={`${Math.round(((stats?.machinesActive || 0) / (stats?.machinesTotal || 1)) * 100)}% operacionais`}
            icon={<Factory className="h-4 w-4" />}
            trend="up"
          />
          <StatsCard
            title="Eficiência Geral"
            value={`${stats?.machineEfficiency}%`}
            subtitle="Média das máquinas"
            icon={<Users className="h-4 w-4" />}
            trend={stats?.machineEfficiency && stats.machineEfficiency > 80 ? "up" : "neutral"}
          />
          <StatsCard
            title="Turno Atual"
            value={stats?.currentShift || "Nenhum"}
            subtitle={`${stats?.shiftEfficiency}% eficiência`}
            icon={<Clock className="h-4 w-4" />}
            trend={stats?.shiftEfficiency && stats.shiftEfficiency > 85 ? "up" : "neutral"}
          />
          <StatsCard
            title="Alertas"
            value={stats?.alertsCount || 0}
            subtitle={`${stats?.criticalAlerts || 0} críticos`}
            icon={<AlertTriangle className="h-4 w-4" />}
            trend={stats?.criticalAlerts && stats.criticalAlerts > 0 ? "down" : "neutral"}
            className={stats?.criticalAlerts && stats.criticalAlerts > 0 ? "border-destructive" : ""}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <MachineStatus />
            <ShiftOverview />
          </div>
          <div>
            <AlertsPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
