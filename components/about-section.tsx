import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'

export function AboutSection() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
          <Image
            src="/images/nosotros.png"
            alt="Manos amasando pan sobre una mesa de madera enharinada"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeading id="nosotros-title" eyebrow="hecho en casa" title="Sobre nosotros" />
          <p className="mt-6 text-xl leading-relaxed text-pretty">
            Kairos Trigo es panadería y pastelería artesanal hecha en casa y a pedido. Horneamos
            productos frescos para tus desayunos, meriendas y eventos especiales, con opción de
            retiro o envío a domicilio.
          </p>
        </div>
      </div>
    </section>
  )
}
