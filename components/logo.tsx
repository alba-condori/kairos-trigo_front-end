import { cn } from '@/lib/utils'

// Reemplazá este texto por la imagen del logo cuando la tengas (por ej. <Image src="/images/logo.png" ... />).
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('font-logo leading-none tracking-wide whitespace-nowrap', className)}>
      kairos trigo
    </span>
  )
}
