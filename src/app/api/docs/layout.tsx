// ========= Docs Layout
// import all packages
import React, { type PropsWithChildren } from 'react'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Docs',
  description: 'API Documentation'
}

const DocsLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='en' dir='ltr'>
      <body>
        {children}
      </body>
    </html>
  )
}

export default DocsLayout
