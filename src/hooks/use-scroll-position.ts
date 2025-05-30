"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export const useScrollPosition = () => {
  const router = useRouter()

  useEffect(() => {
    // 페이지 로드 시 저장된 스크롤 위치 복원
    const savedScrollPosition = sessionStorage.getItem("scrollPosition")
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, Number.parseInt(savedScrollPosition))
        sessionStorage.removeItem("scrollPosition")
      }, 100)
    }

    // 페이지 이동 전 스크롤 위치 저장
    const saveScrollPosition = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString())
    }

    // 링크 클릭 시 스크롤 위치 저장
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")
      if (link && link.href && !link.href.includes("#")) {
        saveScrollPosition()
      }
    }

    // 브라우저 뒤로가기/앞으로가기 시 스크롤 위치 저장
    const handlePopState = () => {
      saveScrollPosition()
    }

    // 페이지 언로드 시 스크롤 위치 저장
    const handleBeforeUnload = () => {
      saveScrollPosition()
    }

    document.addEventListener("click", handleLinkClick)
    window.addEventListener("popstate", handlePopState)
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      document.removeEventListener("click", handleLinkClick)
      window.removeEventListener("popstate", handlePopState)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [router])
}
