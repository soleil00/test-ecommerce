import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"
import Head from "next/head"

export const metadata: Metadata = {
  title: "Modern Store - E-commerce Platform",
  description: "A modern, minimal e-commerce platform built with Next.js",
  generator: "Soleil",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en"> 
      <Head>
        <Script src="https://unpkg.com/@albedo-link/intent/lib/albedo.intent.js" strategy="beforeInteractive" />
      </Head>
      <body className="font-sans">
        <Suspense fallback={null}>
          <ReduxProvider>{children}</ReduxProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
