"use client"

import { useState, useEffect } from "react"
import { X, Gift, Heart, TrendingDown, Package, Info } from "lucide-react"
import { useNotifications } from "@/context/NotificationContext"
import type { Notification } from "@/context/NotificationContext"
import Link from "next/link"

export default function NotificationToast() {
  const { notifications } = useNotifications()
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Mostrar solo las notificaciones más recientes (últimos 5 minutos)
    const recentNotifications = notifications.filter((notif) => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
      return notif.createdAt > fiveMinutesAgo && !notif.isRead
    })

    setVisibleNotifications(recentNotifications.slice(0, 3)) // Máximo 3 toasts
  }, [notifications])

  const removeToast = (notificationId: string) => {
    setVisibleNotifications((prev) => prev.filter((notif) => notif.id !== notificationId))
  }

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

  const getToastColor = (type: string) => {
    switch (type) {
      case "offer":
        return "border-green-500 bg-green-50"
      case "wishlist":
        return "border-red-500 bg-red-50"
      case "price_drop":
        return "border-blue-500 bg-blue-50"
      case "stock":
        return "border-orange-500 bg-orange-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  if (visibleNotifications.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3">
      {visibleNotifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 ${getToastColor(
            notification.type,
          )} transform transition-all duration-500 ease-in-out animate-slide-in`}
          style={{
            animationDelay: `${index * 200}ms`,
          }}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>
              <div className="ml-3 w-0 flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                  <button
                    onClick={() => removeToast(notification.id)}
                    className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                {notification.discount && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-2">
                    -{notification.discount}% OFF
                  </span>
                )}
                {notification.actionUrl && (
                  <div className="mt-3">
                    <Link
                      href={notification.actionUrl}
                      onClick={() => removeToast(notification.id)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Ver ahora →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
