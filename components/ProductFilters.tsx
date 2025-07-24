"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Filter, X } from "lucide-react"

export interface FilterState {
  categoria: string
  precioMin: number
  precioMax: number
  tallas: string[]
  ordenamiento: string
}

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void
  initialFilters: FilterState
}

export default function ProductFilters({ onFiltersChange, initialFilters }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [showFilters, setShowFilters] = useState(false)

  const categorias = ["Todos", "Hombre", "Mujer", "Accesorios"]
  const rangosPrecios = [
    { label: "Todos los precios", min: 0, max: 1000 },
    { label: "$0 - $50", min: 0, max: 50 },
    { label: "$51 - $100", min: 51, max: 100 },
    { label: "$101+", min: 101, max: 1000 },
  ]
  const tallasDisponibles = ["XS", "S", "M", "L", "XL", "38", "39", "40", "41", "42", "43", "Único"]
  const opcionesOrdenamiento = [
    { value: "nombre-asc", label: "Nombre A-Z" },
    { value: "nombre-desc", label: "Nombre Z-A" },
    { value: "precio-asc", label: "Precio: Menor a Mayor" },
    { value: "precio-desc", label: "Precio: Mayor a Menor" },
  ]

  useEffect(() => {
    onFiltersChange(filters)
  }, [filters, onFiltersChange])

  const handleCategoriaChange = (categoria: string) => {
    setFilters((prev) => ({ ...prev, categoria: categoria === "Todos" ? "" : categoria }))
  }

  const handlePrecioChange = (min: number, max: number) => {
    setFilters((prev) => ({ ...prev, precioMin: min, precioMax: max }))
  }

  const handleTallaToggle = (talla: string) => {
    setFilters((prev) => ({
      ...prev,
      tallas: prev.tallas.includes(talla) ? prev.tallas.filter((t) => t !== talla) : [...prev.tallas, talla],
    }))
  }

  const handleOrdenamientoChange = (ordenamiento: string) => {
    setFilters((prev) => ({ ...prev, ordenamiento }))
  }

  const clearFilters = () => {
    const clearedFilters = {
      categoria: "",
      precioMin: 0,
      precioMax: 1000,
      tallas: [],
      ordenamiento: "nombre-asc",
    }
    setFilters(clearedFilters)
  }

  const hasActiveFilters =
    filters.categoria || filters.precioMin > 0 || filters.precioMax < 1000 || filters.tallas.length > 0

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Botón para mostrar/ocultar filtros en móvil */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filtros y Ordenamiento</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center text-gray-600 hover:text-gray-900"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filtros
            <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Filtros */}
        <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select
                value={filters.categoria || "Todos"}
                onChange={(e) => handleCategoriaChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
              <select
                value={`${filters.precioMin}-${filters.precioMax}`}
                onChange={(e) => {
                  const [min, max] = e.target.value.split("-").map(Number)
                  handlePrecioChange(min, max)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                {rangosPrecios.map((rango) => (
                  <option key={`${rango.min}-${rango.max}`} value={`${rango.min}-${rango.max}`}>
                    {rango.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tallas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tallas</label>
              <div className="relative">
                <select
                  multiple
                  value={filters.tallas}
                  onChange={(e) => {
                    const selectedTallas = Array.from(e.target.selectedOptions, (option) => option.value)
                    setFilters((prev) => ({ ...prev, tallas: selectedTallas }))
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 h-10 overflow-hidden"
                >
                  {tallasDisponibles.map((talla) => (
                    <option key={talla} value={talla}>
                      {talla}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              {filters.tallas.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {filters.tallas.map((talla) => (
                    <span
                      key={talla}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                    >
                      {talla}
                      <button
                        onClick={() => handleTallaToggle(talla)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Ordenamiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
              <select
                value={filters.ordenamiento}
                onChange={(e) => handleOrdenamientoChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                {opcionesOrdenamiento.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Limpiar filtros */}
            <div className="flex items-end">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
