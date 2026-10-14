'use client'

import { useCart } from '@/components/cart/cart-provider'
import { SectionHeading } from '@/components/section-heading'
import { primaryButtonClass } from '@/lib/form-styles'

const steps = [
  {
    title: 'Elegí tu idea',
    text: 'Contanos temática, colores o diseño de referencia.',
  },
  {
    title: 'Armá tu combinación',
    text: 'Bizcochuelo, rellenos y porciones.',
  },
  {
    title: 'Encargá con tiempo',
    text: 'Mínimo 72 hs de anticipación.',
  },
]

export function CustomOrdersSection() {
  const { setCustomOpen } = useCart()

  return (
    <section
      id="personalizados"
      aria-labelledby="personalizados-title"
      className="px-4 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-border bg-muted px-6 py-14 md:px-14 md:py-20">
        <SectionHeading
          id="personalizados-title"
          eyebrow="a tu medida"
          title="Pedidos personalizados"
          description="Hacemos tu torta o mesa dulce a pedido, con el diseño que más te guste para tu evento."
        />

        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3">
              <span
                aria-hidden="true"
                className="flex size-14 items-center justify-center rounded-full bg-primary text-2xl font-extrabold text-primary-foreground"
              >
                {index + 1}
              </span>
              <h3 className="text-xl font-bold">
                <span className="sr-only">{`Paso ${index + 1}: `}</span>
                {step.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>

        <button type="button" onClick={() => setCustomOpen(true)} className={`${primaryButtonClass} mt-12`}>
          Armá tu pedido personalizado
        </button>
      </div>
    </section>
  )
}
