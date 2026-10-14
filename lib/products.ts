/**
 * Catálogo de Kairos Trigo.
 *
 * Para editar productos, cambiá los datos de esta lista.
 * - price: precio en pesos argentinos (número entero, sin puntos).
 * - image: ruta dentro de /public (ej. "/images/pan-dulce.png").
 * - servings: texto de porciones (opcional, solo se muestra como dato).
 * - options: opciones que el cliente elige antes de agregar al carrito
 *   (ej. sabor, relleno). Se pueden agregar a cualquier producto.
 * - leadTimeHours: anticipación mínima del producto (48 o 72 hs).
 */

export type ProductOption = {
  id: string
  label: string
  choices: string[]
}

export type ProductCategory = 'panaderia' | 'pasteleria'

export type Product = {
  id: string
  name: string
  description?: string
  price: number
  unit?: string
  category: ProductCategory
  image: string
  servings?: string
  options?: ProductOption[]
  leadTimeHours: number
}

export const products: Product[] = [
  // Panadería
  {
    id: 'pan-dulce',
    name: 'Pan dulce',
    description: 'Pan dulce casero, esponjoso y bien cargado. Elegí tu versión favorita.',
    price: 10000,
    unit: 'c/u',
    category: 'panaderia',
    image: '/images/pan-dulce.png',
    options: [
      {
        id: 'variedad',
        label: 'Variedad',
        choices: ['Frutos secos', 'Chips de chocolate', 'Frutas confitadas'],
      },
    ],
    leadTimeHours: 48,
  },
  {
    id: 'rollo-de-canela',
    name: 'Rollo de canela',
    description: 'Masa suave horneada con canela y baño de glaseado casero.',
    price: 2500,
    unit: 'c/u',
    category: 'panaderia',
    image: '/images/rollo-canela.png',
    leadTimeHours: 48,
  },
  {
    id: 'pan-de-campo',
    name: 'Pan de campo',
    description: 'Masa de campo crocante por fuera y miga suave por dentro.',
    price: 3000,
    unit: 'c/u',
    category: 'panaderia',
    image: '/images/pan-de-campo.png',
    leadTimeHours: 48,
  },
  {
    id: 'pan-baguette',
    name: 'Pan baguette',
    description: 'Crocante, doradito y listo para acompañar tus comidas.',
    price: 1000,
    unit: 'c/u',
    category: 'panaderia',
    image: '/images/baguette.png',
    leadTimeHours: 48,
  },
  {
    id: 'pan-casero',
    name: 'Pan casero',
    description: 'El pan de todos los días, hecho en casa.',
    price: 2000,
    unit: 'c/u',
    category: 'panaderia',
    image: '/images/pan-casero.png',
    leadTimeHours: 48,
  },
  {
    id: 'empanadas-jamon-queso',
    name: 'Empanadas de jamón y queso',
    description: 'Horneadas, con repulgue casero y bien rellenas.',
    price: 1500,
    unit: 'c/u',
    category: 'panaderia',
    image: '/images/empanadas.png',
    leadTimeHours: 48,
  },
  {
    id: 'rollo-de-queso',
    name: 'Rollo de queso',
    description: 'Masa tierna enrollada con queso gratinado.',
    price: 2200,
    unit: 'c/u',
    category: 'panaderia',
    image: '/images/rollo-queso.png',
    leadTimeHours: 48,
  },

  // Pastelería
  {
    id: 'torta-matilda',
    name: 'Torta Matilda',
    description: 'Bizcochuelo húmedo de chocolate con ganache intensa.',
    price: 40000,
    category: 'pasteleria',
    image: '/images/torta-matilda.png',
    servings: '10 a 12 porciones',
    leadTimeHours: 72,
  },
  {
    id: 'tiramisu',
    name: 'Tiramisú',
    description: 'Vainillas embebidas en café, crema suave y cacao.',
    price: 44000,
    category: 'pasteleria',
    image: '/images/tiramisu.png',
    servings: '10 a 12 porciones',
    leadTimeHours: 72,
  },
  {
    id: 'cheesecake',
    name: 'Cheesecake',
    description: 'Base crocante, crema de queso y cobertura de frutos rojos.',
    price: 48000,
    category: 'pasteleria',
    image: '/images/cheesecake.png',
    servings: '12 a 15 porciones',
    leadTimeHours: 72,
  },
  {
    id: 'lemon-pie',
    name: 'Lemon Pie',
    description: 'Masa sablée, crema de limón y merengue tostado.',
    price: 30000,
    category: 'pasteleria',
    image: '/images/lemon-pie.png',
    servings: '10 a 12 porciones',
    leadTimeHours: 72,
  },
  {
    id: 'tartas-dulces',
    name: 'Tartas dulces',
    description: 'Tartas caseras para compartir en la merienda.',
    price: 12000,
    category: 'pasteleria',
    image: '/images/tarta-dulce.png',
    servings: '8 porciones',
    leadTimeHours: 72,
  },
]

export const getProductsByCategory = (category: ProductCategory) =>
  products.filter((product) => product.category === category)
