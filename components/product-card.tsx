'use client'

import Image from 'next/image'
import { Check, Users } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { useCart } from '@/components/cart/cart-provider'
import { QuantityStepper } from '@/components/quantity-stepper'
import { fieldClass, labelClass, primaryButtonClass } from '@/lib/form-styles'
import { formatPrice } from '@/lib/format'
import type { Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const { addProduct } = useCart()
  const id = useId()
  const [quantity, setQuantity] = useState(1)
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [justAdded, setJustAdded] = useState(false)

  const options = product.options ?? []
  const missingOption = options.some((option) => !selected[option.id])

  useEffect(() => {
    if (!justAdded) return
    const timeout = setTimeout(() => setJustAdded(false), 1800)
    return () => clearTimeout(timeout)
  }, [justAdded])

  const handleAdd = () => {
    if (missingOption) return
    addProduct({
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity,
      options: options.map((option) => ({ label: option.label, value: selected[option.id] })),
      leadTimeHours: product.leadTimeHours,
    })
    setQuantity(1)
    setJustAdded(true)
  }

  return (
    <article className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-balance">{product.name}</h3>
          <p className="shrink-0 text-lg font-bold tabular-nums">
            {formatPrice(product.price)}
            {product.unit && <span className="ml-1 text-sm font-medium text-muted-foreground">{product.unit}</span>}
          </p>
        </div>

        {product.servings && (
          <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm font-semibold">
            <Users className="size-4" aria-hidden="true" />
            {product.servings}
          </p>
        )}

        {product.description && (
          <p className="text-pretty leading-relaxed text-muted-foreground">{product.description}</p>
        )}

        {options.map((option) => (
          <div key={option.id} className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-${option.id}`} className={labelClass}>
              {option.label}
            </label>
            <select
              id={`${id}-${option.id}`}
              value={selected[option.id] ?? ''}
              onChange={(e) => setSelected((prev) => ({ ...prev, [option.id]: e.target.value }))}
              className={fieldClass}
            >
              <option value="" disabled>
                Elegí una opción
              </option>
              {option.choices.map((choice) => (
                <option key={choice} value={choice}>
                  {choice}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="mt-auto flex items-center gap-3 pt-2">
          <QuantityStepper value={quantity} onChange={setQuantity} label={`Cantidad de ${product.name}`} />
          <button
            type="button"
            onClick={handleAdd}
            disabled={missingOption}
            className={`${primaryButtonClass} flex-1 px-4 text-sm`}
          >
            {justAdded ? (
              <>
                <Check className="size-4" aria-hidden="true" />
                ¡Agregado!
              </>
            ) : missingOption ? (
              'Elegí una opción'
            ) : (
              'Agregar al carrito'
            )}
          </button>
        </div>
        <span className="sr-only" aria-live="polite">
          {justAdded ? `${product.name} agregado al carrito` : ''}
        </span>
      </div>
    </article>
  )
}
