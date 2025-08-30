'use client';

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import ProductCard from "@/components/ProductCard"
import  { type FilterState } from "@/components/ProductFilters"
import type { Producto } from "@/data/productos"


export default function HomeRender({productos}: { productos: Producto[]}) {
    const searchParams = useSearchParams()
  const categoriaFiltro = searchParams.get("categoria")

  // Estado para búsqueda
  const [searchResults, setSearchResults] = useState<Producto[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchActive, setIsSearchActive] = useState(false)

  // Estado inicial de filtros
  const [filters, setFilters] = useState<FilterState>({
    categoria: categoriaFiltro || "",
    precioMin: 0,
    precioMax: 1000,
    tallas: [],
    ordenamiento: "nombre-asc",
  })

  // Cargar preferencias del usuario desde localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem("productFilters")
    if (savedFilters) {
      try {
        const parsedFilters = JSON.parse(savedFilters)
        setFilters((prev) => ({
          ...parsedFilters,
          categoria: categoriaFiltro || parsedFilters.categoria, // Priorizar URL
        }))
      } catch (error) {
        console.error("Error al cargar filtros guardados:", error)
      }
    }
  }, [categoriaFiltro])

  // Guardar preferencias en localStorage
  useEffect(() => {
    localStorage.setItem("productFilters", JSON.stringify(filters))
  }, [filters])

  // Manejar resultados de búsqueda
  const handleSearchResults = (results: Producto[], query: string) => {
    setSearchResults(results)
    setSearchQuery(query)
    setIsSearchActive(true)
    // Limpiar filtros de categoría cuando se hace búsqueda
    setFilters((prev) => ({ ...prev, categoria: "" }))
  }

  // Manejar limpiar búsqueda
  const handleClearSearch = () => {
    setSearchResults([])
    setSearchQuery("")
    setIsSearchActive(false)
  }

  // Determinar qué productos mostrar
  const productosBase = isSearchActive ? searchResults : productos

  // Filtrar y ordenar productos
  const productosFiltrados = useMemo(() => {
    let resultado = [...productosBase]

    // Filtrar por categoría (solo si no hay búsqueda activa)
    if (filters.categoria && !isSearchActive) {
      resultado = resultado.filter((producto) => producto.categoria === filters.categoria)
    }

    // Filtrar por precio
    resultado = resultado.filter(
      (producto) => producto.precio >= filters.precioMin && producto.precio <= filters.precioMax,
    )

    // Filtrar por tallas disponibles
    if (filters.tallas.length > 0) {
      resultado = resultado.filter((producto) =>
        producto.tallas.some((talla) => filters.tallas.includes(talla.nombre) && talla.disponible),
      )
    }

    // Ordenar productos
    switch (filters.ordenamiento) {
      case "nombre-asc":
        resultado.sort((a, b) => a.nombre.localeCompare(b.nombre))
        break
      case "nombre-desc":
        resultado.sort((a, b) => b.nombre.localeCompare(a.nombre))
        break
      case "precio-asc":
        resultado.sort((a, b) => a.precio - b.precio)
        break
      case "precio-desc":
        resultado.sort((a, b) => b.precio - a.precio)
        break
      default:
        break
    }

    return resultado
  }, [productosBase, filters, isSearchActive])

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  // Determinar el título
  const getTitle = () => {
    if (isSearchActive) {
      return `Resultados para "${searchQuery}"`
    }
    if (filters.categoria) {
      return `Colección: ${filters.categoria}`
    }
    return "Nuestra Colección"
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark_primary transition-colors">
      <Header onSearchResults={handleSearchResults} onClearSearch={handleClearSearch} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">{getTitle()}</h1>
          <p className="text-gray-500 dark:text-gray-400">{productosFiltrados.length} productos</p>
        </div>

        {/* Mostrar mensaje de búsqueda si está activa */}
        {isSearchActive && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-blue-800 dark:text-blue-200">
              Mostrando {productosFiltrados.length} resultados para "{searchQuery}"
              <button
                onClick={handleClearSearch}
                className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
              >
                Limpiar búsqueda
              </button>
            </p>
          </div>
        )}

        {/* TODO: Pasar este código a la pagina /search:slug */}
        {/* Filtros - Solo mostrar si hay búsqueda activa o productos filtrados */}
        {/* {(isSearchActive || productosFiltrados.length > 0) && (
          <ProductFilters onFiltersChange={handleFiltersChange} initialFilters={filters} />
        )} */}

        {/* Grid de productos */}
        {productosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productosFiltrados.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {isSearchActive
                ? `No se encontraron productos para "${searchQuery}".`
                : "No se encontraron productos que coincidan con los filtros seleccionados."}
            </p>
            <button
              onClick={() => {
                if (isSearchActive) {
                  handleClearSearch()
                } else {
                  setFilters({
                    categoria: "",
                    precioMin: 0,
                    precioMax: 1000,
                    tallas: [],
                    ordenamiento: "nombre-asc",
                  })
                }
              }}
              className="mt-4 px-6 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              {isSearchActive ? "Limpiar búsqueda" : "Limpiar filtros"}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
