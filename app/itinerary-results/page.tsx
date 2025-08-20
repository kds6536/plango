"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Sparkles, Heart, Star, Users, Navigation } from "lucide-react"
import { useLanguageStore } from "@/lib/language-store"
import { useTranslations } from "@/components/language-wrapper"
// 실제 Google Maps를 사용하도록 교체
import GoogleMaps from "@/components/google-maps"
import GmapsAdvanced from "@/components/gmaps-advanced"
import PDFGenerator from "@/components/pdf-generator"
import { PlaceData, OptimizeResponse, TravelPlan, DayPlan } from "@/lib/types"

// 기존 인터페이스 유지 (UI 호환성)
interface Place {
  place_id: string
  name: string
  rating?: number
  photos?: string[]
  address?: string
  category?: string
  description?: string
  tags?: string[]
  location?: { lat: number; lng: number }
}

interface ItineraryDay {
  day: number
  date: string
  places: Place[]
  totalTime: string
  theme: string
}

export default function ItineraryResultsPage() {
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([])
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([])
  const [travelInfo, setTravelInfo] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("timeline")
  const [apiError, setApiError] = useState<string | null>(null)
  const router = useRouter()
  const { language } = useLanguageStore()
  const t = useTranslations()

  useEffect(() => {
    // localStorage에서 선택된 장소와 여행 정보 읽기
    const loadItineraryData = async () => {
      try {
        const selectedPlacesData = localStorage.getItem('selectedPlacesForItinerary')
        const travelInfoData = localStorage.getItem('currentTravelInfo')
        
        if (!selectedPlacesData) {
          setIsLoading(false)
          return
        }

        const places: PlaceData[] = JSON.parse(selectedPlacesData)
        const parsedTravelInfo = travelInfoData ? JSON.parse(travelInfoData) : { total_duration: 3 }
        
        console.log("선택된 장소들:", places)
        console.log("여행 정보:", parsedTravelInfo)
        
        setTravelInfo(parsedTravelInfo)
        
        // v6.0: 실제 /optimize API 호출
        await generateOptimizedItinerary(places, parsedTravelInfo)
        
      } catch (error) {
        console.error("일정 데이터 로드 실패:", error)
        // 에러 발생시 더미 데이터로 폴백
        const places: Place[] = JSON.parse(localStorage.getItem('selectedPlacesForItinerary') || '[]')
        const fallbackItinerary = generateFallbackItinerary(places, travelInfo.total_duration || 3)
        setSelectedPlaces(places)
        setItinerary(fallbackItinerary)
      } finally {
        setTimeout(() => setIsLoading(false), 2000) // 2초 로딩 시뮬레이션
      }
    }

    loadItineraryData()
  }, [])

  // v6.0: 실제 AI API를 사용한 일정 최적화
  const generateOptimizedItinerary = async (places: PlaceData[], travelInfo: any) => {
    setApiError(null) // 이전 에러 상태 초기화
    
    try {
      console.log("v6.0 /optimize API 호출 시작")
      
      const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '')
      
      const response = await axios.post(
        `${apiUrl}/api/v1/itinerary/optimize`,
        { 
          places, 
          language_code: language,
          daily_start_time: travelInfo.dailyStartTime || "09:00",
          daily_end_time: travelInfo.dailyEndTime || "22:00",
          duration: travelInfo.total_duration || 3
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30초 타임아웃
        }
      )

      // HTTP 상태 코드 확인
      if (!response || response.status !== 200) {
        throw new Error(`서버 응답 오류: ${response?.status || 'Unknown'} ${response?.statusText || ''}`)
      }

      if (response.data && response.data.optimized_plan) {
        console.log("✅ API 성공:", response.data)
        const optimizedPlan: TravelPlan = response.data.optimized_plan
        
        // TravelPlan을 ItineraryDay 형식으로 변환
        const convertedItinerary = convertTravelPlanToItinerary(optimizedPlan, travelInfo.total_duration)
        
        setItinerary(convertedItinerary)
        setSelectedPlaces(places.map(convertPlaceDataToPlace))
        
      } else {
        throw new Error("최적화된 일정을 받지 못했습니다.")
      }

    } catch (error: any) {
      // 상세한 에러 로깅 (개발자용)
      console.error("❌ Itinerary Optimization API Error Details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data
        }
      })
      
      // 사용자 친화적 에러 메시지 설정
      let userErrorMessage = "일정 최적화에 실패했습니다. 기본 일정으로 표시됩니다."
      
      if (error.code === 'ECONNABORTED') {
        userErrorMessage = "서버 응답 시간이 초과되었습니다. 기본 일정으로 표시됩니다."
      } else if (error.response?.status === 422) {
        userErrorMessage = "선택하신 장소 정보에 문제가 있습니다. 기본 일정으로 표시됩니다."
      } else if (error.response?.status === 500) {
        userErrorMessage = "서버에 일시적인 문제가 발생했습니다. 기본 일정으로 표시됩니다."
      } else if (!navigator.onLine) {
        userErrorMessage = "인터넷 연결을 확인해 주세요. 기본 일정으로 표시됩니다."
      }
      
      setApiError(userErrorMessage)
      
      // 폴백으로 간단한 일정 생성
      const places_converted = places.map(convertPlaceDataToPlace)
      const fallbackItinerary = generateFallbackItinerary(places_converted, travelInfo.total_duration || 3)
      setSelectedPlaces(places_converted)
      setItinerary(fallbackItinerary)
    }
  }

  // PlaceData를 Place로 변환
  const convertPlaceDataToPlace = (placeData: PlaceData): Place => ({
    place_id: placeData.place_id,
    name: placeData.name,
    rating: placeData.rating,
    address: placeData.address,
    category: placeData.category,
    description: placeData.description,
    photos: [`https://via.placeholder.com/400x300?text=${encodeURIComponent(placeData.name)}`],
    tags: ["AI 최적화", "추천"],
    // Google Maps 컴포넌트가 사용하는 좌표 필드
    location: { lat: placeData.lat, lng: placeData.lng }
  })

  // TravelPlan을 ItineraryDay로 변환
  const convertTravelPlanToItinerary = (plan: TravelPlan, duration: number): ItineraryDay[] => {
    if (!plan.daily_plans || plan.daily_plans.length === 0) {
      return []
    }

    return plan.daily_plans.map((dayPlan: DayPlan, index: number) => ({
      day: dayPlan.day,
      date: getDateString(index),
      places: plan.places?.slice(index * Math.ceil(plan.places.length / duration), (index + 1) * Math.ceil(plan.places.length / duration))?.map(convertPlaceDataToPlace) || [],
      totalTime: dayPlan.estimated_cost || "6-8시간",
      theme: dayPlan.theme
    }))
  }

  // 폴백 일정 생성 로직
  const generateFallbackItinerary = (places: Place[], duration: number): ItineraryDay[] => {
    const days: ItineraryDay[] = []
    const placesPerDay = Math.ceil(places.length / duration)
    
    for (let i = 0; i < duration; i++) {
      const dayPlaces = places.slice(i * placesPerDay, (i + 1) * placesPerDay)
      const themes = ["문화 탐방", "미식 여행", "자연 체험", "도시 투어", "휴식"]
      
      days.push({
        day: i + 1,
        date: getDateString(i),
        places: dayPlaces,
        totalTime: `${6 + Math.floor(Math.random() * 4)}시간`,
        theme: themes[i % themes.length]
      })
    }
    
    return days
  }

  const getDateString = (dayOffset: number) => {
    const date = new Date()
    date.setDate(date.getDate() + dayOffset)
    const localeMap: Record<string, string> = {
      ko: 'ko-KR', en: 'en-US', ja: 'ja-JP', zh: 'zh-CN', vi: 'vi-VN', id: 'id-ID'
    }
    const locale = localeMap[language as keyof typeof localeMap] || 'en-US'
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="relative">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-center">{t.itineraryResults.loading}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
          선택하신 장소들을 기반으로 최적의 동선과 일정을 계산하고 있습니다...
        </p>
      </div>
    )
  }

  if (!selectedPlaces.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="text-6xl">😅</div>
        <h2 className="text-2xl font-bold text-center">{t.itineraryResults.noData}</h2>
        <Button onClick={() => router.replace("/create-itinerary")} size="lg">
          <Navigation className="mr-2 h-5 w-5" />
          {t.itineraryResults.backToStart}
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{t.itineraryResults.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">{t.itineraryResults.subtitle}</p>
        
        {/* 액션 버튼들 */}
        <div className="flex justify-center gap-4 mt-6">
          <Button variant="outline" size="sm">
            <Heart className="mr-2 h-4 w-4" />
            {t.itineraryResults.save}
          </Button>
          <Button variant="outline" size="sm" onClick={async () => {
            const url = window.location.href
            try {
              if (navigator.share) {
                await navigator.share({ title: document.title, url })
              } else {
                await navigator.clipboard.writeText(url)
                alert('현재 페이지 링크가 복사되었습니다.')
              }
            } catch (e) {
              try {
                await navigator.clipboard.writeText(url)
                alert('현재 페이지 링크가 복사되었습니다.')
              } catch (_) {
                alert('공유 기능을 사용할 수 없습니다.')
              }
            }
          }}>
            <Users className="mr-2 h-4 w-4" />
            {t.itineraryResults.share}
          </Button>
          <PDFGenerator
            itinerary={itinerary}
            selectedPlaces={selectedPlaces}
            travelInfo={travelInfo}
            onGenerateStart={() => console.log('PDF 생성 시작')}
            onGenerateComplete={() => console.log('PDF 생성 완료')}
            onGenerateError={(error) => console.error('PDF 생성 오류:', error)}
          />
        </div>
      </div>

      {/* 3-Way View 탭 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="timeline" className="text-lg py-3">
            {t.itineraryResults.tabs.timeline}
          </TabsTrigger>
          <TabsTrigger value="map" className="text-lg py-3">
            {t.itineraryResults.tabs.map}
          </TabsTrigger>
          <TabsTrigger value="diary" className="text-lg py-3">
            {t.itineraryResults.tabs.diary}
          </TabsTrigger>
        </TabsList>

        {/* API 에러 메시지 표시 */}
        {apiError && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Sparkles className="h-5 w-5 text-red-500" />
              </div>
              <div className="flex-1">
                <p className="text-red-700 dark:text-red-300 font-medium">
                  {apiError}
                </p>
              </div>
              <button
                onClick={() => setApiError(null)}
                className="flex-shrink-0 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors"
              >
                <Star className="h-4 w-4 text-red-500" />
              </button>
            </div>
          </div>
        )}

        {/* 일정표 뷰 */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-blue-500" />
                {t.itineraryResults.timeline.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {itinerary.map((day, dayIndex) => (
                <div key={dayIndex} className="border-l-4 border-blue-500 pl-6 pb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                      {day.day}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{t.itineraryResults.timeline.day} {day.day}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{day.date}</p>
                      <Badge variant="outline" className="mt-1">{day.theme}</Badge>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-sm text-gray-500">{t.itineraryResults.timeline.totalTime}</div>
                      <div className="font-semibold">{day.totalTime}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {day.places.map((place, placeIndex) => (
                      <div key={place.place_id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <div className="text-sm font-mono bg-white dark:bg-gray-700 px-2 py-1 rounded">
                            {`${9 + placeIndex * 2}:00`}
                          </div>
                <div className="flex-1">
                            <h4 className="font-semibold text-lg">{place.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600 dark:text-gray-300">{place.address || `${place.category} 주소`}</span>
                            </div>
                            {place.rating && (
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">{place.rating}</span>
                              </div>
                            )}
                            <div className="flex gap-2 mt-2">
                              {place.tags?.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">{t.itineraryResults.timeline.duration}</div>
                            <div className="font-semibold">1-2시간</div>
                            {placeIndex < day.places.length - 1 && (
                              <div className="text-xs text-blue-500 mt-1">
                                <Clock className="h-3 w-3 inline mr-1" />
                                이동 15분
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 지도 뷰 (Google Maps) */}
        <TabsContent value="map" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-green-500" />
                {t.itineraryResults.map.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* 고급 지도: 날짜별 색상/경로 */}
              <GmapsAdvanced itinerary={itinerary as any} className="h-96 w-full" />
              
              {/* 경로 요약 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {itinerary.map((day, dayIndex) => (
                  <div key={dayIndex} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Day {day.day} 경로</h4>
                    <div className="space-y-2">
                      {day.places.map((place, placeIndex) => (
                        <div key={place.place_id} className="flex items-center gap-2 text-sm">
                          <div className={`w-3 h-3 rounded-full ${
                            dayIndex === 0 ? 'bg-blue-500' : 
                            dayIndex === 1 ? 'bg-green-500' : 'bg-orange-500'
                          }`} />
                          <span>{place.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 다이어리 뷰 - 가독성 개선 */}
        <TabsContent value="diary" className="space-y-6">
          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif text-amber-700 dark:text-amber-300">
                <Sparkles className="h-6 w-6 text-amber-500" />
                {t.itineraryResults.diary.title}
              </CardTitle>
              <p className="text-gray-700 dark:text-gray-300 font-serif italic">
                {t.itineraryResults.diary.subtitle}
              </p>
            </CardHeader>
            <CardContent className="space-y-10 max-w-2xl mx-auto">
              {itinerary.map((day, dayIndex) => (
                <section key={dayIndex} className="space-y-4 relative">
                  {/* 타임라인 수직선 */}
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-amber-200 dark:bg-amber-800" />
                  <header className="flex items-baseline justify-between pl-8">
                    <h3 className="text-2xl font-serif font-bold text-amber-800 dark:text-amber-200">
                      Day {day.day} · {day.theme}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{day.date}</span>
                  </header>
                  <ul className="space-y-3 pl-8">
                    {day.places.map((place, index) => (
                      <li key={place.place_id} className="relative rounded-lg border border-amber-200/60 dark:border-amber-900/30 p-4 bg-amber-50/40 dark:bg-amber-900/10">
                        {/* 타임라인 노드 */}
                        <div className="absolute -left-4 top-5 w-3 h-3 rounded-full bg-amber-400 border-2 border-white dark:border-gray-900" />
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <p className="font-semibold text-gray-900 dark:text-gray-100">
                              {index + 1}. {place.name}
                            </p>
                            {place.address && (
                              <p className="text-sm text-gray-600 dark:text-gray-300">{place.address}</p>
                            )}
                            <div className="flex gap-2 pt-1">
                              <span className="text-[11px] px-2 py-0.5 rounded bg-amber-200/70 text-amber-900 dark:bg-amber-800/40 dark:text-amber-200">예상 1-2시간</span>
                              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-200/60 text-blue-900 dark:bg-blue-800/40 dark:text-blue-200">이동 15분</span>
                            </div>
                          </div>
                          {place.rating && (
                            <span className="text-sm text-yellow-600 dark:text-yellow-400">⭐ {place.rating.toFixed(1)}</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
              <div className="text-center pt-2">
                <p className="font-serif text-base text-gray-700 dark:text-gray-300">✨ 멋진 여행이 되길 바랍니다!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}