"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Plan {
  theme: string;
  days: any[];
}

interface ItineraryData {
  plan_a: Plan;
  plan_b: Plan;
}

export default function ItineraryResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<ItineraryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedResults = localStorage.getItem('itineraryResults')
    if (storedResults) {
      setResults(JSON.parse(storedResults))
      localStorage.removeItem('itineraryResults')
    } else {
      alert("생성된 일정이 없습니다. 먼저 일정을 생성해주세요.")
      router.push('/create-itinerary')
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return <div>결과를 불러오는 중...</div>
  }
  if (!results) {
    return <div>표시할 결과가 없습니다.</div>
  }

  return (
    <div>
      <h1>추천 여행 일정</h1>
      <div>
        <h2>플랜 A: {results.plan_a.theme}</h2>
        {/* results.plan_a.days 데이터를 바탕으로 UI를 그리는 로직 */}
      </div>
      <div>
        <h2>플랜 B: {results.plan_b.theme}</h2>
        {/* results.plan_b.days 데이터를 바탕으로 UI를 그리는 로직 */}
      </div>
    </div>
  )
}
