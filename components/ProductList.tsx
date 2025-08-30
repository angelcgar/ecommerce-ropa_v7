import { Producto } from "@/data/productos";
import ProductCard from "./ProductCard";

export default function ProductList({ products }: { products: Producto[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  )
}
