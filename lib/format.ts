const priceFormatter = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 })

export const formatPrice = (value: number) => `$${priceFormatter.format(value)}`

const pad = (value: number) => String(value).padStart(2, '0')

export const toDateInputValue = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

export const minDateFromNow = (hours: number) =>
  toDateInputValue(new Date(Date.now() + hours * 60 * 60 * 1000))

export const formatDateInput = (value: string) => {
  const [year, month, day] = value.split('-')
  return `${day}/${month}/${year}`
}
