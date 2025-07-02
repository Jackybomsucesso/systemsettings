"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Smartphone, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LoginScreenProps {
  onLogin: (success: boolean) => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [code, setCode] = useState("")
  const [showCode, setShowCode] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simular verificação
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (code === "##7777##") {
      localStorage.setItem("control_panel_auth", "authenticated")
      onLogin(true)
    } else {
      setError("Código de acesso inválido")
      setCode("")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-lg border border-white/20 shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Control Panel
            </CardTitle>
            <p className="text-gray-600 text-sm mt-2">Painel Web - Acesso via iPhone</p>
          </div>

          {/* Status do Dispositivo Monitorado */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <Smartphone className="w-4 h-4 text-green-600" />
              <span className="text-green-700 text-sm font-medium">Dispositivo Android Online</span>
            </div>
            <p className="text-green-600 text-xs mt-1 text-center">Dispositivo Android - Modo Ghost Ativo</p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type={showCode ? "text" : "password"}
                placeholder="Digite o código de acesso"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500 pr-10 focus:border-blue-500 focus:ring-blue-500 h-12"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                onClick={() => setShowCode(!showCode)}
              >
                {showCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center font-medium">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold h-12 shadow-lg"
              disabled={isLoading || !code}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verificando...</span>
                </div>
              ) : (
                "🔓 Acessar Painel"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-xs text-blue-600 font-medium">Control Panel v2.1 - Web Access</p>
            <p className="text-xs text-gray-500">Otimizado para iPhone Safari</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
