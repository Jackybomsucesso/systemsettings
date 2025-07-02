"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Mic, Activity, Smartphone, Cpu, Battery, AlertCircle } from "lucide-react"

export function MonitorTab() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [monitoringMode, setMonitoringMode] = useState<"full" | "camera" | "audio" | null>(null)
  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false,
    screen: false,
  })
  const [stats, setStats] = useState({
    cpu: 2.1,
    ram: 45,
    battery: 0.005,
    uptime: "2h 15m",
  })

  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        cpu: Math.random() * 5,
        ram: 40 + Math.random() * 15,
        battery: Math.random() * 0.01,
      }))
    }, 2000)

    // Verificar permissões disponíveis
    checkPermissions()

    return () => {
      clearInterval(interval)
      stopAllStreams()
    }
  }, [])

  const checkPermissions = async () => {
    try {
      // Verificar permissões de mídia
      const permissions = await navigator.permissions.query({ name: "camera" as PermissionName })
      const micPermissions = await navigator.permissions.query({ name: "microphone" as PermissionName })

      setPermissions({
        camera: permissions.state === "granted",
        microphone: micPermissions.state === "granted",
        screen: "getDisplayMedia" in navigator.mediaDevices,
      })
    } catch (error) {
      console.log("Permissions check not fully supported")
    }
  }

  const stopAllStreams = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }

  const startFullMonitoring = async () => {
    try {
      // Solicitar permissões de câmera e áudio
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
          frameRate: { ideal: 30, max: 60 },
          facingMode: "user",
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000,
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }

      streamRef.current = stream
      setIsMonitoring(true)
      setMonitoringMode("full")

      // Simular transmissão em tempo real (sem armazenamento)
      console.log("🔴 Transmissão em tempo real iniciada - Sem armazenamento local")
    } catch (error) {
      console.error("Erro ao acessar mídia:", error)
      alert("Erro ao acessar câmera/áudio. Verifique as permissões do navegador.")
    }
  }

  const startCameraOnly = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
          facingMode: "user",
        },
        audio: true,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }

      streamRef.current = stream
      setIsMonitoring(true)
      setMonitoringMode("camera")
    } catch (error) {
      console.error("Erro ao acessar câmera:", error)
      alert("Erro ao acessar câmera. Verifique as permissões do navegador.")
    }
  }

  const startAudioOnly = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000,
        },
      })

      streamRef.current = stream
      setIsMonitoring(true)
      setMonitoringMode("audio")

      // Processar áudio em tempo real
      const audioContext = new AudioContext()
      const source = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()
      source.connect(analyser)

      console.log("🎵 Áudio em tempo real - Sem gravação")
    } catch (error) {
      console.error("Erro ao acessar áudio:", error)
      alert("Erro ao acessar microfone. Verifique as permissões do navegador.")
    }
  }

  const stopMonitoring = () => {
    stopAllStreams()
    setIsMonitoring(false)
    setMonitoringMode(null)

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  return (
    <div className="space-y-4 p-2 sm:p-4">
      {/* Stats Cards - Mobile Optimized */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-lg sm:text-xl font-bold text-white">{stats.cpu.toFixed(1)}%</div>
                <p className="text-xs text-gray-400">CPU</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-green-400" />
              <div>
                <div className="text-lg sm:text-xl font-bold text-white">{stats.ram.toFixed(0)}MB</div>
                <p className="text-xs text-gray-400">RAM</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <Battery className="w-4 h-4 text-yellow-400" />
              <div>
                <div className="text-lg sm:text-xl font-bold text-white">{stats.battery.toFixed(3)}%</div>
                <p className="text-xs text-gray-400">Bateria/h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-purple-400" />
              <div>
                <div className="text-lg sm:text-xl font-bold text-white">{stats.uptime}</div>
                <p className="text-xs text-gray-400">Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Monitoring Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center justify-between text-base sm:text-lg">
              <span className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Monitor em Tempo Real
              </span>
              <Badge variant={isMonitoring ? "default" : "secondary"} className={isMonitoring ? "bg-green-600" : ""}>
                {isMonitoring ? "Ativo" : "Inativo"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Video Preview - Mobile Optimized */}
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
              {isMonitoring && (monitoringMode === "full" || monitoringMode === "camera") ? (
                <>
                  <video ref={videoRef} className="w-full h-full object-cover rounded-lg" muted playsInline autoPlay />
                  <div className="absolute top-2 right-2 bg-red-600 rounded-full px-2 py-1 flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-xs">AO VIVO</span>
                  </div>
                </>
              ) : isMonitoring && monitoringMode === "audio" ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Mic className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <p className="text-white text-sm">Áudio Tempo Real</p>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <div className="w-1 h-4 bg-green-400 rounded animate-pulse"></div>
                    <div
                      className="w-1 h-6 bg-green-400 rounded animate-pulse"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1 h-3 bg-green-400 rounded animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-1 h-5 bg-green-400 rounded animate-pulse"
                      style={{ animationDelay: "0.3s" }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Eye className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Monitor Desativado</p>
                </div>
              )}
            </div>

            {/* Control Buttons - Mobile Optimized */}
            <div className="grid grid-cols-1 gap-2">
              {!isMonitoring ? (
                <>
                  <Button
                    onClick={startFullMonitoring}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm"
                  >
                    📱📹 Tela + Câmera + Áudio
                  </Button>

                  <Button
                    onClick={startCameraOnly}
                    variant="outline"
                    className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white bg-transparent text-sm"
                  >
                    📹🎵 Câmera + Áudio
                  </Button>

                  <Button
                    onClick={startAudioOnly}
                    variant="outline"
                    className="border-green-500 text-green-400 hover:bg-green-600 hover:text-white bg-transparent text-sm"
                  >
                    🎵 Apenas Áudio (Tempo Real)
                  </Button>
                </>
              ) : (
                <Button onClick={stopMonitoring} className="bg-red-600 hover:bg-red-700 text-sm">
                  ⏹️ Parar Monitoramento
                </Button>
              )}
            </div>

            {/* Status Indicators */}
            <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">100% Invisível no Dispositivo</span>
              </div>
              <p className="text-gray-300 text-xs mt-1">Transmissão direta - Sem armazenamento local</p>
            </div>
          </CardContent>
        </Card>

        {/* Audio Status Card */}
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center text-base sm:text-lg">
              <Mic className="w-5 h-5 mr-2" />
              Status de Transmissão
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Modo</span>
                <Badge className="bg-blue-600">Tempo Real</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Qualidade</span>
                <span className="text-white text-sm">HD Mobile</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Compressão</span>
                <span className="text-white text-sm">WebRTC</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Latência</span>
                <span className="text-green-400 text-sm">&lt;100ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Armazenamento</span>
                <span className="text-blue-400 text-sm">Zero dados</span>
              </div>
            </div>

            {/* Permissions Status */}
            <div className="border-t border-gray-700 pt-3">
              <p className="text-gray-300 text-sm mb-2">Permissões do Browser:</p>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Câmera</span>
                  <div className={`w-2 h-2 rounded-full ${permissions.camera ? "bg-green-400" : "bg-red-400"}`}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Microfone</span>
                  <div
                    className={`w-2 h-2 rounded-full ${permissions.microphone ? "bg-green-400" : "bg-red-400"}`}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Tela</span>
                  <div className={`w-2 h-2 rounded-full ${permissions.screen ? "bg-green-400" : "bg-red-400"}`}></div>
                </div>
              </div>
            </div>

            {/* Mobile Browser Warning */}
            <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm">Mobile Browser</span>
              </div>
              <p className="text-gray-300 text-xs mt-1">
                Otimizado para navegadores móveis - Sem instalação necessária
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
