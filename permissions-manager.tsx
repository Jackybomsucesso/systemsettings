"use client"

interface PermissionStatus {
  granted: boolean
  critical: boolean
  name: string
  description: string
}

export class GhostPermissionsManager {
  private permissions: Map<string, PermissionStatus> = new Map()

  constructor() {
    this.initializePermissions()
  }

  private initializePermissions() {
    // 🔴 CRÍTICAS - App não funciona sem
    this.permissions.set("camera", {
      granted: false,
      critical: true,
      name: "Câmera",
      description: "Essencial para monitoramento visual",
    })

    this.permissions.set("microphone", {
      granted: false,
      critical: true,
      name: "Microfone",
      description: "Essencial para áudio em tempo real",
    })

    this.permissions.set("geolocation", {
      granted: false,
      critical: true,
      name: "Localização",
      description: "Essencial para rastreamento GPS",
    })

    // 🟡 IMPORTANTES - Funciona sem, mas perde funcionalidade
    this.permissions.set("screen", {
      granted: false,
      critical: false,
      name: "Captura de Tela",
      description: "Para monitoramento completo da tela",
    })

    // 🟢 OPCIONAIS - Modo Ghost não precisa
    this.permissions.set("notifications", {
      granted: false,
      critical: false,
      name: "Notificações",
      description: "OPCIONAL: Modo Ghost = Invisibilidade Total",
    })
  }

  async requestCriticalPermissions(): Promise<boolean> {
    const criticalPermissions = Array.from(this.permissions.entries()).filter(([_, permission]) => permission.critical)

    let allCriticalGranted = true

    for (const [key, permission] of criticalPermissions) {
      try {
        const granted = await this.requestSinglePermission(key)
        permission.granted = granted

        if (!granted) {
          allCriticalGranted = false
          console.error(`❌ CRÍTICO: Permissão ${permission.name} negada`)
        } else {
          console.log(`✅ CRÍTICO: Permissão ${permission.name} concedida`)
        }
      } catch (error) {
        console.error(`❌ Erro ao solicitar ${permission.name}:`, error)
        allCriticalGranted = false
      }
    }

    return allCriticalGranted
  }

  async requestOptionalPermissions(): Promise<void> {
    const optionalPermissions = Array.from(this.permissions.entries()).filter(([_, permission]) => !permission.critical)

    for (const [key, permission] of optionalPermissions) {
      try {
        const granted = await this.requestSinglePermission(key)
        permission.granted = granted

        if (granted) {
          console.log(`✅ OPCIONAL: ${permission.name} concedida`)
        } else {
          console.log(`👻 GHOST MODE: ${permission.name} negada - Invisibilidade mantida`)
        }
      } catch (error) {
        // Falha silenciosa para permissões opcionais
        console.log(`👻 GHOST MODE: ${permission.name} não disponível - OK`)
      }
    }
  }

  private async requestSinglePermission(type: string): Promise<boolean> {
    switch (type) {
      case "camera":
      case "microphone":
        try {
          const constraints: MediaStreamConstraints = {}
          if (type === "camera") constraints.video = true
          if (type === "microphone") constraints.audio = true

          const stream = await navigator.mediaDevices.getUserMedia(constraints)
          stream.getTracks().forEach((track) => track.stop()) // Parar imediatamente
          return true
        } catch {
          return false
        }

      case "geolocation":
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            () => resolve(true),
            () => resolve(false),
            { timeout: 5000 },
          )
        })

      case "screen":
        try {
          const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
          stream.getTracks().forEach((track) => track.stop())
          return true
        } catch {
          return false
        }

      case "notifications":
        try {
          const permission = await Notification.requestPermission()
          return permission === "granted"
        } catch {
          return false
        }

      default:
        return false
    }
  }

  getPermissionStatus(type: string): PermissionStatus | undefined {
    return this.permissions.get(type)
  }

  getAllPermissions(): Map<string, PermissionStatus> {
    return this.permissions
  }

  canStartGhostMode(): boolean {
    // Só precisa das permissões críticas
    const criticalPermissions = Array.from(this.permissions.values()).filter((p) => p.critical)

    return criticalPermissions.every((p) => p.granted)
  }

  getGhostModeStatus(): string {
    const critical = Array.from(this.permissions.values()).filter((p) => p.critical)
    const granted = critical.filter((p) => p.granted).length

    if (granted === critical.length) {
      return `👻 MODO GHOST ATIVO - ${granted}/${critical.length} permissões críticas`
    } else {
      return `⚠️ MODO GHOST INCOMPLETO - ${granted}/${critical.length} permissões críticas`
    }
  }
}
