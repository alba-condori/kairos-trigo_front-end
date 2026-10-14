import { SectionHeading } from '@/components/section-heading'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

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
        <SectionHeading id="preguntas-title" eyebrow="dudas" title="Preguntas frecuentes" />
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
      </div>
    </section>
  )
}
