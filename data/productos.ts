export interface Talla {
  nombre: string
  precio: number
  disponible: boolean
}

export interface Producto {
  id: string
  nombre: string
  precio: number
  tallas: Talla[]
  descripcion: string
  imagen: string
  categoria: "Hombre" | "Mujer" | "Accesorios"
}

export const productos: Producto[] = [
  {
    id: "1",
    nombre: "Camiseta Básica",
    precio: 19.99,
    tallas: [
      { nombre: "XS", precio: 19.99, disponible: true },
      { nombre: "S", precio: 19.99, disponible: true },
      { nombre: "M", precio: 19.99, disponible: true },
      { nombre: "L", precio: 21.99, disponible: true },
      { nombre: "XL", precio: 21.99, disponible: true },
    ],
    descripcion:
      "Camiseta básica de algodón de alta calidad. Perfecta para el uso diario, esta prenda versátil combina comodidad y estilo. Su tejido suave y transpirable te mantendrá fresco durante todo el día. Disponible en varios colores para combinar con cualquier outfit.",
    imagen: "/img/descarga.jpeg",
    categoria: "Hombre",
  },
  {
    id: "2",
    nombre: "Jeans Slim Fit",
    precio: 49.99,
    tallas: [
      { nombre: "S", precio: 49.99, disponible: true },
      { nombre: "M", precio: 49.99, disponible: true },
      { nombre: "L", precio: 54.99, disponible: true },
      { nombre: "XL", precio: 54.99, disponible: true },
    ],
    descripcion:
      "Jeans slim fit con un diseño moderno y elegante. Fabricados con denim de alta calidad que proporciona durabilidad y comodidad. El corte slim ofrece un aspecto estilizado sin comprometer la movilidad. Perfectos para ocasiones casuales o para salir por la noche.",
    imagen: "/img/descarga-(1).jpeg",
    categoria: "Hombre",
  },
  {
    id: "3",
    nombre: "Vestido Floral",
    precio: 59.99,
    tallas: [
      { nombre: "XS", precio: 59.99, disponible: true },
      { nombre: "S", precio: 59.99, disponible: true },
      { nombre: "M", precio: 59.99, disponible: true },
      { nombre: "L", precio: 64.99, disponible: true },
    ],
    descripcion:
      "Hermoso vestido con estampado floral, ideal para la temporada de primavera y verano. Su diseño femenino y elegante realza tu figura con un corte favorecedor. La tela ligera y fluida proporciona comodidad durante todo el día. Perfecto para eventos al aire libre o reuniones casuales.",
    imagen: "/img/descarga-(2).jpeg",
    categoria: "Mujer",
  },
  {
    id: "4",
    nombre: "Chaqueta de Cuero",
    precio: 129.99,
    tallas: [
      { nombre: "S", precio: 129.99, disponible: true },
      { nombre: "M", precio: 129.99, disponible: true },
      { nombre: "L", precio: 139.99, disponible: true },
      { nombre: "XL", precio: 149.99, disponible: true },
    ],
    descripcion:
      "Chaqueta de cuero sintético de alta calidad con un diseño clásico y atemporal. Proporciona calidez y estilo en los días más frescos. Los detalles metálicos y los bolsillos funcionales añaden un toque de sofisticación. Una pieza esencial para cualquier guardarropa que perdurará temporada tras temporada.",
    imagen: "/img/descarga-(3).jpeg",
    categoria: "Hombre",
  },
  {
    id: "5",
    nombre: "Sudadera con Capucha",
    precio: 39.99,
    tallas: [
      { nombre: "XS", precio: 39.99, disponible: false },
      { nombre: "S", precio: 39.99, disponible: true },
      { nombre: "M", precio: 39.99, disponible: true },
      { nombre: "L", precio: 42.99, disponible: true },
      { nombre: "XL", precio: 42.99, disponible: true },
    ],
    descripcion:
      "Sudadera con capucha confeccionada en una mezcla de algodón suave y cálido. Perfecta para los días frescos o para hacer deporte. Su diseño versátil incluye bolsillos frontales y cordones ajustables en la capucha. Una prenda esencial para un look casual y cómodo.",
    imagen: "/img/descarga-(4).jpeg",
    categoria: "Mujer",
  },
  {
    id: "6",
    nombre: "Falda Plisada",
    precio: 34.99,
    tallas: [
      { nombre: "XS", precio: 34.99, disponible: true },
      { nombre: "S", precio: 34.99, disponible: true },
      { nombre: "M", precio: 34.99, disponible: true },
      { nombre: "L", precio: 37.99, disponible: true },
    ],
    descripcion:
      "Elegante falda plisada de longitud midi que aporta feminidad y movimiento a cualquier conjunto. Su cintura elástica proporciona comodidad durante todo el día. Fácil de combinar con blusas o camisetas para crear diferentes looks, desde casual hasta más formal.",
    imagen: "/img/descarga-(5).jpeg",
    categoria: "Mujer",
  },
  {
    id: "7",
    nombre: "Camisa Oxford",
    precio: 45.99,
    tallas: [
      { nombre: "S", precio: 45.99, disponible: true },
      { nombre: "M", precio: 45.99, disponible: true },
      { nombre: "L", precio: 48.99, disponible: true },
      { nombre: "XL", precio: 48.99, disponible: true },
    ],
    descripcion:
      "Camisa Oxford clásica confeccionada en algodón de alta calidad. Su corte regular ofrece comodidad sin sacrificar el estilo. Perfecta para ocasiones formales o para un look casual elegante cuando se combina con jeans. Un básico imprescindible en el armario de cualquier persona.",
    imagen: "/img/descarga-(6).jpeg",
    categoria: "Hombre",
  },
  {
    id: "8",
    nombre: "Zapatillas Deportivas",
    precio: 79.99,
    tallas: [
      { nombre: "38", precio: 79.99, disponible: true },
      { nombre: "39", precio: 79.99, disponible: true },
      { nombre: "40", precio: 79.99, disponible: true },
      { nombre: "41", precio: 84.99, disponible: true },
      { nombre: "42", precio: 84.99, disponible: true },
      { nombre: "43", precio: 89.99, disponible: true },
    ],
    descripcion:
      "Zapatillas deportivas con un diseño moderno y funcional. La suela acolchada proporciona amortiguación y soporte para el pie durante todo el día. Ideales tanto para hacer deporte como para el uso diario. Su estilo versátil combina fácilmente con cualquier outfit casual.",
    imagen: "/img/descarga-(7).jpeg",
    categoria: "Hombre",
  },
  {
    id: "9",
    nombre: "Bolso de Cuero",
    precio: 89.99,
    tallas: [{ nombre: "Único", precio: 89.99, disponible: true }],
    descripcion:
      "Elegante bolso de cuero sintético con acabados de alta calidad. Espacioso y funcional, cuenta con múltiples compartimentos para organizar tus pertenencias. Su correa ajustable permite llevarlo al hombro o cruzado. Un accesorio versátil que complementa cualquier outfit, desde casual hasta formal.",
    imagen: "/img/descarga-(8).jpeg",
    categoria: "Accesorios",
  },
  {
    id: "10",
    nombre: "Gafas de Sol",
    precio: 29.99,
    tallas: [{ nombre: "Único", precio: 29.99, disponible: true }],
    descripcion:
      "Gafas de sol con diseño atemporal y protección UV400. El marco ligero y resistente proporciona comodidad durante todo el día. Las lentes polarizadas reducen el deslumbramiento y mejoran la claridad visual. Un accesorio indispensable para proteger tus ojos con estilo en los días soleados.",
    imagen: "/img/descarga-(9).jpeg",
    categoria: "Accesorios",
  },
  {
    id: "11",
    nombre: "Reloj Minimalista",
    precio: 69.99,
    tallas: [{ nombre: "Único", precio: 69.99, disponible: true }],
    descripcion:
      "Reloj con diseño minimalista y elegante, perfecto para cualquier ocasión. Su mecanismo de cuarzo japonés garantiza precisión y durabilidad. La correa ajustable se adapta cómodamente a diferentes tamaños de muñeca. Un accesorio sofisticado que añade un toque de distinción a tu estilo personal.",
    imagen: "/img/descarga-(10).jpeg",
    categoria: "Accesorios",
  },
  {
    id: "12",
    nombre: "Blusa de Seda",
    precio: 54.99,
    tallas: [
      { nombre: "XS", precio: 54.99, disponible: true },
      { nombre: "S", precio: 54.99, disponible: true },
      { nombre: "M", precio: 54.99, disponible: true },
      { nombre: "L", precio: 59.99, disponible: true },
      { nombre: "XL", precio: 59.99, disponible: false },
    ],
    descripcion:
      "Elegante blusa de seda con un acabado suave y brillante. Su diseño versátil permite lucirla tanto en entornos formales como casuales. El corte favorecedor realza la silueta femenina con un toque de sofisticación. Una pieza atemporal que eleva cualquier conjunto con su textura lujosa y caída fluida.",
    imagen: "/img/GzccbQOW8AAJjPe.jpeg",
    categoria: "Mujer",
  },
]
