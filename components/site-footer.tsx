import { MapPin, MessageCircle } from 'lucide-react'
import { Logo } from '@/components/logo'
import { siteConfig } from '@/lib/site-config'

export function SiteFooter() {
  return (
    <footer
      id="contacto"
      aria-labelledby="contacto-title"
      className="bg-primary px-4 pt-16 pb-8 text-primary-foreground md:px-6 md:pt-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <Logo className="text-7xl md:text-8xl" />
            <p className="mt-3 max-w-sm text-lg leading-relaxed text-primary-foreground/85">
              Panadería y pastelería artesanal, hecha en casa y a pedido.
            </p>
          </div>

          <div>
            <h2 id="contacto-title" className="text-2xl font-extrabold">
              Contacto y entregas
            </h2>
            <ul className="mt-6 flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/75">
                    Zona de entrega
                  </p>
                  <p className="text-lg">{siteConfig.deliveryZone}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/75">
                    WhatsApp
                  </p>
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg underline-offset-4 hover:underline"
                  >
                    {siteConfig.whatsappDisplay}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-16 border-t border-primary-foreground/20 pt-6 text-sm text-primary-foreground/75">
          © 2026 Kairos Trigo – Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
