'use client'

import { ShoppingBag, Trash2 } from 'lucide-react'
import { useCart, type CartLine } from '@/components/cart/cart-provider'
import { QuantityStepper } from '@/components/quantity-stepper'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { primaryButtonClass, secondaryButtonClass } from '@/lib/form-styles'
import { formatPrice } from '@/lib/format'

function LineDetails({ line }: { line: CartLine }) {
  if (line.kind === 'product') {
    return (
      <>
        <p className="font-bold">{line.name}</p>
        {line.options.map((o) => (
          <p key={o.label} className="text-sm text-muted-foreground">
            {`${o.label}: ${o.value}`}
          </p>
        ))}
        <p className="text-sm text-muted-foreground">{`${formatPrice(line.unitPrice)} c/u`}</p>
      </>
    )
  }
  return (
    <>
      <p className="font-bold">
        {line.type === 'Torta' ? 'Torta personalizada' : 'Pedido personalizado'}
      </p>
      {line.type === 'Torta' && line.servings && (
        <p className="text-sm text-muted-foreground">{`${line.servings} porciones`}</p>
      )}
      <p className="text-sm text-muted-foreground">{`Bizcochuelo: ${line.flavor}`}</p>
      <p className="line-clamp-2 text-sm text-muted-foreground">{line.details}</p>
    </>
  )
}

export function CartDrawer() {
  const {
    lines,
    total,
    hasCustom,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeLine,
    setCheckoutOpen,
    setCustomOpen,
  } = useCart()

  const goToCheckout = () => {
    setCartOpen(false)
    setCheckoutOpen(true)
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-full gap-0 border-border p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="text-2xl font-extrabold">Tu pedido</SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Revisá los productos antes de continuar.
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="size-12" aria-hidden="true" />
            <p className="text-lg font-semibold">Tu carrito está vacío</p>
            <p className="text-muted-foreground">Elegí tus productos favoritos del catálogo.</p>
            <a href="#panaderia" onClick={() => setCartOpen(false)} className={secondaryButtonClass}>
              Ver productos
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {lines.map((line) => (
                <li key={line.key} className="flex flex-col gap-3 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <LineDetails line={line} />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(line.key)}
                      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full transition hover:bg-primary/10"
                      aria-label="Quitar del carrito"
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <QuantityStepper
                      size="sm"
                      value={line.quantity}
                      onChange={(q) => updateQuantity(line.key, q)}
                      label="Cantidad"
                    />
                    <p className="font-bold tabular-nums">
                      {line.kind === 'product' ? formatPrice(line.unitPrice * line.quantity) : 'A cotizar'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 border-t border-border px-6 py-5">
              <div className="flex items-baseline justify-between">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-2xl font-extrabold tabular-nums">{formatPrice(total)}</p>
              </div>
              {hasCustom && (
                <p className="text-sm text-muted-foreground">Los pedidos personalizados se cotizan aparte.</p>
              )}
              <button type="button" onClick={goToCheckout} className={primaryButtonClass}>
                Continuar
              </button>
              <button
                type="button"
                onClick={() => {
                  setCartOpen(false)
                  setCustomOpen(true)
                }}
                className="text-sm font-semibold underline underline-offset-4"
              >
                Sumar un pedido personalizado
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
