import '~/styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import { type Metadata } from 'next'

import { TRPCReactProvider } from '~/trpc/react'
import { ThemeProvider } from '~/components/theme-provider'

export const metadata: Metadata = {
    title: 'Rapport',
    description: 'Rapport',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute={'class'}
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TRPCReactProvider>{children}</TRPCReactProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
