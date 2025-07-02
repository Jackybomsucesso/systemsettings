"use client"

import { useState, useEffect } from "react"
import { Shield, CheckCircle, Loader } from "lucide-react"

export function CamouflageInterface() {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Iniciando verificação de segurança...")

  useEffect(() => {
    const steps = [
      { progress: 20, status: "Verificando integridade do sistema..." },
      { progress: 45, status: "Atualizando definições de segurança..." },
      { progress: 70, status: "Configurando proteção em tempo real..." },
      { progress: 90, status: "Finalizando configuração..." },
      { progress: 100, status: "Proteção ativada com sucesso!" },
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress)
        setStatus(steps[currentStep].status)
        currentStep++
      } else {
        clearInterval(interval)
      }
    }, 600)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        {/* Ícone de Segurança */}
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
          <Shield className="w-10 h-10 text-white" />
        </div>

        {/* Título */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Security Service</h1>
          <p className="text-gray-600 text-sm">Proteção avançada para seu dispositivo</p>
        </div>

        {/* Barra de Progresso */}
        <div className="space-y-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-green-600 text-sm font-medium">{progress}%</p>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center space-x-2">
          {progress < 100 ? (
            <Loader className="w-4 h-4 text-green-600 animate-spin" />
          ) : (
            <CheckCircle className="w-4 h-4 text-green-600" />
          )}
          <span className="text-gray-700 text-sm">{status}</span>
        </div>

        {/* Informações */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold text-gray-900 mb-2">Recursos Ativados:</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>✓ Proteção em tempo real</li>
            <li>✓ Monitoramento de ameaças</li>
            <li>✓ Atualizações automáticas</li>
            <li>✓ Otimização de performance</li>
          </ul>
        </div>

        <p className="text-xs text-gray-500">
          Este serviço funcionará em segundo plano para manter seu dispositivo protegido.
        </p>
      </div>
    </div>
  )
}
