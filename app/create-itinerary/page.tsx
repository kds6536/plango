"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" 
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Sparkles, Plane } from "lucide-react"
import { useLanguageStore } from "@/lib/language-store"

const translations = {
  ko: {
    title: "✈️ 여행 일정 만들기",
    subtitle: "목적지와 기간을 선택하면 AI가 맞춤형 여행 일정을 생성해드립니다",
    cardTitle: "🌟 여행 정보 입력",
    destination: "🌍 목적지",
    destinationPlaceholder: "예: 서울, 부산, 도쿄, 파리, 뉴욕...",
    duration: "📅 여행 기간",
    durationPlaceholder: "여행 일수를 선택하세요",
    durationOptions: {
      1: "당일치기",
      2: "1박 2일",
      3: "2박 3일", 
      4: "3박 4일",
      5: "4박 5일",
      6: "5박 6일",
      7: "6박 7일",
      8: "1주일 이상"
    },
    generateButton: "🎯 일정 생성하기",
    generating: "AI가 최적의 여행 코스를 생성 중입니다...",
    generatingSubtitle: "잠시만 기다려주세요! 평균 15초 내로 완료됩니다.",
    validationError: "목적지와 여행 기간을 모두 입력해주세요."
  },
  en: {
    title: "✈️ Create Itinerary",
    subtitle: "Enter your destination and duration, and AI will create a personalized travel itinerary for you",
    cardTitle: "🌟 Enter Travel Information",
    destination: "🌍 Destination",
    destinationPlaceholder: "e.g. Seoul, Busan, Tokyo, Paris, New York...",
    duration: "📅 Trip Duration",
    durationPlaceholder: "Select trip duration",
    durationOptions: {
      1: "Day Trip",
      2: "1 Night 2 Days",
      3: "2 Nights 3 Days",
      4: "3 Nights 4 Days", 
      5: "4 Nights 5 Days",
      6: "5 Nights 6 Days",
      7: "6 Nights 7 Days",
      8: "1 Week+"
    },
    generateButton: "🎯 Generate Itinerary",
    generating: "AI is creating the optimal travel route...",
    generatingSubtitle: "Please wait a moment! This usually takes about 15 seconds.",
    validationError: "Please enter both destination and trip duration."
  }
}

export default function CreateItineraryPage() {
  const { language } = useLanguageStore()
  const t = translations[language as keyof typeof translations]
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState("")

  const isFormValid = destination.trim() !== "" && duration !== ""

  const handleGenerateItinerary = async () => {
    if (!isFormValid) {
      alert(t.validationError)
      return
    }

    setIsLoading(true)

    try {
      // v6.0: 백엔드 API 스키마에 맞는 요청 데이터
      const requestBody = {
        city: destination.trim(),
        duration: parseInt(duration),
        travelers_count: 2, // 기본값
        budget_range: "1000000 KRW", // 기본값
        travel_style: [],
        special_requests: "",
        language_code: language
      }

      console.log("Request URL:", `${process.env.NEXT_PUBLIC_API_URL}/api/v1/itinerary/generate-recommendations`)
      console.log("Request Body:", JSON.stringify(requestBody, null, 2))

      // 실제 API 호출
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await axios.post(
        `${apiUrl}/api/v1/itinerary/generate-recommendations`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30초 타임아웃
        }
      )

      if (response.data && response.data.places) {
        // 성공: 받은 장소 데이터를 저장하고 추천 페이지로 이동
        localStorage.setItem('recommendationResults', JSON.stringify(response.data.places))
        localStorage.setItem('travelInfo', JSON.stringify(requestBody))
        router.push('/recommendations')
      } else {
        throw new Error("추천 장소 데이터를 받지 못했습니다.")
      }

    } catch (error: any) {
      console.error("여행 일정 생성 실패:", error)
      
      // API 호출 실패시 더미 데이터로 폴백
      console.warn("API 호출 실패, 더미 데이터로 폴백합니다.")
      localStorage.setItem('travelInfo', JSON.stringify({
        destination: destination.trim(),
        duration: parseInt(duration),
        language_code: language
      }))
      
      // 더미 데이터 생성 후 추천 페이지로 이동
      setTimeout(() => {
        router.push('/recommendations')
      }, 1000)
      
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
          <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-blue-500 animate-bounce" />
        </div>
        <h2 className="text-white text-2xl font-bold mt-8">{t.generating}</h2>
        <p className="text-white text-lg mt-2 text-center max-w-md">{t.generatingSubtitle}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 mb-4">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Main Card */}
        <Card className="w-full max-w-2xl mx-auto shadow-2xl rounded-3xl border-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              {t.cardTitle}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <div className="space-y-8">
              
              {/* 목적지 입력 */}
              <div className="space-y-3">
                <Label htmlFor="destination" className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  {t.destination}
                </Label>
                <Input
                  id="destination"
                  placeholder={t.destinationPlaceholder}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="h-12 text-lg rounded-xl border-2 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* 여행 기간 선택 */}
              <div className="space-y-3">
                <Label htmlFor="duration" className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-teal-500" />
                  {t.duration}
                </Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="h-12 text-lg rounded-xl border-2">
                    <SelectValue placeholder={t.durationPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(t.durationOptions).map(([days, label]) => (
                      <SelectItem key={days} value={days} className="text-lg py-3">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 생성 버튼 */}
              <Button
                onClick={handleGenerateItinerary}
                disabled={!isFormValid}
                className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {t.generateButton}
              </Button>
              
            </div>
          </CardContent>
        </Card>

        {/* 특징 설명 */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">똑똑한 목적지 분석</h3>
            <p className="text-gray-600 dark:text-gray-300">AI가 목적지의 특성을 분석하여 최적의 장소들을 추천합니다</p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">최적 동선 계획</h3>
            <p className="text-gray-600 dark:text-gray-300">여행 기간에 맞는 효율적인 동선과 일정을 자동으로 계획합니다</p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">개인 맞춤 추천</h3>
            <p className="text-gray-600 dark:text-gray-300">사용자가 직접 선택한 장소로 나만의 여행 일정을 만들어보세요</p>
          </div>
        </div>
      </div>
    </div>
  )
}