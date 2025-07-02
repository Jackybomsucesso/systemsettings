"use client"
import { Shield, LogOut, Smartphone, Wifi, WifiOff, Battery, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface WebHeaderProps {
  deviceData: {
    isOnline: boolean
    battery: number
    lastUpdate: Date
    ghostMode: boolean
  }
}

export function WebHeader({ deviceData }: WebHeaderProps) {
  const handleLogout = () => {
    localStorage.removeItem("control_panel_auth")
    window.location.reload()
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-3 sm:px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-gray-900 font-bold text-lg">Control Panel</h1>
            <p className="text-blue-600 text-sm font-medium">📱 Painel Web - iPhone</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Status do Dispositivo Android */}
          <div className="flex items-center space-x-2 bg-white/50 rounded-lg px-3 py-2">
            <Smartphone className="w-4 h-4 text-gray-600" />
            <div className="text-xs">
              <div className="flex items-center space-x-1">
                {deviceData.isOnline ? (
                  <Wifi className="w-3 h-3 text-green-500" />
                ) : (
                  <WifiOff className="w-3 h-3 text-red-500" />
                )}
                <Badge variant={deviceData.isOnline ? "default" : "destructive"} className="text-xs px-2 py-0">
                  {deviceData.isOnline ? "Online" : "Offline"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Bateria */}
          <div className="flex items-center space-x-1 bg-white/50 rounded-lg px-3 py-2">
            <Battery className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700">{deviceData.battery}%</span>
          </div>

          {/* Última Atualização */}
          <div className="hidden sm:flex items-center space-x-1 bg-white/50 rounded-lg px-3 py-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-gray-600">{formatTime(deviceData.lastUpdate)}</span>
          </div>

          {/* Logout */}
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-700 hover:bg-white/50 p-2">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
