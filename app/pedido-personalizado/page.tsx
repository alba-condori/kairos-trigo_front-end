import type { Metadata } from 'next'
import { CustomOrdersSection } from '@/components/custom-orders-section'

export const metadata: Metadata = {
  title: 'Pedido personalizado',
  description: 'Encargá tu torta o mesa dulce personalizada en Kairos Trigo, con un mínimo de 72 hs de anticipación.',
}

export default function CustomOrderPage() {
  return (
    <main className="pt-16 md:pt-18">
      <CustomOrdersSection />
    </main>
  )
}
