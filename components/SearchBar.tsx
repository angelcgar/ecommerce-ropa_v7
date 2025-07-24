"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { productos } from "@/data/productos"
import type { Producto } from "@/data/productos"

interface SearchBarProps {
  onSearchResults: (results: Producto[], query: string) => void
  onClearSearch: () => void
}

export default function SearchBar({ onSearchResults, onClearSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<Producto[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Buscar productos en tiempo real
  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = productos.filter(
        (producto) =>
          producto.nombre.toLowerCase().includes(query.toLowerCase()) ||
          producto.descripcion.toLowerCase().includes(query.toLowerCase()) ||
          producto.categoria.toLowerCase().includes(query.toLowerCase()),
      )
      setSuggestions(filtered.slice(0, 5)) // Máximo 5 sugerencias
      setIsOpen(true)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [query])

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim().length === 0) return

    const results = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        producto.categoria.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    onSearchResults(results, searchQuery)
    setIsOpen(false)
    inputRef.current?.blur()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleClear = () => {
    setQuery("")
    setSuggestions([])
    setIsOpen(false)
    onClearSearch()
    inputRef.current?.focus()
  }

  const handleSuggestionClick = (producto: Producto) => {
    setQuery(producto.nombre)
    handleSearch(producto.nombre)
  }

  return (
    <div className="relative flex-1 max-w-lg mx-4" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          placeholder="Buscar productos..."
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Sugerencias de búsqueda */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((producto) => (
            <button
              key={producto.id}
              onClick={() => handleSuggestionClick(producto)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden flex-shrink-0">
                <img
                  src={producto.imagen || "/placeholder.svg"}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{producto.nombre}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{producto.categoria}</p>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">${producto.precio.toFixed(2)}</p>
            </button>
          ))}
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={() => handleSearch()}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              Ver todos los resultados para "{query}"
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
