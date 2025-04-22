// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import {Zain} from 'next/font/google'
import NavBar from '@/components/navbar'

const zain = Zain({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: 'AyudaMe',
  description: 'Portal de manejo de prescripciones',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${zain.className} flex flex-col min-h-screen`}>
        {/* Header */}
        <header className="h-[10vh] bg-[#307D85] text-white flex flex-col items-center justify-center shadow-md">
          <h1 className="text-2xl font-bold">AyudaMe</h1>
          <NavBar/>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-50 text-black">
          {children}
        </main>

        {/* Footer */}
        <footer className="h-16 bg-[#307D85] text-white flex flex-col items-center justify-center">
          <p className="text-sm">&copy; 2025 PharmaSync</p> 
          <p className="text-sm">Keep it Sync, Keep it Simple</p>
        </footer>
      </body>
    </html>
  )
}
