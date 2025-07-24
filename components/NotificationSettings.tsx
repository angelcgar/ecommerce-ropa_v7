"use client"

import { useState, useEffect } from "react"
import { Settings, Check } from "lucide-react"

interface NotificationPreferences {
  offers: boolean
  priceDrops: boolean
  stockAlerts: boolean
  wishlistUpdates: boolean
  generalUpdates: boolean
  emailNotifications: boolean
  pushNotifications: boolean
}

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    offers: true,
    priceDrops: true,
    stockAlerts: true,
    wishlistUpdates: true,
    generalUpdates: false,
    emailNotifications: false,
    pushNotifications: true,
  })
  const [saved, setSaved] = useState(false)

  // Cargar preferencias desde localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem("notificationPreferences")
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences))
      } catch (error) {
        console.error("Error al cargar preferencias:", error)
      }
    }
  }, [])

  // Guardar preferencias
  const savePreferences = () => {
    localStorage.setItem("notificationPreferences", JSON.stringify(preferences))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const settingsOptions = [
    {
      key: "offers" as keyof NotificationPreferences,
      title: "Ofertas especiales",
      description: "Recibe notificaciones sobre descuentos y promociones",
    },
    {
      key: "priceDrops" as keyof NotificationPreferences,
      title: "Bajadas de precio",
      description: "Te avisamos cuando baje el precio de productos que te interesan",
    },
    {
      key: "stockAlerts" as keyof NotificationPreferences,
      title: "Alertas de stock",
      description: "Notificaciones cuando productos agotados vuelvan a estar disponibles",
    },
    {
      key: "wishlistUpdates" as keyof NotificationPreferences,
      title: "Actualizaciones de favoritos",
      description: "Novedades sobre los productos en tu lista de favoritos",
    },
    {
      key: "generalUpdates" as keyof NotificationPreferences,
      title: "Actualizaciones generales",
      description: "Noticias sobre nuevos productos y funcionalidades",
    },
  ]

  const deliveryOptions = [
    {
      key: "pushNotifications" as keyof NotificationPreferences,
      title: "Notificaciones push",
      description: "Recibe notificaciones en tiempo real en tu navegador",
    },
    {
      key: "emailNotifications" as keyof NotificationPreferences,
      title: "Notificaciones por email",
      description: "Recibe un resumen semanal por correo electrónico",
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Settings className="h-6 w-6 text-gray-700 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">Configuración de Notificaciones</h2>
      </div>

      <div className="space-y-8">
        {/* Tipos de notificaciones */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tipos de notificaciones</h3>
          <div className="space-y-4">
            {settingsOptions.map((option) => (
              <div key={option.key} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-grow">
                  <h4 className="text-sm font-medium text-gray-900">{option.title}</h4>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
                <button
                  onClick={() => handleToggle(option.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences[option.key] ? "bg-gray-900" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences[option.key] ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Métodos de entrega */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Métodos de entrega</h3>
          <div className="space-y-4">
            {deliveryOptions.map((option) => (
              <div key={option.key} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-grow">
                  <h4 className="text-sm font-medium text-gray-900">{option.title}</h4>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
                <button
                  onClick={() => handleToggle(option.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences[option.key] ? "bg-gray-900" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences[option.key] ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Botón guardar */}
        <div className="flex justify-end">
          <button
            onClick={savePreferences}
            className={`flex items-center px-6 py-2 rounded-md font-medium transition-colors ${
              saved ? "bg-green-600 text-white" : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {saved ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Guardado
              </>
            ) : (
              "Guardar preferencias"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
