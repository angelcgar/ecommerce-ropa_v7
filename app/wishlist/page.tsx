"use client"

import Header from "@/components/Header"
import ProductCard from "@/components/ProductCard"
import { useWishlist } from "@/context/WishlistContext"
import { Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function WishlistPage() {
  const { wishlistItems, clearWishlist, wishlistCount } = useWishlist()

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-red-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Mi Lista de Favoritos</h1>
          </div>
          {wishlistCount > 0 && (
            <button
              onClick={clearWishlist}
              className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 border border-gray-300 rounded-md hover:border-red-300 transition-colors"
            >
              Limpiar lista
            </button>
          )}
        </div>

        {wishlistItems.length > 0 ? (
          <>
            <p className="text-gray-500 mb-8">{wishlistCount} productos en tu lista de favoritos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistItems.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu lista de favoritos está vacía</h2>
            <p className="text-gray-600 mb-6">
              Explora nuestros productos y añade tus favoritos haciendo clic en el corazón.
            </p>
            <Link
              href="/"
              className="bg-gray-900 text-white py-2 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors inline-flex items-center"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Explorar productos
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
