"use client"

import Header from "@/components/Header"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, MapPin, CreditCard } from "lucide-react"

export default function ConfirmarPedidoPage() {
  const { items, totalPrice } = useCart()
  const { user } = useAuth()

  // Calcular totales
  const subtotal = totalPrice
  const impuestos = totalPrice * 0.21
  const total = subtotal + impuestos

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center mb-8">
            <Link href="/orden" className="text-gray-600 hover:text-gray-900 flex items-center mr-4">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Volver</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Confirmar Pedido</h1>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Información del pedido */}
            <div className="md:col-span-2 space-y-6">
              {/* Dirección de envío */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                    <h2 className="text-xl font-semibold">Dirección de envío</h2>
                  </div>
                  <button className="text-sm text-gray-600 hover:text-gray-900">Editar</button>
                </div>

                {user?.direccion ? (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="font-medium">{user.nombre}</p>
                    <p>{user.direccion.calle}</p>
                    <p>
                      {user.direccion.ciudad}, {user.direccion.estado} {user.direccion.codigoPostal}
                    </p>
                    <p>{user.direccion.pais}</p>
                    {user.telefono && <p className="mt-2">Teléfono: {user.telefono}</p>}
                  </div>
                ) : (
                  <div className="bg-yellow-50 p-4 rounded-md text-yellow-800">
                    <p>No has añadido una dirección de envío.</p>
                    <button className="text-sm font-medium underline mt-1">Añadir dirección</button>
                  </div>
                )}
              </div>

              {/* Método de pago */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                    <h2 className="text-xl font-semibold">Método de pago</h2>
                  </div>
                  <button className="text-sm text-gray-600 hover:text-gray-900">Editar</button>
                </div>

                {user?.metodoPago ? (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p>
                      {user.metodoPago.tipo}
                      {user.metodoPago.ultimosDigitos !== "N/A" && ` terminada en ${user.metodoPago.ultimosDigitos}`}
                    </p>
                  </div>
                ) : (
                  <div className="bg-yellow-50 p-4 rounded-md text-yellow-800">
                    <p>No has añadido un método de pago.</p>
                    <button className="text-sm font-medium underline mt-1">Añadir método de pago</button>
                  </div>
                )}
              </div>

              {/* Productos */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Productos ({items.length})</h2>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.producto.id}-${item.talla.nombre}`} className="flex items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-4 flex-shrink-0">
                        <img
                          src={item.producto.imagen || "/placeholder.svg"}
                          alt={item.producto.nombre}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium">
                            {item.producto.nombre} <span className="text-gray-500">x{item.cantidad}</span>
                          </h3>
                          <p className="font-medium">${(item.talla.precio * item.cantidad).toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-500">Talla: {item.talla.nombre}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Resumen</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span>Gratis</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impuestos (21%)</span>
                    <span>${impuestos.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/pagar-pedido"
                    className="w-full bg-gray-900 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    Proceder al pago
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>

                  <Link
                    href="/orden"
                    className="w-full bg-white text-gray-800 border border-gray-300 py-3 px-6 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    Editar pedido
                  </Link>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  Pago seguro garantizado
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}
