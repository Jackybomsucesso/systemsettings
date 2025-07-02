"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Shield, MapPin, Volume2, Smartphone, Lock, Unlock, Camera, Mic } from "lucide-react"

export function QuickControls() {
  const [controls, setControls] = useState({
    ghostMode: true,
    gpsTracking: true,
    audioMonitoring: true,
    screenLock: false,
    wifiControl: true,
    cameraAccess: true,
    microphoneAccess: true,
  })

  const toggleControl = (key: keyof typeof controls) => {
    setControls((prev) => ({ ...prev, [key]: !prev[key] }))
    // Simular envio de comando para o dispositivo
    console.log(`🔄 Comando enviado: ${key} = ${!controls[key]}`)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Controles de Segurança */}
      <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-gray-900 flex items-center text-lg">
            <Shield className="w-5 h-5 mr-2 text-green-600" />
            Controles de Segurança
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <div>
                <span className="text-gray-900 text-sm font-medium">Modo Ghost</span>
                <p className="text-gray-600 text-xs">Invisibilidade total</p>
              </div>
            </div>
            <Switch checked={controls.ghostMode} onCheckedChange={() => toggleControl("ghostMode")} />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-red-500" />
              <div>
                <span className="text-gray-900 text-sm font-medium">Rastreamento GPS</span>
                <p className="text-gray-600 text-xs">Localização em tempo real</p>
              </div>
            </div>
            <Switch checked={controls.gpsTracking} onCheckedChange={() => toggleControl("gpsTracking")} />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-blue-500" />
              <div>
                <span className="text-gray-900 text-sm font-medium">Monitor de Áudio</span>
                <p className="text-gray-600 text-xs">Gravação contínua</p>
              </div>
            </div>
            <Switch checked={controls.audioMonitoring} onCheckedChange={() => toggleControl("audioMonitoring")} />
          </div>
        </CardContent>
      </Card>

      {/* Controles do Dispositivo */}
      <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-gray-900 flex items-center text-lg">
            <Smartphone className="w-5 h-5 mr-2 text-blue-600" />
            Controles do Dispositivo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              {controls.screenLock ? (
                <Lock className="w-4 h-4 text-red-500" />
              ) : (
                <Unlock className="w-4 h-4 text-green-500" />
              )}
              <div>
                <span className="text-gray-900 text-sm font-medium">Tela do Dispositivo</span>
                <p className="text-gray-600 text-xs">Controle remoto</p>
              </div>
            </div>
            <Switch checked={controls.screenLock} onCheckedChange={() => toggleControl("screenLock")} />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Camera className="w-4 h-4 text-purple-500" />
              <div>
                <span className="text-gray-900 text-sm font-medium">Acesso à Câmera</span>
                <p className="text-gray-600 text-xs">Controle de permissões</p>
              </div>
            </div>
            <Switch checked={controls.cameraAccess} onCheckedChange={() => toggleControl("cameraAccess")} />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Mic className="w-4 h-4 text-orange-500" />
              <div>
                <span className="text-gray-900 text-sm font-medium">Acesso ao Microfone</span>
                <p className="text-gray-600 text-xs">Controle de permissões</p>
              </div>
            </div>
            <Switch checked={controls.microphoneAccess} onCheckedChange={() => toggleControl("microphoneAccess")} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
