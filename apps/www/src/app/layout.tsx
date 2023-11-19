import type { Metadata, Viewport } from "next"

import "@/styles/globals.css"
import { siteConfig } from "@/config/site"
import { fontHeading, fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import SiteFooter from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter className="border-t" />
          </div>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
