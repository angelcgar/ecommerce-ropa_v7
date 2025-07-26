"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useWishlist } from "./WishlistContext"
import type { Producto } from "@/data/productos"

export interface Notification {
  id: string
  type: "offer" | "wishlist" | "stock" | "price_drop" | "general"
  title: string
  message: string
  productId?: string
  product?: Producto
  isRead: boolean
  createdAt: Date
  expiresAt?: Date
  actionUrl?: string
  discount?: number
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "isRead">) => void
  markAsRead: (notificationId: string) => void
  markAllAsRead: () => void
  removeNotification: (notificationId: string) => void
  clearAllNotifications: () => void
  getNotificationsByType: (type: Notification["type"]) => Notification[]
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { wishlistItems } = useWishlist()

  // Cargar notificaciones desde localStorage al iniciar
  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications")
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications).map((notif: any) => ({
          ...notif,
          createdAt: new Date(notif.createdAt),
          expiresAt: notif.expiresAt ? new Date(notif.expiresAt) : undefined,
        }))
        // Filtrar notificaciones expiradas
        const validNotifications = parsed.filter(
          (notif: Notification) => !notif.expiresAt || notif.expiresAt > new Date(),
        )
        setNotifications(validNotifications)
      } catch (error) {
        console.error("Error al cargar notificaciones:", error)
      }
    }
  }, [])

  // Guardar notificaciones en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications))
  }, [notifications])

  // Simular notificaciones de ofertas y productos favoritos
  useEffect(() => {
    // Generar notificaciones de ofertas aleatorias
    const generateOfferNotifications = () => {
      const offerProducts = [
        { id: "1", name: "Camiseta Básica", discount: 20 },
        { id: "3", name: "Vestido Floral", discount: 30 },
        { id: "5", name: "Sudadera con Capucha", discount: 25 },
      ]

      offerProducts.forEach((product, index) => {
        setTimeout(
          () => {
            addNotification({
              type: "offer",
              title: `¡Oferta especial!`,
              message: `${product.discount}% de descuento en ${product.name}`,
              productId: product.id,
              discount: product.discount,
              actionUrl: `/producto/${product.id}`,
              expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
            })
          },
          (index + 1) * 5000,
        ) // Escalonar las notificaciones
      })
    }

    // Generar notificaciones para productos en wishlist
    const generateWishlistNotifications = () => {
      if (wishlistItems.length > 0) {
        const randomProduct = wishlistItems[Math.floor(Math.random() * wishlistItems.length)]
        setTimeout(() => {
          addNotification({
            type: "price_drop",
            title: "¡Precio reducido!",
            message: `El precio de ${randomProduct.nombre} ha bajado`,
            productId: randomProduct.id,
            product: randomProduct,
            actionUrl: `/producto/${randomProduct.id}`,
          })
        }, 10000)
      }
    }

    // Ejecutar solo una vez al cargar
    const hasGeneratedInitialNotifications = localStorage.getItem("hasGeneratedInitialNotifications")
    if (!hasGeneratedInitialNotifications) {
      generateOfferNotifications()
      generateWishlistNotifications()
      localStorage.setItem("hasGeneratedInitialNotifications", "true")
    }
  }, [wishlistItems])

  const addNotification = (notificationData: Omit<Notification, "id" | "createdAt" | "isRead">) => {
    const newNotification: Notification = {
      ...notificationData,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      isRead: false,
    }

    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const removeNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== notificationId))
  }

  const clearAllNotifications = () => {
    setNotifications([])
    localStorage.removeItem("notifications")
  }

  const getNotificationsByType = (type: Notification["type"]) => {
    return notifications.filter((notif) => notif.type === type)
  }

  const unreadCount = notifications.filter((notif) => !notif.isRead).length

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
        getNotificationsByType,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications debe usarse dentro de un NotificationProvider")
  }
  return context
}
