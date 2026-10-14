import type { CartLine } from '@/components/cart/cart-provider'
import { formatDateInput, formatPrice } from '@/lib/format'
import { siteConfig } from '@/lib/site-config'

export type CustomerDetails = {
  name: string
  phone: string
  mode: 'Retiro' | 'Envío a domicilio'
  address?: string
  date: string
  timeSlot: string
}

export function buildOrderMessage(customer: CustomerDetails, lines: CartLine[], total: number) {
  const products = lines.filter((l) => l.kind === 'product')
  const customs = lines.filter((l) => l.kind === 'custom')

  const parts: string[] = [
    `¡Hola ${siteConfig.name}! Quiero hacer un pedido:`,
    '',
    '*Datos del cliente*',
    `Nombre: ${customer.name}`,
    `Teléfono: ${customer.phone}`,
    '',
    '*Entrega*',
    `Modalidad: ${customer.mode}`,
  ]

  if (customer.mode === 'Envío a domicilio' && customer.address) {
    parts.push(`Dirección: ${customer.address}`)
  }
  parts.push(`Fecha: ${formatDateInput(customer.date)}`, `Horario: ${customer.timeSlot}`)

  if (products.length > 0) {
    parts.push('', '*Productos*')
    for (const line of products) {
      const options = line.options.map((o) => `${o.label}: ${o.value}`).join(', ')
      parts.push(
        `- ${line.quantity} x ${line.name}${options ? ` (${options})` : ''} – ${formatPrice(line.unitPrice * line.quantity)}`,
      )
    }
  }

  if (customs.length > 0) {
    parts.push('', '*Pedidos personalizados*')
    customs.forEach((line, index) => {
      parts.push(`${index + 1}. ${line.type === 'Torta' ? 'Torta' : 'Otro (mesa dulce u otro)'}`)
      parts.push(`   Cantidad: ${line.quantity}`)
      if (line.type === 'Torta' && line.servings) parts.push(`   Porciones: ${line.servings}`)
      parts.push(`   Bizcochuelo: ${line.flavor}`)
      parts.push(`   Detalles: ${line.details}`)
      parts.push('   Precio: A cotizar')
    })
  }

  parts.push('', `*Total estimado: ${formatPrice(total)}*`)
  if (customs.length > 0) parts.push('(Los pedidos personalizados se cotizan aparte)')
  parts.push('', 'Pedido pendiente de confirmación')

  return parts.join('\n')
}

export const whatsappUrl = (message: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
