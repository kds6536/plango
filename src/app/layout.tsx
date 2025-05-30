import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageWrapper } from '@/components/language-wrapper'

export const metadata: Metadata = {
  title: 'Plango - 여행 일정 계획의 새로운 방식',
  description: 'AI 기반 맞춤형 여행 일정 계획 서비스',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageWrapper>
            {children}
          </LanguageWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
