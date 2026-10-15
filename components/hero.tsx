import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Logo } from '@/components/logo'

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden px-4 pt-16"
    >
      <Image
        src="/images/portada.png"
        alt="Rollos de canela caseros con glaseado"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary/55" />

      <div className="flex flex-col items-center text-center text-primary-foreground">
        <h1 id="hero-title">
          <Logo className="block text-[5.5rem] sm:text-[8rem] md:text-[10rem]" />
        </h1>
        <p className="mt-2 text-lg font-medium tracking-wide text-balance sm:text-2xl">
          Panadería y pastelería artesanal
        </p>
        <div className="mt-10 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center rounded-full bg-primary-foreground px-8 py-3.5 text-base font-bold text-primary shadow-lg transition hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-foreground/60"
          >
            Ver el menú
          </Link>
          <Link
            href="/pedido-personalizado"
            className="inline-flex items-center justify-center rounded-full border-2 border-primary-foreground px-8 py-3 text-base font-bold text-primary-foreground transition hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-foreground/60"
          >
            Pedido personalizado
          </Link>
        </div>
      </div>

      <a
        href="#nosotros"
        aria-label="Bajar a Sobre nosotros"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-primary-foreground"
      >
        <ChevronDown className="size-8" aria-hidden="true" />
      </a>
    </section>
  )
}
