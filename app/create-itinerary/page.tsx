"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" 
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Sparkles, Plane, Plus, X, Calendar } from "lucide-react"
import { useLanguageStore } from "@/lib/language-store"
import { useTranslations } from "@/components/language-wrapper"

interface Destination {
  id: string
  country: string
  city: string
  startDate: string
  endDate: string
}

export default function CreateItineraryPage() {
  const { language } = useLanguageStore()
  const t = useTranslations()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false) 
  const [destinations, setDestinations] = useState<Destination[]>([
    {
      id: Date.now().toString(),
      country: "",
      city: "",
      startDate: "",
      endDate: ""
    }
  ])

  const countries = [
    { value: "southKorea", label: t.createItinerary.countries.southKorea },
    { value: "japan", label: t.createItinerary.countries.japan },
    { value: "china", label: t.createItinerary.countries.china },
    { value: "thailand", label: t.createItinerary.countries.thailand },
    { value: "vietnam", label: t.createItinerary.countries.vietnam },
    { value: "singapore", label: t.createItinerary.countries.singapore },
    { value: "malaysia", label: t.createItinerary.countries.malaysia },
    { value: "philippines", label: t.createItinerary.countries.philippines },
    { value: "indonesia", label: t.createItinerary.countries.indonesia },
    { value: "france", label: t.createItinerary.countries.france },
    { value: "italy", label: t.createItinerary.countries.italy },
    { value: "spain", label: t.createItinerary.countries.spain },
    { value: "germany", label: t.createItinerary.countries.germany },
    { value: "uk", label: t.createItinerary.countries.uk },
    { value: "usa", label: t.createItinerary.countries.usa },
    { value: "canada", label: t.createItinerary.countries.canada },
    { value: "australia", label: t.createItinerary.countries.australia },
    { value: "newZealand", label: t.createItinerary.countries.newZealand }
  ]

  const isFormValid = destinations.every(dest => 
    dest.country.trim() !== "" && 
    dest.city.trim() !== "" && 
    dest.startDate !== "" && 
    dest.endDate !== ""
  )

  const updateDestination = (id: string, field: keyof Destination, value: string) => {
    setDestinations(prev => prev.map(dest => 
      dest.id === id ? { ...dest, [field]: value } : dest
    ))
  }

  const addDestination = () => {
    setDestinations(prev => [...prev, {
      id: Date.now().toString(),
      country: "",
      city: "",
      startDate: "",
      endDate: ""
    }])
  }

  const removeDestination = (id: string) => {
    if (destinations.length > 1) {
      setDestinations(prev => prev.filter(dest => dest.id !== id))
    }
  }

  const calculateTotalDuration = () => {
    if (!destinations.length || !destinations[0].startDate || !destinations[destinations.length - 1].endDate) {
      return 0
    }
    const start = new Date(destinations[0].startDate)
    const end = new Date(destinations[destinations.length - 1].endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleGenerateItinerary = async () => {
    if (!isFormValid) {
      alert(t.createItinerary.validationError)
      return
    }

    setIsLoading(true)

    try {
      // v6.0: 다중 목적지 지원하는 새로운 요청 데이터 구조
      const requestBody = {
        destinations: destinations.map(dest => ({
          country: dest.country,
          city: dest.city,
          start_date: dest.startDate,
          end_date: dest.endDate
        })),
        total_duration: calculateTotalDuration(),
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
        destinations: destinations,
        total_duration: calculateTotalDuration(),
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-blue-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t.createItinerary.generating}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t.createItinerary.generatingSubtitle}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.createItinerary.title}
        </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.createItinerary.subtitle}
        </p>
      </div>

        {/* 여행 정보 입력 카드 */}
        <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center justify-center gap-2">
              <Plane className="h-6 w-6 text-blue-500" />
              {t.createItinerary.cardTitle}
            </CardTitle>
        </CardHeader>
          <CardContent className="space-y-6">
            {/* 목적지 리스트 */}
            {destinations.map((destination, index) => (
              <div key={destination.id} className="p-6 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    {t.createItinerary.destination} {index + 1}
                  </h3>
                  {destinations.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeDestination(destination.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-1" />
                      {t.createItinerary.removeDestination}
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* 국가 선택 */}
                  <div className="space-y-2">
                    <Label htmlFor={`country-${destination.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.createItinerary.country}
                    </Label>
                    <Select value={destination.country} onValueChange={(value) => updateDestination(destination.id, 'country', value)}>
                      <SelectTrigger id={`country-${destination.id}`}>
                        <SelectValue placeholder={t.createItinerary.countryPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
            </div>

                  {/* 도시 입력 */}
            <div className="space-y-2">
                    <Label htmlFor={`city-${destination.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.createItinerary.city}
                    </Label>
                <Input
                      id={`city-${destination.id}`}
                      type="text"
                      placeholder={t.createItinerary.cityPlaceholder}
                      value={destination.city}
                      onChange={(e) => updateDestination(destination.id, 'city', e.target.value)}
                      className="w-full"
                    />
              </div>
            </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 시작일 */}
            <div className="space-y-2">
                    <Label htmlFor={`start-date-${destination.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.createItinerary.startDate}
                    </Label>
                    <div className="relative">
                      <Input
                        id={`start-date-${destination.id}`}
                        type="date"
                        value={destination.startDate}
                        onChange={(e) => updateDestination(destination.id, 'startDate', e.target.value)}
                        className="w-full pl-10"
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
                  {/* 종료일 */}
            <div className="space-y-2">
                    <Label htmlFor={`end-date-${destination.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.createItinerary.endDate}
                    </Label>
              <div className="relative">
                <Input
                        id={`end-date-${destination.id}`}
                        type="date"
                        value={destination.endDate}
                        onChange={(e) => updateDestination(destination.id, 'endDate', e.target.value)}
                        className="w-full pl-10"
                        min={destination.startDate}
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                 </div>
              </div>
            </div>
            
                {/* 기간 표시 */}
                {destination.startDate && destination.endDate && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-blue-700 dark:text-blue-300">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {t.createItinerary.duration}: {
                          Math.ceil((new Date(destination.endDate).getTime() - new Date(destination.startDate).getTime()) / (1000 * 60 * 60 * 24))
                        }일
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* 목적지 추가 버튼 */}
            <div className="text-center">
            <Button
                type="button"
                variant="outline"
                onClick={addDestination}
                className="border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
              >
                <Plus className="h-5 w-5 mr-2" />
                {t.createItinerary.addDestination}
            </Button>
          </div>

            {/* 총 여행 기간 표시 */}
            {destinations.length > 0 && destinations[0].startDate && destinations[destinations.length - 1].endDate && (
              <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    총 여행 기간
                  </h4>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <span>{destinations[0].startDate}</span>
                    <span>→</span>
                    <span>{destinations[destinations.length - 1].endDate}</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      ({calculateTotalDuration()}일)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 일정 생성 버튼 */}
            <div className="text-center pt-6">
                <Button
                onClick={handleGenerateItinerary}
                disabled={!isFormValid}
                  size="lg"
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                <Sparkles className="h-5 w-5 mr-2" />
                {t.createItinerary.generateButton}
                </Button>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}