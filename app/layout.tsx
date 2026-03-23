import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Farm Tracker',
  description: 'Track your bell pepper farm',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
