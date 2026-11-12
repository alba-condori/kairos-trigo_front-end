'use client'

import { useState } from 'react'
import { useCart, type NewCustomLine } from '@/components/cart/cart-provider'
import { QuantityStepper } from '@/components/quantity-stepper'
import { choiceClass, fieldClass, labelClass, primaryButtonClass } from '@/lib/form-styles'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'

type CustomType = 'Torta' | 'Otro'

export function CustomOrderForm({ className }: { className?: string }) {
  const { addCustom, setCartOpen } = useCart()
  const [type, setType] = useState<CustomType>('Torta')
  const [quantity, setQuantity] = useState(1)
  const [servings, setServings] = useState('')
  const [flavor, setFlavor] = useState('')
  const [what, setWhat] = useState('')
  const [details, setDetails] = useState('')
  const [referenceImage, setReferenceImage] = useState(false)
  const [referenceLink, setReferenceLink] = useState('')

  const isCake = type === 'Torta'

  const reset = () => {
    setType('Torta')
    setQuantity(1)
    setServings('')
    setFlavor('')
    setWhat('')
    setDetails('')
    setReferenceImage(false)
    setReferenceLink('')
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const base = {
      quantity,
      details: details.trim(),
      leadTimeHours: siteConfig.customOrderLeadTimeHours,
    }
    const line: NewCustomLine = isCake
      ? {
          ...base,
          type: 'Torta',
          servings: Number.parseInt(servings, 10),
          flavor,
          referenceImage,
          referenceLink: referenceLink.trim() || undefined,
        }
      : { ...base, type: 'Otro', what: what.trim() }

    addCustom(line)
    reset()
    setCartOpen(true)
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-5', className)}>
      <fieldset className="flex flex-col gap-2">
        <legend className={`${labelClass} mb-2`}>Tipo</legend>
        <div className="grid grid-cols-2 gap-2">
          {(['Torta', 'Otro'] as const).map((option) => (
            <label key={option} className={cn(choiceClass, 'bg-background')}>
              <input
                type="radio"
                name="custom-type"
                value={option}
                checked={type === option}
                onChange={() => setType(option)}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      {!isCake && (
        <div className="flex flex-col gap-2">
          <label htmlFor="custom-what" className={labelClass}>
            ¿Qué querés pedir?
          </label>
          <input
            id="custom-what"
            type="text"
            required
            maxLength={120}
            value={what}
            onChange={(e) => setWhat(e.target.value)}
            aria-describedby="custom-what-help"
            className={fieldClass}
          />
          <p id="custom-what-help" className="text-sm text-muted-foreground">
            Ej: mesa dulce para 20 personas, cupcakes…
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-end gap-5">
        <div className="flex flex-col gap-2">
          <span className={labelClass}>Cantidad</span>
          <QuantityStepper value={quantity} onChange={setQuantity} label="Cantidad del pedido personalizado" />
        </div>
        {isCake && (
          <div className="flex min-w-36 flex-1 flex-col gap-2">
            <label htmlFor="custom-servings" className={labelClass}>
              Cantidad de porciones
            </label>
            <input
              id="custom-servings"
              type="number"
              inputMode="numeric"
              min={1}
              max={500}
              required
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              placeholder="Ej. 20"
              className={fieldClass}
            />
          </div>
        )}
      </div>

      {isCake && (
        <div className="flex flex-col gap-2">
          <label htmlFor="custom-flavor" className={labelClass}>
            Sabor del bizcochuelo
          </label>
          <select
            id="custom-flavor"
            required
            value={flavor}
            onChange={(e) => setFlavor(e.target.value)}
            className={fieldClass}
          >
            <option value="" disabled>
              Elegí un sabor
            </option>
            {siteConfig.cakeFlavors.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="custom-details" className={labelClass}>
          Detalles
        </label>
        <textarea
          id="custom-details"
          required
          rows={4}
          maxLength={800}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder={
            isCake
              ? 'Contanos la temática, el nombre que va en la torta, los colores, el relleno…'
              : 'Contanos sabores, colores, temática o lo que tengas en mente…'
          }
          className={`${fieldClass} resize-y`}
        />
      </div>

      
      <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={referenceImage}
              onChange={(e) => setReferenceImage(e.target.checked)}
              className="mt-0.5 size-5 shrink-0 accent-primary"
            />
            <span className="text-sm font-medium">Voy a enviar una imagen de referencia por WhatsApp</span>
          </label>

          <div className="flex flex-col gap-2">
            <label htmlFor="custom-link" className={labelClass}>
              Link de referencia (Pinterest, Instagram, etc.){' '}
              <span className="font-normal text-muted-foreground">(opcional)</span>
            </label>
            <input
              id="custom-link"
              type="text"
              inputMode="url"
              autoComplete="off"
              maxLength={300}
              value={referenceLink}
              onChange={(e) => setReferenceLink(e.target.value)}
              placeholder="https://"
              className={fieldClass}
            />
          </div>
      
          

      <p className="text-sm text-muted-foreground">
        {`Precio: a cotizar. Recordá encargarlo con un mínimo de ${siteConfig.customOrderLeadTimeHours} hs de anticipación.`}
      </p>

      <button type="submit" className={primaryButtonClass}>
        Agregar al carrito
      </button>
    </form>
  )
}
