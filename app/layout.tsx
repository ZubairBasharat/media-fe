import { Metadata } from "next"
import "./globals.css"

import { TailwindIndicator } from "@/components/tailwind-indicator"
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

import { ReduxStoreProvider } from "@/providers/reduxStoreProvider"
import { Toaster } from "react-hot-toast"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    // icon: "/assets/images/logo.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          suppressHydrationWarning={true}
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ReduxStoreProvider>
            {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
            {children}
            <TailwindIndicator />
            <Toaster />
            {/* </ThemeProvider> */}
          </ReduxStoreProvider>
        </body>
      </html>
    </>
  )
}
