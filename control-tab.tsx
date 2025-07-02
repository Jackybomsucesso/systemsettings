"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Shield, Smartphone, Volume2, Camera, Mic, Lock, Eye } from "lucide-react"

export function ControlTab() {
  const [controls, setControls] = useState({
    ghostMode: true,
    screenTime: true,
    appBlocking: false,
    locationTracking: true,
    callMonitoring: true,
    messageMonitoring: true,
    cameraAccess: true,
    microphoneAccess: true,
  })

  const [timeLimit, setTimeLimit] = useState([4])
  const [volumeLimit, setVolumeLimit] = useState([80])

  const toggleControl = (key: keyof typeof controls) => {
    setControls((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Modo Ghost
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Invisibilidade Total</p>
                <p className="text-gray-400 text-xs">Zero notificações para criança</p>
              </div>
              <Switch checked={controls.ghostMode} onCheckedChange={() => toggleControl("ghostMode")} />
            </div>

            {controls.ghostMode && (
              <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm">Modo Ghost Ativo</span>
                </div>
                <p className="text-gray-300 text-xs mt-1">App completamente invisível no dispositivo</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Smartphone className="w-5 h-5 mr-2" />
              Controles do Dispositivo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Limite de Tempo</span>
                <Switch checked={controls.screenTime} onCheckedChange={() => toggleControl("screenTime")} />
              </div>

              {controls.screenTime && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Tempo diário: {timeLimit[0]}h</span>
                  </div>
                  <Slider
                    value={timeLimit}
                    onValueChange={setTimeLimit}
                    max={12}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Bloqueio de Apps</span>
                <Switch checked={controls.appBlocking} onCheckedChange={() => toggleControl("appBlocking")} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Rastreamento GPS</span>
                <Switch checked={controls.locationTracking} onCheckedChange={() => toggleControl("locationTracking")} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Monitoramento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm">Acesso à Câmera</span>
                </div>
                <Switch checked={controls.cameraAccess} onCheckedChange={() => toggleControl("cameraAccess")} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mic className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm">Acesso ao Microfone</span>
                </div>
                <Switch checked={controls.microphoneAccess} onCheckedChange={() => toggleControl("microphoneAccess")} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm">Monitor de Chamadas</span>
                </div>
                <Switch checked={controls.callMonitoring} onCheckedChange={() => toggleControl("callMonitoring")} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm">Monitor de Mensagens</span>
                </div>
                <Switch
                  checked={controls.messageMonitoring}
                  onCheckedChange={() => toggleControl("messageMonitoring")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Volume2 className="w-5 h-5 mr-2" />
              Controles de Áudio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Limite de Volume</span>
                <span className="text-white">{volumeLimit[0]}%</span>
              </div>
              <Slider
                value={volumeLimit}
                onValueChange={setVolumeLimit}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
            </div>

            <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3">
              <p className="text-blue-400 text-sm font-medium">Áudio Contínuo</p>
              <p className="text-gray-300 text-xs mt-1">Gravação nunca é interrompida, mesmo durante chamadas</p>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Aplicar Configurações
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
