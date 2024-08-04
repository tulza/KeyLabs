import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KeyLabs',
  description:
    'Keylabs is a competitive platform for virtual keyboard individuals looking to enhance their skills.',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/icon.svg',
        href: '/svgs/icon.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/svgs/icon-darkmode.svg',
        href: '/svgs/icon-darkmode.svg',
      },
    ],
  },
  verification: {
    // google: "", ADD SOON
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
