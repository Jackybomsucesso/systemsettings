"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Phone, Camera, MapPin, Clock, ChevronDown, ChevronUp, Eye } from "lucide-react"

interface Activity {
  id: string
  type: "message" | "call" | "photo" | "location" | "app"
  title: string
  subtitle: string
  time: string
  details?: string[]
  icon: any
  color: string
}

export function ActivityFeed() {
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null)

  const activities: Activity[] = [
    {
      id: "1",
      type: "message",
      title: "WhatsApp - Nova Conversa",
      subtitle: "João Silva: 'Oi, tudo bem?'",
      time: "14:32",
      details: [
        "📥 João Silva: Oi, tudo bem?",
        "📤 Resposta: Oi João! Tudo sim, e você?",
        "📥 João Silva: Tudo ótimo! Vamos nos encontrar hoje?",
        "📤 Resposta: Claro! Que horas?",
      ],
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      id: "2",
      type: "call",
      title: "Chamada Recebida",
      subtitle: "+55 11 99999-1234 - 12 min",
      time: "14:15",
      details: [
        "📞 Chamada recebida de número desconhecido",
        "⏱️ Duração: 12 minutos e 34 segundos",
        "🎵 Áudio gravado e armazenado",
        "📍 Localização durante chamada: Shopping Center",
      ],
      icon: Phone,
      color: "text-blue-600",
    },
    {
      id: "3",
      type: "photo",
      title: "Foto Tirada",
      subtitle: "Instagram - Selfie",
      time: "13:45",
      details: [
        "📸 Foto tirada com câmera frontal",
        "📱 App: Instagram",
        "🖼️ Resolução: 1080x1920",
        "📍 Local: Shopping Center - Praça de Alimentação",
      ],
      icon: Camera,
      color: "text-purple-600",
    },
    {
      id: "4",
      type: "location",
      title: "Mudança de Localização",
      subtitle: "Shopping Center → Casa",
      time: "13:30",
      details: [
        "📍 Saiu de: Shopping Center - São Paulo",
        "🚗 Meio de transporte: Carro (detectado)",
        "📍 Chegou em: Residência",
        "⏱️ Tempo de viagem: 25 minutos",
      ],
      icon: MapPin,
      color: "text-red-600",
    },
    {
      id: "5",
      type: "app",
      title: "TikTok - Uso Prolongado",
      subtitle: "45 minutos de uso contínuo",
      time: "12:00",
      details: [
        "📱 App: TikTok",
        "⏱️ Tempo de uso: 45 minutos",
        "👀 Vídeos assistidos: ~67 vídeos",
        "📊 Categoria: Entretenimento",
      ],
      icon: Clock,
      color: "text-orange-600",
    },
  ]

  const toggleActivity = (activityId: string) => {
    setExpandedActivity(expandedActivity === activityId ? null : activityId)
  }

  return (
    <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-gray-900 flex items-center text-lg">
          <Eye className="w-5 h-5 mr-2 text-indigo-600" />
          Feed de Atividades
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => {
            const IconComponent = activity.icon
            const isExpanded = expandedActivity === activity.id

            return (
              <div key={activity.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                {/* Header da Atividade */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleActivity(activity.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <IconComponent className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 font-medium text-sm">{activity.title}</h4>
                      <p className="text-gray-600 text-xs mt-1">{activity.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {activity.time}
                    </Badge>
                    <div className="text-gray-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Detalhes Expandidos */}
                {isExpanded && activity.details && (
                  <div className="border-t border-gray-200 bg-gray-50 p-4">
                    <div className="space-y-2">
                      {activity.details.map((detail, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 text-sm">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Botão Ver Mais */}
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" className="text-gray-600 bg-transparent">
            📜 Ver Histórico Completo
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
