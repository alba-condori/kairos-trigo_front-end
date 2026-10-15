import type { Metadata } from 'next'
import { ProductSection } from '@/components/product-section'
import { getProductsByCategory } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Menú',
  description: 'Panadería y pastelería artesanal de Kairos Trigo: panes, salados, tortas y postres a pedido.',
}

export default function MenuPage() {
  return (
    <main className="pt-16 md:pt-18">
      <h1 className="sr-only">Menú</h1>
      <ProductSection
        id="panaderia"
        eyebrow="recién horneado"
        title="Panadería"
        description="Panes y salados caseros para tus desayunos, meriendas y comidas de todos los días."
        products={getProductsByCategory('panaderia')}
      />
      <ProductSection
        id="pasteleria"
        eyebrow="para compartir"
        title="Pastelería"
        description="Tortas y postres para tus mesas cotidianas y tus eventos especiales."
        products={getProductsByCategory('pasteleria')}
      />
    </main>
  )
}
