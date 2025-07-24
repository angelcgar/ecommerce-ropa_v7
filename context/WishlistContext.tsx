"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Producto } from "@/data/productos"

interface WishlistContextType {
  wishlistItems: Producto[]
  addToWishlist: (producto: Producto) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  toggleWishlist: (producto: Producto) => void
  clearWishlist: () => void
  wishlistCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Producto[]>([])

  // Cargar wishlist desde localStorage al iniciar
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Error al cargar la wishlist:", error)
      }
    }
  }, [])

  // Guardar wishlist en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (producto: Producto) => {
    setWishlistItems((prev) => {
      if (!prev.find((item) => item.id === producto.id)) {
        return [...prev, producto]
      }
      return prev
    })
  }

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  const toggleWishlist = (producto: Producto) => {
    if (isInWishlist(producto.id)) {
      removeFromWishlist(producto.id)
    } else {
      addToWishlist(producto)
    }
  }

  const clearWishlist = () => {
    setWishlistItems([])
    localStorage.removeItem("wishlist")
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        clearWishlist,
        wishlistCount: wishlistItems.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist debe usarse dentro de un WishlistProvider")
  }
  return context
}
