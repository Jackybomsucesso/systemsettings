"use client"

import { useState, useEffect } from "react"
import { GhostPermissionsManager } from "@/utils/permissions-manager"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export function PermissionsHandler() {
  const [permissionsManager] = useState(new GhostPermissionsManager())
  const [permissions, setPermissions] = useState(new Map())
  const [ghostModeReady, setGhostModeReady] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)

  useEffect(() => {
    updatePermissionsDisplay()
  }, [])

  const updatePermissionsDisplay = () => {
    setPermissions(new Map(permissionsManager.getAllPermissions()))
    setGhostModeReady(permissionsManager.canStartGhostMode())
  }

  const requestAllPermissions = async () => {
    setIsRequesting(true)

    try {
      // 1. Solicitar permissões críticas primeiro
      console.log("🔴 Solicitando permissões CRÍTICAS...")
      const criticalSuccess = await permissionsManager.requestCriticalPermissions()

      if (!criticalSuccess) {
        alert("❌ Algumas permissões críticas foram negadas. O app pode não funcionar completamente.")
      }

      // 2. Solicitar permissões opcionais (falha silenciosa)
      console.log("🟢 Solicitando permissões OPCIONAIS (modo ghost)...")
      await permissionsManager.requestOptionalPermissions()

      updatePermissionsDisplay()

      // 3. Mostrar status final
      const status = permissionsManager.getGhostModeStatus()
      console.log(status)
    } catch (error) {
      console.error("Erro ao solicitar permissões:", error)
    } finally {
      setIsRequesting(false)
    }
  }

  const getPermissionIcon = (permission: any) => {
    if (permission.granted) {
      return <CheckCircle className="w-4 h-4 text-green-400" />
    } else if (permission.critical) {
      return <XCircle className="w-4 h-4 text-red-400" />
    } else {
      return <AlertTriangle className="w-4 h-4 text-yellow-400" />
    }
  }

  const getPermissionBadge = (permission: any) => {
    if (permission.granted) {
      return <Badge className="bg-green-600">Concedida</Badge>
    } else if (permission.critical) {
      return <Badge className="bg-red-600">Necessária</Badge>
    } else {
      return <Badge className="bg-gray-600">Opcional (Ghost)</Badge>
    }
  }

  return (
    <Card className="bg-black/20 backdrop-blur-lg border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Permissões do Sistema
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status do Modo Ghost */}
        <div
          className={`p-3 rounded-lg border ${
            ghostModeReady ? "bg-green-900/20 border-green-500/20" : "bg-yellow-900/20 border-yellow-500/20"
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${ghostModeReady ? "bg-green-400" : "bg-yellow-400"}`}></div>
            <span className={`text-sm ${ghostModeReady ? "text-green-400" : "text-yellow-400"}`}>
              {permissionsManager.getGhostModeStatus()}
            </span>
          </div>
        </div>

        {/* Lista de Permissões */}
        <div className="space-y-2">
          {Array.from(permissions.entries()).map(([key, permission]) => (
            <div key={key} className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getPermissionIcon(permission)}
                <div>
                  <span className="text-white text-sm font-medium">{permission.name}</span>
                  <p className="text-gray-400 text-xs">{permission.description}</p>
                </div>
              </div>
              {getPermissionBadge(permission)}
            </div>
          ))}
        </div>

        {/* Botão de Solicitação */}
        <Button
          onClick={requestAllPermissions}
          disabled={isRequesting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {isRequesting ? "Solicitando Permissões..." : "Solicitar Permissões"}
        </Button>

        {/* Aviso sobre Notificações */}
        <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3">
          <p className="text-blue-400 text-sm font-medium">👻 Modo Ghost Ativo</p>
          <p className="text-gray-300 text-xs mt-1">
            Notificações são OPCIONAIS. Se negadas, o app mantém invisibilidade total.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
