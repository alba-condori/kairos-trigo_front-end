import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  id: string
  eyebrow: string
  title: string
  description?: string
  className?: string
  as?: 'h1' | 'h2'
}

export function SectionHeading({ id, eyebrow, title, description, className, as: Heading = 'h2' }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <p className="font-label text-[2rem] leading-none md:text-[2.5rem]">{eyebrow}</p>
      <Heading id={id} className="mt-2 text-4xl font-extrabold tracking-tight text-balance md:text-5xl">
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
