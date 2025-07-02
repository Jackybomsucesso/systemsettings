"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Smartphone, Camera, Mic, MapPin, MessageSquare } from "lucide-react"

export function HistoryTab() {
  const [selectedDate, setSelectedDate] = useState("today")

  const activities = [
    {
      id: 1,
      type: "screen",
      icon: Smartphone,
      title: "Uso do Dispositivo",
      description: "Instagram - 45 minutos",
      time: "14:30",
      status: "active",
    },
    {
      id: 2,
      type: "camera",
      icon: Camera,
      title: "Acesso à Câmera",
      description: "Snapchat - Foto tirada",
      time: "13:15",
      status: "completed",
    },
    {
      id: 3,
      type: "location",
      icon: MapPin,
      title: "Localização",
      description: "Shopping Center - 2h 30m",
      time: "11:00",
      status: "completed",
    },
    {
      id: 4,
      type: "message",
      icon: MessageSquare,
      title: "Mensagem Enviada",
      description: "WhatsApp - Para: João",
      time: "10:45",
      status: "monitored",
    },
    {
      id: 5,
      type: "audio",
      icon: Mic,
      title: "Gravação de Áudio",
      description: "Chamada - 15 minutos",
      time: "09:30",
      status: "recorded",
    },
  ]

  const stats = {
    screenTime: "6h 45m",
    appsUsed: 12,
    photosToken: 8,
    messagesMonitored: 23,
    callsRecorded: 3,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">{stats.screenTime}</div>
            <div className="text-xs text-gray-400">Tempo de Tela</div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardContent className="p-4 text-center">
            <Smartphone className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">{stats.appsUsed}</div>
            <div className="text-xs text-gray-400">Apps Usados</div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardContent className="p-4 text-center">
            <Camera className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">{stats.photosToken}</div>
            <div className="text-xs text-gray-400">Fotos Tiradas</div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardContent className="p-4 text-center">
            <MessageSquare className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">{stats.messagesMonitored}</div>
            <div className="text-xs text-gray-400">Mensagens</div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardContent className="p-4 text-center">
            <Mic className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">{stats.callsRecorded}</div>
            <div className="text-xs text-gray-400">Chamadas</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/20 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Histórico de Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedDate} onValueChange={setSelectedDate}>
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger value="today" className="text-white data-[state=active]:bg-blue-600">
                Hoje
              </TabsTrigger>
              <TabsTrigger value="week" className="text-white data-[state=active]:bg-blue-600">
                Esta Semana
              </TabsTrigger>
              <TabsTrigger value="month" className="text-white data-[state=active]:bg-blue-600">
                Este Mês
              </TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="mt-4">
              <div className="space-y-3">
                {activities.map((activity) => {
                  const IconComponent = activity.icon
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white text-sm font-medium">{activity.title}</h4>
                        <p className="text-gray-400 text-xs">{activity.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-300 text-sm">{activity.time}</div>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            activity.status === "active"
                              ? "bg-green-600"
                              : activity.status === "monitored"
                                ? "bg-yellow-600"
                                : activity.status === "recorded"
                                  ? "bg-red-600"
                                  : "bg-gray-600"
                          }`}
                        >
                          {activity.status === "active"
                            ? "Ativo"
                            : activity.status === "monitored"
                              ? "Monitorado"
                              : activity.status === "recorded"
                                ? "Gravado"
                                : "Concluído"}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="week" className="mt-4">
              <div className="text-center py-8">
                <p className="text-gray-400">Dados da semana serão exibidos aqui</p>
              </div>
            </TabsContent>

            <TabsContent value="month" className="mt-4">
              <div className="text-center py-8">
                <p className="text-gray-400">Dados do mês serão exibidos aqui</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
