"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Definición de tipos
export interface User {
  id: string
  nombre: string
  email: string
  rol: "user" | "admin"
  direccion?: {
    calle: string
    ciudad: string
    estado: string
    codigoPostal: string
    pais: string
  }
  telefono?: string
  metodoPago?: {
    tipo: string
    ultimosDigitos: string
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (nombre: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

// Usuarios ficticios
const USERS = [
  {
    id: "1",
    nombre: "Carlos",
    email: "carlos@gmail.com",
    password: "password123",
    rol: "user" as const,
    direccion: {
      calle: "Calle Principal 123",
      ciudad: "Madrid",
      estado: "Madrid",
      codigoPostal: "28001",
      pais: "España",
    },
    telefono: "+34 612 345 678",
    metodoPago: {
      tipo: "Tarjeta de crédito",
      ultimosDigitos: "4321",
    },
  },
  {
    id: "2",
    nombre: "Aurelio",
    email: "aurelio@gmail.com",
    password: "contraseña123",
    rol: "admin" as const,
    direccion: {
      calle: "Avenida Central 456",
      ciudad: "Barcelona",
      estado: "Cataluña",
      codigoPostal: "08001",
      pais: "España",
    },
    telefono: "+34 698 765 432",
    metodoPago: {
      tipo: "PayPal",
      ultimosDigitos: "N/A",
    },
  },
]

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Proveedor del contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Comprobar si hay un usuario en localStorage al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  // Función de inicio de sesión
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular una petición a la API
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

        if (foundUser) {
          // Crear una versión del usuario sin la contraseña
          const { password: _, ...userWithoutPassword } = foundUser
          setUser(userWithoutPassword)
          localStorage.setItem("user", JSON.stringify(userWithoutPassword))
          resolve(true)
        } else {
          resolve(false)
        }
      }, 800) // Simular delay de red
    })
  }

  // Función de registro
  const register = async (nombre: string, email: string, password: string): Promise<boolean> => {
    // Simular una petición a la API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Comprobar si el email ya existe
        const existingUser = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase())

        if (existingUser) {
          resolve(false)
          return
        }

        // En una aplicación real, aquí se guardaría el usuario en la base de datos
        const newUser = {
          id: `${USERS.length + 1}`,
          nombre,
          email,
          rol: "user" as const,
        }

        // Guardar usuario en localStorage (sin contraseña)
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
        resolve(true)
      }, 800) // Simular delay de red
    })
  }

  // Función de cierre de sesión
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.rol === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}
