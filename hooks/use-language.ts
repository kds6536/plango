"use client"

import { useLanguageStore } from "@/lib/language-store"

type Language = 'ko' | 'en' | 'ja' | 'zh' | 'vi' | 'id'

export const useLanguage = () => {
  const { language, setLanguage } = useLanguageStore()

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
  }

  return { language, changeLanguage }
}
