import './globals.css'
import { Inter } from 'next/font/google'
import Provider from '@/app/components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Magic Link',
  description: 'Passwordless Authentication System using Nextjs 13, SendGrid and NextAUTH',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
