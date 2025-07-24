import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/CartContext"
import { AuthProvider } from "@/context/AuthContext"
import { WishlistProvider } from "@/context/WishlistContext"
import { NotificationProvider } from "@/context/NotificationContext"
import { ThemeProvider } from "@/context/ThemeContext"
import NotificationToast from "@/components/NotificationToast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Moda Style - Tienda de Ropa Online",
  description: "Descubre las últimas tendencias en moda para hombre y mujer",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <WishlistProvider>
              <NotificationProvider>
                <CartProvider>
                  {children}
                  <NotificationToast />
                </CartProvider>
              </NotificationProvider>
            </WishlistProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
