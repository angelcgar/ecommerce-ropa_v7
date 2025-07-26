"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, X, Eye, Trash2, Gift, Heart, TrendingDown, Package, Info } from "lucide-react"
// import { useNotifications } from "@/context/NotificationContext"
import Link from "next/link"

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  // const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } =
  //   useNotifications()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "offer":
        return <Gift className="h-5 w-5 text-green-500" />
      case "wishlist":
        return <Heart className="h-5 w-5 text-red-500" />
      case "price_drop":
        return <TrendingDown className="h-5 w-5 text-blue-500" />
      case "stock":
        return <Package className="h-5 w-5 text-orange-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case "offer":
        return "bg-green-50 border-green-200"
      case "wishlist":
        return "bg-red-50 border-red-200"
      case "price_drop":
        return "bg-blue-50 border-blue-200"
      case "stock":
        return "bg-orange-50 border-orange-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Ahora"
    if (diffInMinutes < 60) return `Hace ${diffInMinutes}m`
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)}h`
    return `Hace ${Math.floor(diffInMinutes / 1440)}d`
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Bell className="h-6 w-6" />
        {/* {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )} */}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            {/* <h3 className="text-lg font-semibold text-gray-900">
              Notificaciones {unreadCount > 0 && <span className="text-red-500">({unreadCount})</span>}
            </h3>
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  title="Marcar todas como leídas"
                >
                  <Eye className="h-4 w-4" />
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="text-sm text-red-600 hover:text-red-800 flex items-center"
                  title="Limpiar todas"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div> */}
          </div>

          {/* Lista de notificaciones */}
          <div className="max-h-80 overflow-y-auto">
            {/* {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p>No tienes notificaciones</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <h4
                            className={`text-sm font-medium ${!notification.isRead ? "text-gray-900" : "text-gray-700"}`}
                          >
                            {notification.title}
                            {notification.discount && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                -{notification.discount}%
                              </span>
                            )}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-2">{formatTimeAgo(notification.createdAt)}</p>
                        </div>
                        <div className="flex space-x-1 ml-2">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Marcar como leída"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Eliminar"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      {notification.actionUrl && (
                        <Link
                          href={notification.actionUrl}
                          onClick={() => {
                            markAsRead(notification.id)
                            setIsOpen(false)
                          }}
                          className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Ver producto →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )} */}
          </div>

          {/* Footer */}
          {/* {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <Link
                href="/notificaciones"
                onClick={() => setIsOpen(false)}
                className="block text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Ver todas las notificaciones
              </Link>
            </div>
          )} */}
        </div>
      )}
    </div>
  )
}
