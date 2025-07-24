"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/Header"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react"

export default function PagarPedidoPage() {
  const { totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Calcular totales
  const subtotal = totalPrice
  const impuestos = totalPrice * 0.21
  const total = subtotal + impuestos

  // Manejar el envío del formulario de pago
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      clearCart() // Limpiar el carrito después del pago exitoso

      // Redirigir después de un breve retraso
      setTimeout(() => {
        router.push("/")
      }, 3000)
    }, 2000)
  }

  // Si el pago está completo, mostrar pantalla de confirmación
  if (isComplete) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-md mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">¡Pago completado!</h1>
            <p className="text-gray-600 mb-6">
              Tu pedido ha sido procesado correctamente. Recibirás un correo electrónico con los detalles de tu compra.
            </p>
            <Link
              href="/"
              className="bg-gray-900 text-white py-2 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors inline-block"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center mb-8">
            <Link href="/confirmar-pedido" className="text-gray-600 hover:text-gray-900 flex items-center mr-4">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Volver</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Pagar Pedido</h1>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Método de pago</h2>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex space-x-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex-1 p-4 border rounded-md flex flex-col items-center ${
                      paymentMethod === "card" ? "border-gray-900 bg-gray-50" : "border-gray-200"
                    }`}
                  >
                    <CreditCard className={`h-6 w-6 ${paymentMethod === "card" ? "text-gray-900" : "text-gray-400"}`} />
                    <span className={`mt-2 ${paymentMethod === "card" ? "font-medium" : ""}`}>Tarjeta de crédito</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`flex-1 p-4 border rounded-md flex flex-col items-center ${
                      paymentMethod === "paypal" ? "border-gray-900 bg-gray-50" : "border-gray-200"
                    }`}
                  >
                    <span
                      className={`text-xl font-bold ${paymentMethod === "paypal" ? "text-gray-900" : "text-gray-400"}`}
                    >
                      PayPal
                    </span>
                    <span className={`mt-2 ${paymentMethod === "paypal" ? "font-medium" : ""}`}>Pagar con PayPal</span>
                  </button>
                </div>

                {paymentMethod === "card" ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre en la tarjeta
                      </label>
                      <input
                        id="cardName"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        placeholder="Nombre completo"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Número de tarjeta
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Fecha de expiración
                        </label>
                        <input
                          id="expDate"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                          placeholder="MM/AA"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          id="cvv"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`w-full bg-gray-900 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors ${
                        isProcessing ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isProcessing ? "Procesando pago..." : `Pagar $${total.toFixed(2)}`}
                    </button>
                  </form>
                ) : (
                  <div className="text-center p-6">
                    <p className="mb-6">Serás redirigido a PayPal para completar tu pago de forma segura.</p>
                    <button
                      onClick={handleSubmit}
                      disabled={isProcessing}
                      className={`w-full bg-blue-500 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-600 transition-colors ${
                        isProcessing ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isProcessing ? "Procesando pago..." : `Pagar con PayPal $${total.toFixed(2)}`}
                    </button>
                  </div>
                )}
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="font-medium mb-2">Resumen del pedido</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impuestos (21%)</span>
                    <span>${impuestos.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}
