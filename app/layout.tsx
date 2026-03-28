import type { Metadata, Viewport } from "next"
import { Inter, Geist } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "5000 Tomorrow | Michigan Legal Funding",
  description: "Get up to $5,000 before your case settles. Fast pre-settlement legal funding for Michigan residents.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}