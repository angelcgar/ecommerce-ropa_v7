"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { notFound } from "next/navigation"
import { productos } from "@/data/productos"
import Header from "@/components/Header"
import { ArrowLeft } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function ProductoDetalle({ params }: { params: { id: string } }) {
  const producto = productos.find((p) => p.id === params.id)
  const [tallaSeleccionada, setTallaSeleccionada] = useState(producto?.tallas.find((t) => t.disponible)?.nombre || "")
  const { addToCart } = useCart()

  if (!producto) {
    notFound()
  }

  // Encontrar el precio de la talla seleccionada
  const precioTalla = producto.tallas.find((t) => t.nombre === tallaSeleccionada)?.precio || producto.precio

  // Manejar la adición al carrito
  const handleAddToCart = () => {
    if (!tallaSeleccionada) return

    const talla = producto.tallas.find((t) => t.nombre === tallaSeleccionada)
    if (talla) {
      addToCart(producto, talla)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark_primary">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center text-gray-600 dark:text-slate-50 hover:text-gray-900 dark:hover:text-slate-100 mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a la tienda
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              <div className="relative h-96 md:h-full w-full">
                <Image
                  src={producto.imagen || "/placeholder.svg"}
                  alt={producto.nombre}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="p-8 md:w-1/2">
              <div className="flex justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50 mb-4">{producto.nombre}</h1>
                <span className="text-sm text-gray-500 dark:text-slate-50">{producto.categoria}</span>
              </div>

              <p className="text-2xl font-semibold text-gray-700 dark:text-slate-50 mb-6">${precioTalla.toFixed(2)}</p>

              <div className="prose prose-gray mb-8">
                <p>{producto.descripcion}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-slate-50 mb-2">Tallas disponibles</h3>
                <div className="flex flex-wrap gap-2">
                  {producto.tallas.map((talla) => (
                    <button
                      key={talla.nombre}
                      className={`
                        border rounded-md py-2 px-4 text-sm font-medium
                        ${talla.disponible ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
                        ${
                          tallaSeleccionada === talla.nombre && talla.disponible
                            ? "bg-gray-900 text-white border-gray-900"
                            : "border-gray-300 text-gray-700 dark:text-slate-50 hover:bg-gray-50 dark:hover:bg-gray-500 hover:text-gray-900"
                        }
                      `}
                      onClick={() => talla.disponible && setTallaSeleccionada(talla.nombre)}
                      disabled={!talla.disponible}
                    >
                      {talla.nombre} {talla.precio !== producto.precio && `($${talla.precio.toFixed(2)})`}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
                  tallaSeleccionada
                    ? "bg-gray-900 text-white hover:bg-gray-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleAddToCart}
                disabled={!tallaSeleccionada}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
