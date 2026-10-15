'use client'

import { Menu, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '@/components/cart/cart-provider'
import { Logo } from '@/components/logo'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { navLinks } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const { itemCount, setCartOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-18 md:px-6">
        <Link href="/" className="rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40">
          <Logo className="text-4xl md:text-[2.75rem]" />
          <span className="sr-only">Kairos Trigo, ir al inicio</span>
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'text-sm font-medium underline-offset-6 transition hover:underline',
                      active && 'font-bold underline decoration-2',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative inline-flex size-11 items-center justify-center rounded-full transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
            aria-label={`Abrir carrito, ${itemCount} ${itemCount === 1 ? 'ítem' : 'ítems'}`}
          >
            <ShoppingBag className="size-6" aria-hidden="true" />
            {itemCount > 0 && (
              <span className="absolute top-0.5 right-0.5 flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground tabular-nums">
                {itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-full transition hover:bg-primary/10 md:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" className="w-4/5 border-border p-6">
          <SheetTitle className="sr-only">Menú</SheetTitle>
          <Logo className="text-4xl" />
          <nav aria-label="Principal (móvil)" className="mt-6">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'block rounded-xl px-3 py-3 text-lg font-medium transition hover:bg-primary/10',
                        active && 'bg-primary/10 font-bold',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
