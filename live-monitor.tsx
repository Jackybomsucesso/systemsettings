"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Camera, Monitor, Mic, Play, Square } from "lucide-react"

export function LiveMonitor() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [monitorMode, setMonitorMode] = useState<"camera" | "screen" | "both">("both")

  const startMonitoring = () => {
    setIsMonitoring(true)
    // Simular início do monitoramento
    console.log("🔴 Monitoramento iniciado via web")
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
    console.log("⏹️ Monitoramento parado")
  }

  return (
    <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-gray-900 flex items-center justify-between text-lg">
          <span className="flex items-center">
            <Eye className="w-5 h-5 mr-2 text-blue-600" />
            Monitor ao Vivo
          </span>
          <Badge
            variant={isMonitoring ? "default" : "secondary"}
            className={isMonitoring ? "bg-red-500 animate-pulse" : "bg-gray-400"}
          >
            {isMonitoring ? "🔴 AO VIVO" : "⚫ Parado"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Área de Visualização */}
        <div className={`grid gap-4 ${monitorMode === "both" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
          {/* Câmera */}
          {(monitorMode === "camera" || monitorMode === "both") && (
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              {isMonitoring ? (
                <>
                  {/* Simulação de feed da câmera */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Camera className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                      <p className="text-sm">Feed da Câmera</p>
                      <p className="text-xs opacity-75">Transmissão em tempo real</p>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 bg-blue-600 rounded-full px-2 py-1 flex items-center space-x-1">
                    <Camera className="w-3 h-3 text-white" />
                    <span className="text-white text-xs">CÂMERA</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-red-600 rounded-full px-2 py-1 flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-xs">REC</span>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500">
                  <Camera className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Câmera Desativada</p>
                </div>
              )}
            </div>
          )}

          {/* Tela */}
          {(monitorMode === "screen" || monitorMode === "both") && (
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              {isMonitoring ? (
                <>
                  {/* Simulação de captura de tela */}
                  <div className="w-full h-full bg-gradient-to-br from-green-900 to-teal-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Monitor className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                      <p className="text-sm">Captura de Tela</p>
                      <p className="text-xs opacity-75">Tela do dispositivo</p>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 bg-green-600 rounded-full px-2 py-1 flex items-center space-x-1">
                    <Monitor className="w-3 h-3 text-white" />
                    <span className="text-white text-xs">TELA</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-red-600 rounded-full px-2 py-1 flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-xs">REC</span>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500">
                  <Monitor className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Captura Desativada</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Controles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {!isMonitoring ? (
            <>
              <Button
                onClick={startMonitoring}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
              >
                <Play className="w-4 h-4 mr-2" />🎥 Iniciar Monitor
              </Button>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={monitorMode === "camera" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMonitorMode("camera")}
                  className="text-xs"
                >
                  📹 Câmera
                </Button>
                <Button
                  variant={monitorMode === "screen" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMonitorMode("screen")}
                  className="text-xs"
                >
                  🖥️ Tela
                </Button>
                <Button
                  variant={monitorMode === "both" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMonitorMode("both")}
                  className="text-xs"
                >
                  📱 Ambos
                </Button>
              </div>
            </>
          ) : (
            <Button
              onClick={stopMonitoring}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold col-span-full"
            >
              <Square className="w-4 h-4 mr-2" />
              ⏹️ Parar Monitor
            </Button>
          )}
        </div>

        {/* Status de Transmissão */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${isMonitoring ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
              ></div>
              <span className="text-blue-700 text-sm font-medium">
                {isMonitoring ? "Transmitindo para iPhone" : "Aguardando comando"}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Mic className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 text-xs">Áudio: ON</span>
            </div>
          </div>
          <p className="text-blue-600 text-xs mt-1">
            {isMonitoring
              ? "✅ Conexão segura estabelecida - Latência: <100ms"
              : "🔒 Pronto para transmissão criptografada"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
