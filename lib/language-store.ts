"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Language = 'ko' | 'en' | 'ja' | 'zh' | 'vi' | 'id'

interface LanguageStore {
  language: Language
  setLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'ko',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'plango-language',
    }
  )
)

// 언어 설정을 전역적으로 관리하는 유틸리티
export const getLanguage = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("language") || "ko"
  }
  return "ko"
}

export const setLanguage = (language: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("language", language)
    // 언어 변경 이벤트 발생
    window.dispatchEvent(new CustomEvent("languageChange", { detail: language }))
  }
}
