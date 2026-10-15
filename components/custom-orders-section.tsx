import { CustomOrderForm } from '@/components/custom-order-form'
import { SectionHeading } from '@/components/section-heading'

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
  return (
    <section
      id="personalizados"
      aria-labelledby="personalizados-title"
      className="px-4 py-16 md:px-6 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            as="h1"
            id="personalizados-title"
            eyebrow="a tu medida"
            title="Pedidos personalizados"
            description="Hacemos tu torta o mesa dulce a pedido, con el diseño que más te guste para tu evento."
          />

          <ol className="mt-10 flex flex-col gap-6">
            {steps.map((step, index) => (
              <li key={step.title} className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-extrabold text-primary-foreground"
                >
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-xl font-bold">
                    <span className="sr-only">{`Paso ${index + 1}: `}</span>
                    {step.title}
                  </h2>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[2rem] border border-border bg-muted p-6 md:p-10">
          <h2 className="text-2xl font-extrabold">Armá tu pedido</h2>
          <p className="mt-1 text-muted-foreground">
            Lo sumamos a tu carrito y te pasamos la cotización por WhatsApp.
          </p>
          <CustomOrderForm className="mt-8" />
        </div>
      </div>
    </section>
  )
}
