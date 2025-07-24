"use client"

import { useState } from "react"
import Header from "@/components/Header"
import { useNotifications } from "@/context/NotificationContext"
import { Bell, Gift, Heart, TrendingDown, Package, Info, Eye, Trash2, Filter } from "lucide-react"
import Link from "next/link"
import type { Notification } from "@/context/NotificationContext"

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    getNotificationsByType,
  } = useNotifications()

  const [selectedFilter, setSelectedFilter] = useState<"all" | Notification["type"]>("all")

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "offer":
        return <Gift className="h-6 w-6 text-green-500" />
      case "wishlist":
        return <Heart className="h-6 w-6 text-red-500" />
      case "price_drop":
        return <TrendingDown className="h-6 w-6 text-blue-500" />
      case "stock":
        return <Package className="h-6 w-6 text-orange-500" />
      default:
        return <Info className="h-6 w-6 text-gray-500" />
    }
  }

  const getNotificationBgColor = (type: string, isRead: boolean) => {
    const baseColor = isRead ? "bg-white" : "bg-blue-50"
    const borderColor = (() => {
      switch (type) {
        case "offer":
          return "border-l-green-500"
        case "wishlist":
          return "border-l-red-500"
        case "price_drop":
          return "border-l-blue-500"
        case "stock":
          return "border-l-orange-500"
        default:
          return "border-l-gray-500"
      }
    })()
    return `${baseColor} ${borderColor} border-l-4`
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getFilteredNotifications = () => {
    if (selectedFilter === "all") return notifications
    return getNotificationsByType(selectedFilter)
  }

  const filteredNotifications = getFilteredNotifications()

  const filterOptions = [
    { value: "all", label: "Todas", count: notifications.length },
    { value: "offer", label: "Ofertas", count: getNotificationsByType("offer").length },
    { value: "price_drop", label: "Precios", count: getNotificationsByType("price_drop").length },
    { value: "wishlist", label: "Favoritos", count: getNotificationsByType("wishlist").length },
    { value: "stock", label: "Stock", count: getNotificationsByType("stock").length },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Bell className="h-8 w-8 text-gray-700 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notificaciones</h1>
              {unreadCount > 0 && <p className="text-gray-600">{unreadCount} sin leer</p>}
            </div>
          </div>
          <div className="flex space-x-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center px-4 py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors"
              >
                <Eye className="h-4 w-4 mr-2" />
                Marcar todas como leídas
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Limpiar todas
              </button>
            )}
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filtrar notificaciones</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedFilter(option.value as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === option.value
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        </div>

        {/* Lista de notificaciones */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedFilter === "all" ? "No tienes notificaciones" : "No hay notificaciones de este tipo"}
            </h2>
            <p className="text-gray-600 mb-6">
              {selectedFilter === "all"
                ? "Te notificaremos sobre ofertas especiales y actualizaciones de tus productos favoritos."
                : "Cambia el filtro para ver otros tipos de notificaciones."}
            </p>
            <Link
              href="/"
              className="bg-gray-900 text-white py-2 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors inline-block"
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${getNotificationBgColor(
                  notification.type,
                  notification.isRead,
                )}`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-grow">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3
                            className={`text-lg font-semibold ${
                              !notification.isRead ? "text-gray-900" : "text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {notification.discount && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              -{notification.discount}%
                            </span>
                          )}
                          {!notification.isRead && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Nuevo
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{notification.message}</p>
                        <p className="text-sm text-gray-500">{formatDate(notification.createdAt)}</p>
                        {notification.expiresAt && (
                          <p className="text-sm text-orange-600 mt-1">Expira: {formatDate(notification.expiresAt)}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-800 p-2"
                          title="Marcar como leída"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                        title="Eliminar"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  {notification.actionUrl && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Link
                        href={notification.actionUrl}
                        onClick={() => markAsRead(notification.id)}
                        className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
                      >
                        Ver producto
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
