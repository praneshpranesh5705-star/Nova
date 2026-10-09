import './globals.css'
import { ReactNode } from 'react'
export const metadata={title:'NOVA HUB — AI Knowledge & Problem Solving',description:'AI-powered knowledge, projects, books, documents and problem solving platform.'}
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body>{children}</body></html>}
