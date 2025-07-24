"use client"

import Link from "next/link"
import { ShoppingBag, User, X, Minus, Plus, Trash2, LogIn, UserPlus, Heart } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { useWishlist } from "@/context/WishlistContext"
import NotificationBell from "./NotificationBell"
import SearchBar from "./SearchBar"
import ThemeToggle from "./ThemeToggle"
import type { Producto } from "@/data/productos"

interface HeaderProps {
  onSearchResults?: (results: Producto[], query: string) => void
  onClearSearch?: () => void
}

export default function Header({ onSearchResults, onClearSearch }: HeaderProps) {
  const { items, isOpen, openCart, closeCart, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart()
  const { user, logout, isAuthenticated } = useAuth()
  const { wishlistCount } = useWishlist()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Crear una nueva URL con los parámetros actualizados
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  // Filtrar por categoría
  const handleCategoryClick = (categoria: string) => {
    // Limpiar búsqueda si existe
    if (onClearSearch) {
      onClearSearch()
    }
    router.push(`/?${createQueryString("categoria", categoria)}`)
  }

  // Verificar si una categoría está activa
  const isCategoryActive = (categoria: string) => {
    return searchParams.get("categoria") === categoria
  }

  // Manejar resultados de búsqueda
  const handleSearchResults = (results: Producto[], query: string) => {
    if (onSearchResults) {
      onSearchResults(results, query)
    }
  }

  // Manejar limpiar búsqueda
  const handleClearSearch = () => {
    if (onClearSearch) {
      onClearSearch()
    }
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-xl text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            MODA STYLE
          </Link>

          {/* Navegación y búsqueda */}
          <div className="flex items-center flex-1 max-w-3xl mx-8">
            {/* Navegación */}
            <nav className="hidden md:flex space-x-8 mr-8">
              <button
                onClick={() => handleCategoryClick("Hombre")}
                className={`${
                  isCategoryActive("Hombre")
                    ? "text-gray-900 dark:text-gray-100 font-medium"
                    : "text-gray-600 dark:text-gray-300"
                } hover:text-gray-900 dark:hover:text-gray-100 transition-colors`}
              >
                Hombre
              </button>
              <button
                onClick={() => handleCategoryClick("Mujer")}
                className={`${
                  isCategoryActive("Mujer")
                    ? "text-gray-900 dark:text-gray-100 font-medium"
                    : "text-gray-600 dark:text-gray-300"
                } hover:text-gray-900 dark:hover:text-gray-100 transition-colors`}
              >
                Mujer
              </button>
              <button
                onClick={() => handleCategoryClick("Accesorios")}
                className={`${
                  isCategoryActive("Accesorios")
                    ? "text-gray-900 dark:text-gray-100 font-medium"
                    : "text-gray-600 dark:text-gray-300"
                } hover:text-gray-900 dark:hover:text-gray-100 transition-colors`}
              >
                Accesorios
              </button>
            </nav>

            {/* Barra de búsqueda */}
            <SearchBar onSearchResults={handleSearchResults} onClearSearch={handleClearSearch} />
          </div>

          {/* Iconos de acción */}
          <div className="flex items-center space-x-4">
            {/* Toggle de tema */}
            <ThemeToggle />

            {/* Notificaciones */}
            <NotificationBell />

            {/* Usuario */}
            {isAuthenticated ? (
              <Link
                href="/perfil"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center transition-colors"
              >
                <User className="h-6 w-6" />
                <span className="ml-2 hidden sm:inline-block font-medium">{user?.nombre}</span>
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  title="Iniciar sesión"
                >
                  <LogIn className="h-6 w-6" />
                </Link>
                <Link
                  href="/registro"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hidden sm:block transition-colors"
                  title="Registrarse"
                >
                  <UserPlus className="h-6 w-6" />
                </Link>
              </div>
            )}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 relative transition-colors"
              title="Lista de favoritos"
            >
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Carrito */}
            <button
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 relative transition-colors"
              onClick={openCart}
              title="Carrito de compras"
            >
              <ShoppingBag className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Botón de logout para usuarios autenticados (solo móvil) */}
            {isAuthenticated && (
              <button
                onClick={logout}
                className="sm:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                title="Cerrar sesión"
              >
                <LogIn className="h-6 w-6 rotate-180" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Carrito desplegable con animación */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transition-opacity duration-300 ease-in-out">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md h-full overflow-auto transform transition-transform duration-300 ease-in-out translate-x-0 animate-slide-in">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Tu Carrito ({totalItems})</h2>
              <button
                onClick={closeCart}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {items.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">Tu carrito está vacío</div>
              ) : (
                items.map((item, index) => (
                  <div key={`${item.producto.id}-${item.talla.nombre}`} className="p-4 flex">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden mr-4 flex-shrink-0">
                      <img
                        src={item.producto.imagen || "/placeholder.svg"}
                        alt={item.producto.nombre}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.producto.nombre}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Talla: {item.talla.nombre}</p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">${item.talla.precio.toFixed(2)}</p>

                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(index, item.cantidad - 1)}
                          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="mx-2 text-gray-900 dark:text-gray-100">{item.cantidad}</span>
                        <button
                          onClick={() => updateQuantity(index, item.cantidad + 1)}
                          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => removeFromCart(index)}
                          className="ml-auto text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-900">
                <div className="flex justify-between mb-4">
                  <span className="font-medium text-gray-900 dark:text-gray-100">Total:</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="space-y-2">
                  <Link
                    href="/orden"
                    className="block w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-3 px-6 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center"
                    onClick={closeCart}
                  >
                    Ver orden
                  </Link>
                  <Link
                    href="/confirmar-pedido"
                    className="block w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-3 px-6 rounded-md font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center"
                    onClick={closeCart}
                  >
                    Confirmar pedido
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
