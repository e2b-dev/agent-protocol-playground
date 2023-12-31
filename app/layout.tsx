import './globals.css'
import type { Metadata } from 'next'
import { Separator } from '@/components/ui/separator'
import { Inter } from 'next/font/google'
import { AgentUrl } from '@/components/ui/agentUrl'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen flex flex-col justify-start items-start">
          {/* Header */}
          <div className="w-full px-4 py-4">
            <Link href="/">
              <h1 className="font-bold text-lg">Agent Protocol Playground</h1>
            </Link>
          </div>
          <Separator />
          <AgentUrl />
          {children}
        </main>
      </body>
    </html>
  )
}
