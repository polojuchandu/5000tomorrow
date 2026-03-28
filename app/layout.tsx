import type { Metadata } from "next"
import { Inter, Geist } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Header, Footer, StickyMobileCTA } from "@/components/layout"

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] })

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
      <body className={cn(inter.className, "flex flex-col min-h-screen bg-slate-50")}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  )
}