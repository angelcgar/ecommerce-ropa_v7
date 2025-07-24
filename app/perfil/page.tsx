"use client"

import Header from "@/components/Header"
import NotificationSettings from "@/components/NotificationSettings"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"
import { useNotifications } from "@/context/NotificationContext"
import { User, MapPin, Mail, Phone, Package, CreditCard, LogOut, Bell } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PerfilUsuario() {
  const { user, logout, isAuthenticated } = useAuth()
  const { totalItems } = useCart()
  const { unreadCount } = useNotifications()
  const [activeTab, setActiveTab] = useState<"perfil" | "notificaciones">("perfil")

  // Si el usuario no está autenticado, mostrar mensaje
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso restringido</h1>
            <p className="text-gray-600 mb-6">Necesitas iniciar sesión para acceder a tu perfil de usuario.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="bg-gray-900 text-white py-2 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/registro"
                className="bg-white text-gray-800 border border-gray-300 py-2 px-6 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Crear cuenta
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Perfil</h1>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("perfil")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "perfil"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Mi Perfil
              </button>
              <button
                onClick={() => setActiveTab("notificaciones")}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === "notificaciones"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notificaciones
                {unreadCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>

        {activeTab === "perfil" ? (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar con información del usuario */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-gray-500" />
                  </div>
                  <h2 className="text-xl font-semibold">{user?.nombre}</h2>
                  <p className="text-gray-500">{user?.email}</p>
                  {user?.rol === "admin" && (
                    <span className="mt-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-full">Administrador</span>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  {user?.telefono && (
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Teléfono</p>
                        <p className="text-sm text-gray-500">{user.telefono}</p>
                      </div>
                    </div>
                  )}

                  {user?.direccion && (
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Dirección</p>
                        <p className="text-sm text-gray-500">{user.direccion.calle}</p>
                        <p className="text-sm text-gray-500">
                          {user.direccion.ciudad}, {user.direccion.estado} {user.direccion.codigoPostal}
                        </p>
                        <p className="text-sm text-gray-500">{user.direccion.pais}</p>
                      </div>
                    </div>
                  )}

                  {user?.metodoPago && (
                    <div className="flex items-start">
                      <CreditCard className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Método de pago</p>
                        <p className="text-sm text-gray-500">
                          {user.metodoPago.tipo}
                          {user.metodoPago.ultimosDigitos !== "N/A" &&
                            ` terminada en ${user.metodoPago.ultimosDigitos}`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t">
                  <button
                    onClick={logout}
                    className="w-full flex items-center justify-center text-gray-600 hover:text-gray-900"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>

            {/* Contenido principal */}
            <div className="md:col-span-2 space-y-8">
              {/* Resumen */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Resumen</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Package className="h-8 w-8 text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Productos en carrito</p>
                        <p className="text-xl font-semibold">{totalItems}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Bell className="h-8 w-8 text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Notificaciones sin leer</p>
                        <p className="text-xl font-semibold">{unreadCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pedidos recientes */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Pedidos recientes</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((pedido) => (
                    <div key={pedido} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <p className="font-medium">Pedido #{10000 + pedido}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(2023, 5 - pedido, 10 + pedido * 2).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">3 productos</p>
                      <div className="flex justify-between">
                        <p className="font-medium">${(99.99 * pedido).toFixed(2)}</p>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Entregado</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Configuración de la cuenta */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Configuración de la cuenta</h2>
                <div className="space-y-4">
                  <button className="w-full text-left px-4 py-2 border rounded-md hover:bg-gray-50">
                    Editar información personal
                  </button>
                  <button className="w-full text-left px-4 py-2 border rounded-md hover:bg-gray-50">
                    Cambiar contraseña
                  </button>
                  <button className="w-full text-left px-4 py-2 border rounded-md hover:bg-gray-50">
                    Gestionar direcciones
                  </button>
                  <button className="w-full text-left px-4 py-2 border rounded-md hover:bg-gray-50">
                    Métodos de pago
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NotificationSettings />
        )}
      </div>
    </main>
  )
}
