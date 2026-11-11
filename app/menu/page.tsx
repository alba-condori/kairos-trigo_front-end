import type { Metadata } from 'next'
import { MenuProductos } from '@/components/menu-productos'

export const metadata: Metadata = {
  title: 'Menú',
  description: 'Panadería y pastelería artesanal de Kairos Trigo: panes, salados, tortas y postres a pedido.',
}

export default function MenuPage() {
  return (
    <main className="pt-16 md:pt-18">
      <h1 className="sr-only">Menú</h1>
      <MenuProductos />
    </main>
  )
}