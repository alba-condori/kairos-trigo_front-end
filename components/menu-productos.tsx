'use client'

import { ProductSection } from '@/components/product-section'
import { useProducto } from '@/hooks/useProducto'
import { mapearProducto } from '@/lib/mapear-producto'

export function MenuProductos() {
  const { prods, loading, error } = useProducto()

  if (loading) return <p className="px-4 py-20 text-center">Cargando menú...</p>
  if (error) return <p className="px-4 py-20 text-center">No pudimos cargar el menú: {error}</p>

  const productos = prods.map(mapearProducto)

  return (
    <>
      <ProductSection
        id="panaderia"
        eyebrow="recién horneado"
        title="Panadería"
        description="Panes y salados caseros para tus desayunos, meriendas y comidas de todos los días."
        products={productos.filter((p) => p.category === 'panaderia')}
      />
      <ProductSection
        id="pasteleria"
        eyebrow="para compartir"
        title="Pastelería"
        description="Tortas y postres para tus mesas cotidianas y tus eventos especiales."
        products={productos.filter((p) => p.category === 'pasteleria')}
      />
    </>
  )
}