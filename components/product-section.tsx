import { ProductCard } from '@/components/product-card'
import { SectionHeading } from '@/components/section-heading'
import type { Product } from '@/lib/products'

type ProductSectionProps = {
  id: string
  eyebrow: string
  title: string
  description: string
  products: Product[]
}

export function ProductSection({ id, eyebrow, title, description, products }: ProductSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
