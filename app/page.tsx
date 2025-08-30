
import HomeRender from "@/components/HomePage"
import { getProducts } from "@/data/productos"


export default async function Home() {
  const productos = await getProducts()

  return <HomeRender productos={productos} />
}
