import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gumtree MVP Lockdown Board',
  description: 'Real-time collaborative sticky board for MVP decisions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
