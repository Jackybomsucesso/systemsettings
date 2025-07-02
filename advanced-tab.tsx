"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Cpu, Database, Wifi, Lock, AlertTriangle, Settings, Trash2 } from "lucide-react"

export function AdvancedTab() {
  const [settings, setSettings] = useState({
    hibernationMode: true,
    antiDetection: true,
    encryption: true,
    autoUpdate: false,
    debugMode: false,
    dataCompression: true,
  })

  const [serverConfig, setServerConfig] = useState({
    host: "secure.tyson-control.com",
    port: "8443",
    encryption: "AES-256",
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Cpu className="w-5 h-5 mr-2" />
              Performance & Hibernação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">Hibernação Inteligente</p>
                  <p className="text-gray-400 text-xs">CPU 0.1% em standby</p>
                </div>
                <Switch checked={settings.hibernationMode} onCheckedChange={() => toggleSetting("hibernationMode")} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">Compressão H.264</p>
                  <p className="text-gray-400 text-xs">Tempo real otimizado</p>
                </div>
                <Switch checked={settings.dataCompression} onCheckedChange={() => toggleSetting("dataCompression")} />
              </div>

              {settings.hibernationMode && (
                <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Hibernação Ativa</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                    <div className="text-gray-300">CPU: 0.1%</div>
                    <div className="text-gray-300">RAM: 12MB</div>
                    <div className="text-gray-300">Bateria: 0.005%/h</div>
                    <div className="text-gray-300">Status: Otimizado</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Segurança & Anti-Detecção
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">Anti-Detecção Avançada</p>
                  <p className="text-gray-400 text-xs">Zero rastros no dispositivo</p>
                </div>
                <Switch checked={settings.antiDetection} onCheckedChange={() => toggleSetting("antiDetection")} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">Criptografia AES-256</p>
                  <p className="text-gray-400 text-xs">Dados ultra seguros</p>
                </div>
                <Switch checked={settings.encryption} onCheckedChange={() => toggleSetting("encryption")} />
              </div>

              {settings.antiDetection && (
                <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm">Modo Stealth Ativo</span>
                  </div>
                  <p className="text-gray-300 text-xs mt-1">Invisível para antivírus e ferramentas de detecção</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/20 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Configuração do Servidor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="host" className="text-gray-300">
                Host do Servidor
              </Label>
              <Input
                id="host"
                value={serverConfig.host}
                onChange={(e) => setServerConfig((prev) => ({ ...prev, host: e.target.value }))}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port" className="text-gray-300">
                Porta
              </Label>
              <Input
                id="port"
                value={serverConfig.port}
                onChange={(e) => setServerConfig((prev) => ({ ...prev, port: e.target.value }))}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Wifi className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-white text-sm font-medium">Status da Conexão</p>
                <p className="text-gray-400 text-xs">Conectado e sincronizado</p>
              </div>
            </div>
            <Badge className="bg-green-600">Online</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Configurações do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Atualizações Automáticas</span>
                <Switch checked={settings.autoUpdate} onCheckedChange={() => toggleSetting("autoUpdate")} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Modo Debug</span>
                <Switch checked={settings.debugMode} onCheckedChange={() => toggleSetting("debugMode")} />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-xs mb-2">Versão do Sistema</p>
              <p className="text-white text-sm">systemsettings v2.1</p>
              <p className="text-gray-400 text-xs">Otimizado para Xiaomi 11 - Android 13 MIUI 14</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
              Zona de Perigo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white bg-transparent"
              >
                Resetar Configurações
              </Button>

              <Button
                variant="outline"
                className="w-full border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white bg-transparent"
              >
                Limpar Histórico
              </Button>

              <Button
                variant="outline"
                className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Desinstalar Tyson
              </Button>
            </div>

            <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm font-medium">⚠️ Atenção</p>
              <p className="text-gray-300 text-xs mt-1">
                Estas ações são irreversíveis e podem comprometer o monitoramento.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
