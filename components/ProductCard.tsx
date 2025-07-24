"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { useWishlist } from "@/context/WishlistContext"
import type { Producto } from "@/data/productos"

interface ProductCardProps {
  producto: Producto
}

export default function ProductCard({ producto }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const isWishlisted = isInWishlist(producto.id)

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(producto)
  }

  return (
    <div className="group relative">
      <Link href={`/producto/${producto.id}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="relative h-64 w-full">
            <Image src={producto.imagen || "/placeholder.svg"} alt={producto.nombre} fill className="object-cover" />
            {/* Botón de wishlist */}
            <button
              onClick={handleWishlistClick}
              className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                isWishlisted
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
              }`}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
              {producto.nombre}
            </h2>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xl font-semibold text-gray-700">${producto.precio.toFixed(2)}</p>
              <span className="text-sm text-gray-500">{producto.categoria}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
