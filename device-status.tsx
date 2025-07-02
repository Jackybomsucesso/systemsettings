"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, MapPin, Clock, Wifi, Battery, Shield, Eye, Activity } from "lucide-react"

interface DeviceStatusProps {
  deviceData: {
    isOnline: boolean
    battery: number
    location: string
    screenTime: string
    ghostMode: boolean
    appsRunning: string[]
  }
}

export function DeviceStatus({ deviceData }: DeviceStatusProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-gray-900 flex items-center text-lg">
          <Smartphone className="w-5 h-5 mr-2 text-blue-600" />
          Status do Dispositivo Android
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Coluna 1 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4 text-green-500" />
                <span className="text-gray-700 text-sm">Conexão</span>
              </div>
              <Badge className={deviceData.isOnline ? "bg-green-500" : "bg-red-500"}>
                {deviceData.isOnline ? "Online" : "Offline"}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Battery className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700 text-sm">Bateria</span>
              </div>
              <span className="text-gray-900 font-medium">{deviceData.battery}%</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-purple-500" />
                <span className="text-gray-700 text-sm">Tempo de Tela</span>
              </div>
              <span className="text-gray-900 font-medium">{deviceData.screenTime}</span>
            </div>
          </div>

          {/* Coluna 2 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-gray-700 text-sm">Localização</span>
              </div>
              <span className="text-gray-900 text-xs text-right max-w-32 truncate">{deviceData.location}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-gray-700 text-sm">Modo Ghost</span>
              </div>
              <Badge className="bg-green-500">{deviceData.ghostMode ? "Ativo" : "Inativo"}</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-orange-500" />
                <span className="text-gray-700 text-sm">Apps Ativos</span>
              </div>
              <span className="text-gray-900 font-medium">{deviceData.appsRunning.length}</span>
            </div>
          </div>
        </div>

        {/* Apps em Execução */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-gray-900 font-medium text-sm mb-2 flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            Apps em Execução:
          </h4>
          <div className="flex flex-wrap gap-2">
            {deviceData.appsRunning.map((app, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {app}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
