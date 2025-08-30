// export interface Talla {
//   nombre: string
//   precio: number
//   disponible: boolean
// }

const API_URL_STRAPI = process.env.NEXT_PUBLIC_API_URL_STRAPI ?? "http://localhost:1337/api/productos?populate=*"

export interface ResponseStrapi {
  data: ProductResponse[];
  meta: Meta;
}

export interface ProductResponse {
  id:          number;
  documentId:  string;
  nombre:      string;
  createdAt:   Date;
  updatedAt:   Date;
  publishedAt: Date;
  precio:      number;
  descripcion: string;
  categoria:   string;
  imagen:      Imagen[];
  tallas:      Talla[];
}

export interface Imagen {
  id:                number;
  documentId:        string;
  name:              string;
  alternativeText:   null;
  caption:           null;
  width:             number;
  height:            number;
  formats:           Formats;
  hash:              string;
  ext:               string;
  mime:              string;
  size:              number;
  url:               string;
  previewUrl:        null;
  provider:          string;
  provider_metadata: null;
  createdAt:         Date;
  updatedAt:         Date;
  publishedAt:       Date;
}

export interface Formats {
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  ext:         string;
  url:         string;
  hash:        string;
  mime:        string;
  name:        string;
  path:        null;
  size:        number;
  width:       number;
  height:      number;
  sizeInBytes: number;
}

export interface Talla {
  id:         number;
  nombre:     string;
  precio:     number;
  disponible: boolean | null;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page:      number;
  pageSize:  number;
  pageCount: number;
  total:     number;
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


export async function getProducts() {
  const res = await fetch(API_URL_STRAPI)
  const data = await res.json() as ResponseStrapi
  return data.data.map((item) => ({
    id: item.id.toString(),
    nombre: item.nombre,
    precio: item.precio,
    tallas: item.tallas,
    descripcion: item.descripcion,
    imagen: item.imagen[0].formats.thumbnail.url
      ? item.imagen[0].formats.thumbnail.url
      : "/img/descarga.jpeg",
    categoria: item.categoria as "Hombre" | "Mujer" | "Accesorios",
  }))
}
