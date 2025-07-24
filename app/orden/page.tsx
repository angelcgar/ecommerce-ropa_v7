"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import { useCart } from "@/context/CartContext"
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react"

export default function OrdenPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)

  // Manejar cambio de cantidad
  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setIsUpdating(true)

    // Simular un pequeño retraso para mostrar el estado de actualización
    setTimeout(() => {
      updateQuantity(index, newQuantity)
      setIsUpdating(false)
    }, 300)
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark_primary">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50 mb-8">Tu Orden</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">Parece que aún no has añadido productos a tu carrito.</p>
            <Link
              href="/"
              className="bg-gray-900 text-white py-2 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors inline-block"
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Productos ({items.length})</h2>
                </div>

                <div className="divide-y">
                  {items.map((item, index) => (
                    <div key={`${item.producto.id}-${item.talla.nombre}`} className="p-6 flex flex-col sm:flex-row">
                      <div className="w-full sm:w-24 h-24 bg-gray-100 rounded overflow-hidden mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                        <img
                          src={item.producto.imagen || "/placeholder.svg"}
                          alt={item.producto.nombre}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <h3 className="font-medium text-lg">{item.producto.nombre}</h3>
                          <p className="font-medium text-lg">${(item.talla.precio * item.cantidad).toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-slate-50 mt-1">Talla: {item.talla.nombre}</p>
                        <p className="text-sm text-gray-500 dark:text-slate-50">Precio unitario: ${item.talla.precio.toFixed(2)}</p>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() => handleQuantityChange(index, item.cantidad - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 dark:text-slate-50"
                              disabled={isUpdating}
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.cantidad}</span>
                            <button
                              onClick={() => handleQuantityChange(index, item.cantidad + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 dark:text-slate-50"
                              disabled={isUpdating}
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-gray-500 hover:text-red-500 flex items-center dark:text-slate-50"
                            disabled={isUpdating}
                          >
                            <Trash2 className="h-5 w-5 mr-1" />
                            <span className="hidden sm:inline">Eliminar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumen de la orden */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Resumen</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-slate-50">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-slate-50">Envío</span>
                    <span>Gratis</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-slate-50">Impuestos</span>
                    <span>${(totalPrice * 0.21).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${(totalPrice * 1.21).toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/confirmar-pedido"
                  className="w-full bg-gray-900 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-700 transition-colors flex items-center justify-center"
                >
                  Continuar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
