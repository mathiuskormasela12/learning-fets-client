// ========== Home Layout
// import all packages
import { type PropsWithChildren } from 'react'
import React from 'react'
import { Inter } from 'next/font/google'
import { type Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Contact Management',
  description: 'Contact Management with Next Js x FeTS'
}

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='en' dir='ltr'>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
