import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Elms_Sans, Reenie_Beanie } from 'next/font/google'
import './globals.css'

const elmsSans = Elms_Sans({
  subsets: ['latin'],
  variable: '--font-elms-sans',
  display: 'swap',
})

const reenieBeanie = Reenie_Beanie({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-reenie-beanie',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kairos Trigo | Panadería y pastelería artesanal',
  description:
    'Panadería y pastelería artesanal hecha en casa y a pedido. Panes, tortas y pedidos personalizados con retiro o envío a domicilio en Ciudad de Buenos Aires.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#EBD4B9',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR" className={`${elmsSans.variable} ${reenieBeanie.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
