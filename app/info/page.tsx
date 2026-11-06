import type { Metadata } from 'next'
import { FaqSection } from '@/components/faq-section'

export const metadata: Metadata = {
  title: 'Info',
  description: 'Preguntas frecuentes sobre pedidos, pagos, envíos y conservación de los productos de Kairos Trigo.',
}

export default function InfoPage() {
  return (
    <main className="pt-16 md:pt-18">
      <FaqSection />
    </main>
  )
}
