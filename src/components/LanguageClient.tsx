"use client"
import { ReactNode } from "react"
import { useLanguage } from "hooks/use-language"

export default function LanguageClient({ children }: { children: (language: string) => ReactNode }) {
  const { language } = useLanguage()
  return <>{children(language)}</>
} 