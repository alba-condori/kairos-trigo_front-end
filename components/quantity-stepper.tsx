'use client'

import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

type QuantityStepperProps = {
  value: number
  onChange: (value: number) => void
  label: string
  size?: 'sm' | 'md'
}

export function QuantityStepper({ value, onChange, label, size = 'md' }: QuantityStepperProps) {
  const buttonSize = size === 'sm' ? 'size-8' : 'size-10'
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-full border border-input bg-background"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        className={cn(
          buttonSize,
          'inline-flex items-center justify-center rounded-full transition hover:bg-primary/10 disabled:opacity-40',
        )}
        aria-label="Restar uno"
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        value={value}
        onChange={(e) => onChange(Math.max(1, Number.parseInt(e.target.value, 10) || 1))}
        className="w-10 bg-transparent text-center text-base font-semibold tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        aria-label="Cantidad"
      />
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className={cn(
          buttonSize,
          'inline-flex items-center justify-center rounded-full transition hover:bg-primary/10',
        )}
        aria-label="Sumar uno"
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}
