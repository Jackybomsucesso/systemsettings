"use client"

import { useState, useEffect } from "react"
import { Settings, LogOut, Battery, Lock, Unlock, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [isScreenLocked, setIsScreenLocked] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setBatteryLevel(Math.max(20, Math.min(100, batteryLevel + (Math.random() - 0.5) * 2)))
      setIsScreenLocked(Math.random() > 0.7)
    }, 3000)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      clearInterval(timer)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [batteryLevel])

  const handleLogout = () => {
    localStorage.removeItem("control_auth")
    window.location.reload()
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-600 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm">
            <Settings className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h1 className="text-gray-900 font-semibold text-sm sm:text-base">System Settings</h1>
            <p className="text-green-600 text-xs">Painel de Controle Parental</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Status Online/Offline */}
          <div className="flex items-center space-x-1">
            {isOnline ? <Wifi className="w-3 h-3 text-green-500" /> : <WifiOff className="w-3 h-3 text-red-500" />}
            <Badge variant={isOnline ? "default" : "destructive"} className="text-xs">
              {isOnline ? "Online" : "Offline"}
            </Badge>
          </div>

          {/* Bateria */}
          <div className="flex items-center space-x-1">
            <Battery className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
            <span className="text-xs text-gray-700">{batteryLevel.toFixed(0)}%</span>
          </div>

          {/* Status da Tela */}
          <div className="flex items-center space-x-1">
            {isScreenLocked ? (
              <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
            ) : (
              <Unlock className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
            )}
            <span className={`text-xs ${isScreenLocked ? "text-red-500" : "text-green-600"}`}>
              {isScreenLocked ? "Travada" : "Ativa"}
            </span>
          </div>

          {/* Logout */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-gray-700 hover:bg-gray-100 p-1 sm:p-2"
          >
            <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
