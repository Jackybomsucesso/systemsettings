"use client"
import { useState, useEffect } from "react"
import { LoginScreen } from "@/components/login-screen"
import { WebDashboard } from "@/components/web-dashboard"

export default function WebPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se já está autenticado
    const authStatus = localStorage.getItem("control_panel_auth")
    if (authStatus === "authenticated") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (success: boolean) => {
    if (success) {
      localStorage.setItem("control_panel_auth", "authenticated")
      setIsAuthenticated(true)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">Carregando Painel Web...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">{!isAuthenticated ? <LoginScreen onLogin={handleLogin} /> : <WebDashboard />}</div>
  )
}
