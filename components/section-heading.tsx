import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  id: string
  eyebrow: string
  title: string
  description?: string
  className?: string
}

export function SectionHeading({ id, eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <p className="font-logo text-3xl leading-none md:text-4xl">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-4xl font-extrabold tracking-tight text-balance md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
