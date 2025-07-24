"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Producto, Talla } from "@/data/productos"

export interface CartItem {
  producto: Producto
  talla: Talla
  cantidad: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (producto: Producto, talla: Talla) => void
  removeFromCart: (index: number) => void
  updateQuantity: (index: number, cantidad: number) => void
  clearCart: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error al cargar el carrito:", error)
      }
    }
  }, [])

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items))
    }

    // Calcular totales
    const itemCount = items.reduce((total, item) => total + item.cantidad, 0)
    const priceTotal = items.reduce((total, item) => total + item.talla.precio * item.cantidad, 0)

    setTotalItems(itemCount)
    setTotalPrice(priceTotal)
  }, [items])

  const addToCart = (producto: Producto, talla: Talla) => {
    // Verificar si el producto con la misma talla ya está en el carrito
    const existingItemIndex = items.findIndex(
      (item) => item.producto.id === producto.id && item.talla.nombre === talla.nombre,
    )

    if (existingItemIndex >= 0) {
      // Si ya existe, incrementar la cantidad
      const updatedItems = [...items]
      updatedItems[existingItemIndex].cantidad += 1
      setItems(updatedItems)
    } else {
      // Si no existe, añadir nuevo item
      setItems([...items, { producto, talla, cantidad: 1 }])
    }

    // Abrir el carrito al añadir un producto
    setIsOpen(true)
  }

  const removeFromCart = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)

    // Si el carrito queda vacío, eliminar del localStorage
    if (newItems.length === 0) {
      localStorage.removeItem("cart")
    }
  }

  const updateQuantity = (index: number, cantidad: number) => {
    if (cantidad < 1) return

    const updatedItems = [...items]
    updatedItems[index].cantidad = cantidad
    setItems(updatedItems)
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("cart")
  }

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isOpen,
        openCart,
        closeCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart debe usarse dentro de un CartProvider")
  }
  return context
}
