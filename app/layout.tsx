// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import {Zain} from 'next/font/google'
import NavBar from '@/components/navbar'
import BottomMenu from '@/components/bottommenu'
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
        <header className="h-[10vh] bg-[#307D85] text-white flex items-center justify-center shadow-md">
          <NavBar />
        </header>

        {/* Main content with bottom padding to avoid overlap */}
        <main className="flex-1 p-6 pb-24 bg-gray-50 text-black">
          {children}
        </main>

        {/* Fixed Footer */}
        <footer className="fixed bottom-0 left-0 w-full h-16 bg-[#307D85] text-white flex flex-col items-center justify-center z-50 shadow-t">
         <BottomMenu />
        </footer>

      </body>
    </html>
  )
}
