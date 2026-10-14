'use client'

import { useState } from 'react'
import { useCart } from '@/components/cart/cart-provider'
import { QuantityStepper } from '@/components/quantity-stepper'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { choiceClass, fieldClass, labelClass, primaryButtonClass } from '@/lib/form-styles'
import { siteConfig } from '@/lib/site-config'

type CustomType = 'Torta' | 'Otro'

export function CustomOrderDialog() {
  const { isCustomOpen, setCustomOpen, addCustom, setCartOpen } = useCart()
  const [type, setType] = useState<CustomType>('Torta')
  const [quantity, setQuantity] = useState(1)
  const [servings, setServings] = useState('')
  const [flavor, setFlavor] = useState('')
  const [details, setDetails] = useState('')

  const reset = () => {
    setType('Torta')
    setQuantity(1)
    setServings('')
    setFlavor('')
    setDetails('')
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addCustom({
      type,
      quantity,
      servings: type === 'Torta' ? Number.parseInt(servings, 10) : undefined,
      flavor,
      details: details.trim(),
      leadTimeHours: siteConfig.customOrderLeadTimeHours,
    })
    reset()
    setCustomOpen(false)
    setCartOpen(true)
  }

  return (
    <Dialog open={isCustomOpen} onOpenChange={setCustomOpen}>
      <DialogContent className="max-h-[90svh] gap-6 overflow-y-auto border border-border p-6 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold">Pedido personalizado</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Lo sumamos a tu carrito y te pasamos la cotización por WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <fieldset className="flex flex-col gap-2">
            <legend className={`${labelClass} mb-2`}>Tipo</legend>
            <div className="grid grid-cols-2 gap-2">
              {(['Torta', 'Otro'] as const).map((option) => (
                <label key={option} className={choiceClass}>
                  <input
                    type="radio"
                    name="custom-type"
                    value={option}
                    checked={type === option}
                    onChange={() => setType(option)}
                    className="sr-only"
                  />
                  {option === 'Torta' ? 'Torta' : 'Otro (mesa dulce…)'}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-wrap items-end gap-5">
            <div className="flex flex-col gap-2">
              <span className={labelClass}>Cantidad</span>
              <QuantityStepper value={quantity} onChange={setQuantity} label="Cantidad del pedido personalizado" />
            </div>
            {type === 'Torta' && (
              <div className="flex min-w-36 flex-1 flex-col gap-2">
                <label htmlFor="custom-servings" className={labelClass}>
                  Porciones
                </label>
                <input
                  id="custom-servings"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  required
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  placeholder="Ej. 20"
                  className={fieldClass}
                />
              </div>
            )}
          </div>

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
              placeholder="Contanos la temática, el nombre que va en la torta, los colores, el relleno…"
              className={`${fieldClass} resize-y`}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            {`Precio: a cotizar. Recordá encargarlo con un mínimo de ${siteConfig.customOrderLeadTimeHours} hs de anticipación.`}
          </p>

          <button type="submit" className={primaryButtonClass}>
            Agregar al carrito
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
