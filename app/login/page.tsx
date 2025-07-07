"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plane } from "lucide-react"
import Link from "next/link"
import { LanguageWrapper, useTranslations } from "@/components/language-wrapper"

function LoginContent() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Pattern - 부드러운 색상으로 조정 */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-32 left-16 w-40 h-40 bg-cyan-300 dark:bg-cyan-600 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-24 w-32 h-32 bg-blue-300 dark:bg-blue-600 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-1/4 w-36 h-36 bg-indigo-300 dark:bg-indigo-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 right-16 w-28 h-28 bg-purple-300 dark:bg-purple-600 rounded-full blur-2xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-white transform rotate-45" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.logo}
            </span>
          </Link>
        </div>

        <Card className="border border-border shadow-xl bg-card/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-foreground">{t.auth.login}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">{t.form.email}</Label>
                <Input id="email" type="email" placeholder={t.form.emailPlaceholder} required className="bg-background border-border" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">{t.form.password}</Label>
                <Input id="password" type="password" placeholder={t.form.passwordPlaceholder} required className="bg-background border-border" />
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              {t.auth.login}
            </Button>

            <div className="text-center">
              <Link href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                {t.form.forgotPassword}
              </Link>
            </div>

            <div className="relative">
              <Separator className="bg-border" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-card px-2 text-sm text-muted-foreground">{t.form.or}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full bg-card hover:bg-muted border-border text-foreground">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {t.social.google}
              </Button>

              <Button
                variant="outline"
                className="w-full bg-yellow-400 hover:bg-yellow-500 border-yellow-400 text-black dark:text-black"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c2.755 0 5.455.232 8.083.678 1.275.217 2.22 1.206 2.22 2.32v.859c0 .79-.479 1.501-1.212 1.807-.24.1-.49.18-.748.24v8.553c0 1.657-1.343 3-3 3H6.657c-1.657 0-3-1.343-3-3V8.904c-.258-.06-.508-.14-.748-.24C2.176 8.358 1.697 7.647 1.697 6.857v-.859c0-1.114.945-2.103 2.22-2.32C6.545 3.232 9.245 3 12 3z" />
                </svg>
                {t.social.kakao}
              </Button>

              <Button variant="outline" className="w-full bg-black hover:bg-gray-800 text-white border-black dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                {t.social.apple}
              </Button>
            </div>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t.form.noAccount} </span>
              <Link href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
                {t.auth.signup}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <LanguageWrapper>
      <LoginContent />
    </LanguageWrapper>
  )
}
