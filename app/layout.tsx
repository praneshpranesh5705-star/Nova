import '../globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'NOVA HUB — AI Knowledge & Problem Solving',
  description: 'AI-powered knowledge, documents, coding, research, publishing and live project intelligence.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
