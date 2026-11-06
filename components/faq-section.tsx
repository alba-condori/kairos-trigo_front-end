import { MessageCircle } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { primaryButtonClass } from '@/lib/form-styles'
import { siteConfig } from '@/lib/site-config'

const faqs = [
  {
    question: '¿Con cuánta anticipación debo hacer mi pedido?',
    answer:
      'Para productos del catálogo, al menos 48 hs. Para tortas y pedidos personalizados, un mínimo de 72 hs. Siempre consultar disponibilidad.',
  },
  {
    question: '¿Cuáles son los medios de pago?',
    answer: 'Mercado Pago y efectivo al momento del retiro o la entrega.',
  },
  {
    question: '¿Hacen envíos a domicilio o puedo retirar?',
    answer:
      'Retiro sin cargo, coordinado por WhatsApp, o envío a domicilio con costo adicional según la zona.',
  },
  {
    question: '¿Cómo conservo los productos?',
    answer:
      'Son artesanales, frescos y sin conservantes. Las tortas con cremas o rellenos perecederos deben mantenerse refrigeradas hasta consumirlas.',
  },
]

export function FaqSection() {
  return (
    <section id="preguntas" aria-labelledby="preguntas-title" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading as="h1" id="preguntas-title" eyebrow="dudas" title="Preguntas frecuentes" />
        <Accordion className="mt-10 border-t border-border">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question} className="border-b border-border">
              <AccordionTrigger className="py-5 text-lg font-bold hover:no-underline **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-3xl bg-muted p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <p className="text-lg font-semibold text-pretty">¿Tenés otra consulta?</p>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className={primaryButtonClass}
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Hablá con nosotros por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
