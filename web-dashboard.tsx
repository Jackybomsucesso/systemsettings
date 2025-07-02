"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { WebHeader } from "@/components/web-header"
import { LiveMonitor } from "@/components/live-monitor"
import { ActivityFeed } from "@/components/activity-feed"
import { QuickControls } from "@/components/quick-controls"
import { DeviceStatus } from "@/components/device-status"
import { Eye, MapPin, MessageSquare, Phone, Camera, Shield } from "lucide-react"

export function WebDashboard() {
  const [deviceData, setDeviceData] = useState({
    isOnline: true,
    battery: 78,
    location: "Shopping Center - São Paulo",
    screenTime: "4h 32m",
    lastUpdate: new Date(),
    ghostMode: true,
    appsRunning: ["WhatsApp", "Instagram", "TikTok"],
  })

  const [stats, setStats] = useState({
    messagesMonitored: 23,
    callsRecorded: 5,
    photosToken: 12,
    screenCaptures: 45,
    gpsUpdates: 156,
  })

  useEffect(() => {
    // Simular atualizações em tempo real
    const interval = setInterval(() => {
      setDeviceData((prev) => ({
        ...prev,
        battery: Math.max(20, Math.min(100, prev.battery + (Math.random() - 0.5) * 2)),
        lastUpdate: new Date(),
        screenTime: `${Math.floor(Math.random() * 8)}h ${Math.floor(Math.random() * 60)}m`,
      }))

      setStats((prev) => ({
        ...prev,
        messagesMonitored: prev.messagesMonitored + Math.floor(Math.random() * 3),
        gpsUpdates: prev.gpsUpdates + Math.floor(Math.random() * 5),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <WebHeader deviceData={deviceData} />

      <div className="container mx-auto p-3 sm:p-4 max-w-6xl space-y-4">
        {/* Status Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-lg">
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">{stats.messagesMonitored}</div>
              <div className="text-xs text-gray-600">Mensagens</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-lg">
            <CardContent className="p-4 text-center">
              <Phone className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">{stats.callsRecorded}</div>
              <div className="text-xs text-gray-600">Chamadas</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-lg">
            <CardContent className="p-4 text-center">
              <Camera className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">{stats.photosToken}</div>
              <div className="text-xs text-gray-600">Fotos</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-lg">
            <CardContent className="p-4 text-center">
              <Eye className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">{stats.screenCaptures}</div>
              <div className="text-xs text-gray-600">Capturas</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-lg">
            <CardContent className="p-4 text-center">
              <MapPin className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">{stats.gpsUpdates}</div>
              <div className="text-xs text-gray-600">GPS</div>
            </CardContent>
          </Card>
        </div>

        {/* Status do Dispositivo */}
        <DeviceStatus deviceData={deviceData} />

        {/* Monitor ao Vivo */}
        <LiveMonitor />

        {/* Controles Rápidos */}
        <QuickControls />

        {/* Feed de Atividades */}
        <ActivityFeed />

        {/* Status Ghost Mode */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8" />
                <div>
                  <h3 className="font-bold text-lg">👻 Modo Ghost Ativo</h3>
                  <p className="text-green-100 text-sm">100% Invisível no dispositivo Android</p>
                </div>
              </div>
              <div className="text-right">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse mb-1"></div>
                <span className="text-xs">Online</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
