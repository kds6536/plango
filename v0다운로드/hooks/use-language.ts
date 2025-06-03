"use client"

import { useState, useEffect } from "react"
import { getLanguage, setLanguage } from "@/lib/language-store"

export const useLanguage = () => {
  const [language, setLanguageState] = useState("ko")

  useEffect(() => {
    // 초기 언어 설정
    const savedLanguage = getLanguage()
    setLanguageState(savedLanguage)

    // 언어 변경 이벤트 리스너
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguageState(event.detail)
    }

    window.addEventListener("languageChange", handleLanguageChange as EventListener)

    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener)
    }
  }, [])

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage)
    setLanguageState(newLanguage)
  }

  return { language, changeLanguage }
}
