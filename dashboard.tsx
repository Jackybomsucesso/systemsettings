"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Header } from "@/components/header"
import {
  Eye,
  Camera,
  RotateCcw,
  MapPin,
  MessageSquare,
  Phone,
  Clock,
  ChevronDown,
  ChevronUp,
  Monitor,
  Maximize2,
} from "lucide-react"

interface Message {
  id: string
  type: "whatsapp" | "sms" | "call"
  contact: string
  content?: string
  duration?: string
  time: string
  incoming: boolean
}

interface Activity {
  id: string
  type: "whatsapp" | "sms" | "call" | "app"
  title: string
  subtitle: string
  time: string
  count?: number
  messages?: Message[]
  icon: any
  color: string
}

export function Dashboard() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [cameraFacing, setCameraFacing] = useState<"user" | "environment">("user")
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [gpsEnabled, setGpsEnabled] = useState(true)
  const [screenTime, setScreenTime] = useState("4h 32m")
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null)
  const [isPipMode, setIsPipMode] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const screenVideoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const screenStreamRef = useRef<MediaStream | null>(null)

  // Dados simulados de atividades com conversas completas
  const activities: Activity[] = [
    {
      id: "whatsapp-1",
      type: "whatsapp",
      title: "WhatsApp",
      subtitle: "8 mensagens (3 conversas)",
      time: "14:30",
      count: 8,
      icon: MessageSquare,
      color: "text-green-600",
      messages: [
        {
          id: "w1",
          type: "whatsapp",
          contact: "João Silva",
          content: "Oi, tudo bem?",
          time: "14:28",
          incoming: true,
        },
        {
          id: "w2",
          type: "whatsapp",
          contact: "João Silva",
          content: "Oi João! Tudo sim, e você?",
          time: "14:29",
          incoming: false,
        },
        {
          id: "w3",
          type: "whatsapp",
          contact: "João Silva",
          content: "Tudo ótimo! Vamos nos encontrar hoje?",
          time: "14:30",
          incoming: true,
        },
        {
          id: "w4",
          type: "whatsapp",
          contact: "João Silva",
          content: "Claro! Que horas?",
          time: "14:30",
          incoming: false,
        },
        {
          id: "w5",
          type: "whatsapp",
          contact: "Maria Santos",
          content: "Vamos sair hoje?",
          time: "14:25",
          incoming: true,
        },
        {
          id: "w6",
          type: "whatsapp",
          contact: "Maria Santos",
          content: "Boa ideia! Para onde?",
          time: "14:26",
          incoming: false,
        },
        {
          id: "w7",
          type: "whatsapp",
          contact: "Maria Santos",
          content: "Shopping? Preciso comprar umas coisas",
          time: "14:27",
          incoming: true,
        },
        {
          id: "w8",
          type: "whatsapp",
          contact: "Pedro Costa",
          content: "Reunião cancelada para amanhã",
          time: "14:20",
          incoming: true,
        },
      ],
    },
    {
      id: "call-1",
      type: "call",
      title: "Chamadas",
      subtitle: "3 chamadas",
      time: "13:15",
      count: 3,
      icon: Phone,
      color: "text-blue-600",
      messages: [
        {
          id: "c1",
          type: "call",
          contact: "+55 11 99999-1234",
          duration: "12 min",
          time: "13:15",
          incoming: true,
        },
        {
          id: "c2",
          type: "call",
          contact: "Ana Oliveira",
          duration: "3 min",
          time: "12:45",
          incoming: false,
        },
        {
          id: "c3",
          type: "call",
          contact: "+55 11 88888-5678",
          duration: "1 min",
          time: "12:30",
          incoming: true,
        },
      ],
    },
    {
      id: "sms-1",
      type: "sms",
      title: "SMS",
      subtitle: "4 mensagens (2 conversas)",
      time: "12:45",
      count: 4,
      icon: MessageSquare,
      color: "text-yellow-600",
      messages: [
        {
          id: "s1",
          type: "sms",
          contact: "+55 11 77777-9999",
          content: "Seu código de verificação é: 123456",
          time: "12:45",
          incoming: true,
        },
        {
          id: "s2",
          type: "sms",
          contact: "+55 11 77777-9999",
          content: "Obrigado",
          time: "12:46",
          incoming: false,
        },
        {
          id: "s3",
          type: "sms",
          contact: "Banco XYZ",
          content: "Compra aprovada no valor de R$ 45,90",
          time: "12:20",
          incoming: true,
        },
        {
          id: "s4",
          type: "sms",
          contact: "Banco XYZ",
          content: "Compra no Mercado ABC às 12:15",
          time: "12:21",
          incoming: true,
        },
      ],
    },
    {
      id: "app-1",
      type: "app",
      title: "Instagram",
      subtitle: "45 min de uso",
      time: "12:00",
      icon: Clock,
      color: "text-purple-600",
    },
  ]

  const stopAllStreams = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop())
      screenStreamRef.current = null
    }
  }

  const startMonitoring = async () => {
    try {
      // Iniciar captura da câmera
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
          facingMode: cameraFacing,
        },
        audio: audioEnabled,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = cameraStream
        videoRef.current.play()
      }

      streamRef.current = cameraStream

      // Iniciar captura da tela
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 },
          },
          audio: true,
        })

        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = screenStream
          screenVideoRef.current.play()
        }

        screenStreamRef.current = screenStream
      } catch (screenError) {
        console.log("Captura de tela não disponível:", screenError)
      }

      setIsMonitoring(true)
    } catch (error) {
      console.error("Erro ao acessar mídia:", error)
      alert("Erro ao acessar câmera/áudio. Verifique as permissões do navegador.")
    }
  }

  const stopMonitoring = () => {
    stopAllStreams()
    setIsMonitoring(false)
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    if (screenVideoRef.current) {
      screenVideoRef.current.srcObject = null
    }
  }

  const switchCamera = async () => {
    const newFacing = cameraFacing === "user" ? "environment" : "user"
    setCameraFacing(newFacing)

    if (isMonitoring && streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())

      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 30 },
            facingMode: newFacing,
          },
          audio: audioEnabled,
        })

        if (videoRef.current) {
          videoRef.current.srcObject = newStream
          videoRef.current.play()
        }

        streamRef.current = newStream
      } catch (error) {
        console.error("Erro ao trocar câmera:", error)
      }
    }
  }

  const togglePipMode = () => {
    setIsPipMode(!isPipMode)
  }

  const toggleActivity = (activityId: string) => {
    setExpandedActivity(expandedActivity === activityId ? null : activityId)
  }

  useEffect(() => {
    return () => {
      stopAllStreams()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto p-3 sm:p-4 max-w-4xl space-y-4">
        {/* Monitor Principal - Picture in Picture */}
        <Card className="clean-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-gray-900 flex items-center justify-between text-base sm:text-lg">
              <span className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Monitor em Tempo Real
              </span>
              <div className="flex items-center space-x-2">
                <Button onClick={togglePipMode} size="sm" variant="outline" className="text-xs bg-transparent">
                  <Maximize2 className="w-3 h-3 mr-1" />
                  {isPipMode ? "Tela Única" : "Dupla Tela"}
                </Button>
                <Badge
                  variant={isMonitoring ? "default" : "secondary"}
                  className={isMonitoring ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}
                >
                  {isMonitoring ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Video Preview - Picture in Picture */}
            <div className={`grid gap-4 ${isPipMode ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
              {/* Tela 1: Câmera */}
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                {isMonitoring ? (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover rounded-lg"
                      muted
                      playsInline
                      autoPlay
                    />
                    <div className="absolute top-2 left-2 bg-blue-600 rounded-full px-2 py-1 flex items-center space-x-1">
                      <Camera className="w-3 h-3 text-white" />
                      <span className="text-white text-xs">CÂMERA</span>
                    </div>
                    <div className="absolute top-2 right-2 bg-red-600 rounded-full px-2 py-1 flex items-center space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-xs">AO VIVO</span>
                    </div>
                    <Button
                      onClick={switchCamera}
                      size="sm"
                      className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Câmera Desativada</p>
                  </div>
                )}
              </div>

              {/* Tela 2: Captura de Tela (só aparece no modo PiP) */}
              {isPipMode && (
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {isMonitoring && screenStreamRef.current ? (
                    <>
                      <video
                        ref={screenVideoRef}
                        className="w-full h-full object-cover rounded-lg"
                        muted
                        playsInline
                        autoPlay
                      />
                      <div className="absolute top-2 left-2 bg-purple-600 rounded-full px-2 py-1 flex items-center space-x-1">
                        <Monitor className="w-3 h-3 text-white" />
                        <span className="text-white text-xs">TELA</span>
                      </div>
                      <div className="absolute top-2 right-2 bg-red-600 rounded-full px-2 py-1 flex items-center space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white text-xs">AO VIVO</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <Monitor className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Captura de Tela</p>
                      <p className="text-gray-500 text-xs mt-1">Clique em "Iniciar" para compartilhar tela</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Controles */}
            <div className="grid grid-cols-1 gap-3">
              {!isMonitoring ? (
                <Button onClick={startMonitoring} className="clean-button text-white font-semibold">
                  📱📹 Iniciar Câmera + Tela
                </Button>
              ) : (
                <Button onClick={stopMonitoring} className="bg-red-500 hover:bg-red-600 text-white font-semibold">
                  ⏹️ Parar Monitor
                </Button>
              )}
            </div>

            {/* Status Ghost Mode */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-sm font-medium">👻 Modo Ghost Ativo - 100% Invisível</span>
              </div>
              <p className="text-green-600 text-xs mt-1">Transmissão direta - Sem armazenamento local</p>
            </div>
          </CardContent>
        </Card>

        {/* Controles Rápidos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="clean-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-900 flex items-center text-base">
                <Camera className="w-4 h-4 mr-2" />
                Câmera & Áudio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-gray-700 text-sm font-medium">Áudio Contínuo</label>
                <Switch checked={audioEnabled} onCheckedChange={setAudioEnabled} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 text-sm">Câmera</span>
                <span className="text-gray-900 text-sm">{cameraFacing === "user" ? "Frontal" : "Traseira"}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="clean-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-900 flex items-center text-base">
                <MapPin className="w-4 h-4 mr-2" />
                Controles GPS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-gray-700 text-sm font-medium">Rastreamento GPS</label>
                <Switch checked={gpsEnabled} onCheckedChange={setGpsEnabled} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 text-sm">Tempo de Tela</span>
                <span className="text-gray-900 text-sm">{screenTime}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Atividades Detalhadas */}
        <Card className="clean-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-gray-900 text-base">📱 Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activities.map((activity) => {
                const IconComponent = activity.icon
                const isExpanded = expandedActivity === activity.id

                return (
                  <div key={activity.id} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                    {/* Header da Atividade */}
                    <div
                      className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => activity.messages && toggleActivity(activity.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className={`w-4 h-4 ${activity.color}`} />
                        <div>
                          <span className="text-gray-900 text-sm font-medium">{activity.title}</span>
                          <p className="text-gray-600 text-xs">{activity.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500 text-xs">{activity.time}</span>
                        {activity.messages && (
                          <div className="text-gray-500">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Detalhes Expandidos - Conversas Completas */}
                    {isExpanded && activity.messages && (
                      <div className="border-t border-gray-200 bg-gray-50">
                        <div className="p-3 space-y-2 max-h-80 overflow-y-auto">
                          {activity.messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.incoming ? "justify-start" : "justify-end"}`}
                            >
                              <div
                                className={`max-w-[80%] ${
                                  message.incoming
                                    ? "bg-white border border-gray-200"
                                    : "bg-green-500 text-white border border-green-600"
                                } rounded-lg p-3 shadow-sm`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span
                                    className={`text-sm font-medium ${message.incoming ? "text-gray-900" : "text-white"}`}
                                  >
                                    {message.contact}
                                  </span>
                                  <div className="flex items-center space-x-2">
                                    <Badge
                                      variant="secondary"
                                      className={`text-xs ${
                                        message.type === "whatsapp"
                                          ? "bg-green-600 text-white"
                                          : message.type === "sms"
                                            ? "bg-yellow-600 text-white"
                                            : "bg-blue-600 text-white"
                                      }`}
                                    >
                                      {message.type.toUpperCase()}
                                    </Badge>
                                    <span
                                      className={`text-xs ${message.incoming ? "text-gray-500" : "text-green-100"}`}
                                    >
                                      {message.time}
                                    </span>
                                  </div>
                                </div>

                                {message.content && (
                                  <div className="flex items-start space-x-2">
                                    <span className="text-sm">{message.incoming ? "📥" : "📤"}</span>
                                    <p
                                      className={`text-sm flex-1 ${message.incoming ? "text-gray-700" : "text-white"}`}
                                    >
                                      {message.content}
                                    </p>
                                  </div>
                                )}

                                {message.duration && (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm">{message.incoming ? "📞" : "📞"}</span>
                                    <p className={`text-sm ${message.incoming ? "text-gray-700" : "text-white"}`}>
                                      {message.incoming ? "Recebida" : "Feita"} - {message.duration}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
