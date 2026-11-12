'use client'

import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/components/cart/cart-provider'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { choiceClass, fieldClass, labelClass, primaryButtonClass } from '@/lib/form-styles'
import { formatPrice, minDateFromNow } from '@/lib/format'
import { buildOrderMessage, whatsappUrl, type CustomerDetails } from '@/lib/order-message'
import { siteConfig } from '@/lib/site-config'
import { useEnviarPedido } from '@/hooks/useEnviarPedido'

type Mode = CustomerDetails['mode']

export function CheckoutDialog() {
  const { lines, total, hasCustom, leadTimeHours, isCheckoutOpen, setCheckoutOpen, setCartOpen, clearCart } = useCart()
  const { enviar, enviando, error } = useEnviarPedido()
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [mode, setMode] = useState<Mode>('Retiro')
  const [address, setAddress] = useState('')
  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [dateError, setDateError] = useState('')
  
  const minDate = isCheckoutOpen ? minDateFromNow(leadTimeHours) : ''

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  if (date < minDateFromNow(leadTimeHours)) {
    setDateError(`Elegí una fecha con al menos ${leadTimeHours} hs de anticipación.`)
    return
  }

  const cliente = {
    name: name.trim(),
    lastName: lastName.trim(),
    phone: phone.trim(),
    mode,
    address: mode === 'Envío a domicilio' ? address.trim() : undefined,
    date,
    timeSlot,
  }

  // Abrimos la pestaña ahora (con el click) porque si se abre después de esperar, el navegador la bloquea
  const ventana = window.open('', '_blank')

  const guardado = await enviar(cliente, lines, total)
  if (!guardado) {
    ventana?.close()
    return
  }

  const url = whatsappUrl(buildOrderMessage(cliente, lines, total))
  if (ventana) {
    ventana.opener = null
    ventana.location.href = url
  } else {
    window.location.href = url
  }

  // Ya quedó guardado: vaciamos el carrito para que no se pueda mandar dos veces el mismo pedido
  clearCart()
  setCheckoutOpen(false)
}

  const backToCart = () => {
    setCheckoutOpen(false)
    setCartOpen(true)
  }

  return (
    <Dialog open={isCheckoutOpen} onOpenChange={setCheckoutOpen}>
      <DialogContent className="max-h-[90svh] gap-6 overflow-y-auto border border-border p-6 sm:max-w-lg">
        <DialogHeader>
          <button
            type="button"
            onClick={backToCart}
            className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Volver al carrito
          </button>
          <DialogTitle className="text-2xl font-extrabold">Datos del pedido</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Completá tus datos y te llevamos a WhatsApp con el pedido listo.
          </DialogDescription>
        </DialogHeader>

        {lines.length === 0 ? (
          <p className="text-muted-foreground">Tu carrito está vacío. Agregá productos para continuar.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="checkout-name" className={labelClass}>
                  Nombre
                </label>
                <input
                  id="checkout-name"
                  required
                  autoComplete="name"
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="checkout-lastname" className={labelClass}>
                  Apellido
                </label>
                <input
                  id="checkout-lastname"
                  required
                  autoComplete="family-name"
                  maxLength={80}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="checkout-phone" className={labelClass}>
                  Teléfono
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  pattern="[0-9+\-\s()]{8,20}"
                  title="Ingresá un teléfono válido"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="11 1234-5678"
                  className={fieldClass}
                />
              </div>
            </div>

            <fieldset className="flex flex-col gap-2">
              <legend className={`${labelClass} mb-2`}>Modalidad</legend>
              <div className="grid grid-cols-2 gap-2">
                {(['Retiro', 'Envío a domicilio'] as const).map((option) => (
                  <label key={option} className={choiceClass}>
                    <input
                      type="radio"
                      name="checkout-mode"
                      value={option}
                      checked={mode === option}
                      onChange={() => setMode(option)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            {mode === 'Envío a domicilio' && (
              <div className="flex flex-col gap-2">
                <label htmlFor="checkout-address" className={labelClass}>
                  Dirección
                </label>
                <input
                  id="checkout-address"
                  required
                  autoComplete="street-address"
                  maxLength={160}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Calle, número, piso, barrio"
                  className={fieldClass}
                />
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="checkout-date" className={labelClass}>
                  Fecha
                </label>
                <input
                  id="checkout-date"
                  type="date"
                  required
                  min={minDate}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value)
                    setDateError('')
                  }}
                  aria-describedby="checkout-date-hint"
                  aria-invalid={dateError ? true : undefined}
                  className={fieldClass}
                />
                <p id="checkout-date-hint" className="text-sm text-muted-foreground">
                  {dateError || `Mínimo ${leadTimeHours} hs de anticipación.`}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="checkout-time" className={labelClass}>
                  Horario preferido
                </label>
                <select
                  id="checkout-time"
                  required
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className={fieldClass}
                >
                  <option value="" disabled>
                    Elegí un horario
                  </option>
                  {siteConfig.timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-2xl bg-muted p-4">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold">Total estimado</p>
                <p className="text-2xl font-extrabold tabular-nums">{formatPrice(total)}</p>
              </div>
              {hasCustom && (
                <p className="text-sm text-muted-foreground">Los pedidos personalizados se cotizan aparte.</p>
              )}
              <p className="text-sm leading-relaxed">
                {`Para confirmar tu pedido se solicita una seña del ${siteConfig.depositPercent}% del total. Te confirmamos disponibilidad de fecha por WhatsApp.`}
              </p>
            </div>

            {error && (
              <p role="alert" className="text-sm font-semibold">
                No pudimos guardar tu pedido: {error}
              </p>
            )}
            <button type="submit" disabled={enviando} className={primaryButtonClass}>
              {enviando ? 'Enviando...' : 'Enviar pedido'}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
