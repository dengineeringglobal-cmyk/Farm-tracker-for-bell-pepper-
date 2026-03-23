import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Farm Tracker - Bell Pepper Management',
  description: 'Track your bell pepper farm with weather monitoring and data management',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}
