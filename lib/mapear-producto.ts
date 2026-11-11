import { products as productosV0, type Product } from '@/lib/products'
import type { Producto } from '@/types/api'

const limpiar = (texto: string) =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

export function mapearProducto(p: Producto): Product {
  const categoria = limpiar(p.categoria ?? '').startsWith('pasteler') ? 'pasteleria' : 'panaderia'
  const nombre = p.nombre ?? 'Sin nombre'

  // Lo que la base no tiene (foto, variedades, porciones) se busca en la lista de v0 con el mismo nombre
  const v0 = productosV0.find((x) => limpiar(x.name) === limpiar(nombre))

  return {
    id: String(p.id),
    name: nombre,
    description: p.descripcion ?? undefined,
    price: p.precio ?? 0,
    unit: p.unidad ?? undefined,
    category: categoria,
    image: v0?.image ?? '/placeholder.svg',
    servings: v0?.servings,
    options: v0?.options,
    leadTimeHours: v0?.leadTimeHours ?? (categoria === 'pasteleria' ? 72 : 48),
  }
}