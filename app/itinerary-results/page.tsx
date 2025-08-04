"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Sparkles, Heart, Star, Users, Navigation } from "lucide-react"
import { useLanguageStore } from "@/lib/language-store"
import { useTranslations } from "@/components/language-wrapper"
import SimpleMap from "@/components/simple-map"
import PDFGenerator from "@/components/pdf-generator"

interface Place {
  place_id: string
  name: string
  rating?: number
  photos?: string[]
  address?: string
  category?: string
  description?: string
  tags?: string[]
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
  const router = useRouter()
  const { language } = useLanguageStore()
  const t = useTranslations()

  useEffect(() => {
    // localStorage에서 선택된 장소와 여행 정보 읽기
    const loadItineraryData = () => {
      try {
        const selectedPlacesData = localStorage.getItem('selectedPlacesForItinerary')
        const travelInfoData = localStorage.getItem('currentTravelInfo')
        
        if (!selectedPlacesData) {
          setIsLoading(false)
          return
        }

        const places: Place[] = JSON.parse(selectedPlacesData)
        const parsedTravelInfo = travelInfoData ? JSON.parse(travelInfoData) : { total_duration: 3 }
        
        console.log("선택된 장소들:", places)
        console.log("여행 정보:", parsedTravelInfo)
        
        // v6.0: 간단한 일정 생성 (실제로는 AI API 호출)
        const generatedItinerary = generateItinerary(places, parsedTravelInfo.total_duration || 3)
        setSelectedPlaces(places)
        setItinerary(generatedItinerary)
        setTravelInfo(parsedTravelInfo)
        
      } catch (error) {
        console.error("일정 데이터 로드 실패:", error)
      } finally {
        setTimeout(() => setIsLoading(false), 2000) // 2초 로딩 시뮬레이션
      }
    }

    loadItineraryData()
  }, [])

  // 간단한 일정 생성 로직 (실제로는 AI API 호출)
  const generateItinerary = (places: Place[], duration: number): ItineraryDay[] => {
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
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })
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
          <Button variant="outline" size="sm">
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

        {/* 지도 뷰 */}
        <TabsContent value="map" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-green-500" />
                {t.itineraryResults.map.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Simple Map 컴포넌트 */}
              <SimpleMap 
                places={selectedPlaces} 
                className="h-96 w-full"
              />
              
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

        {/* 다이어리 뷰 */}
        <TabsContent value="diary" className="space-y-6">
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif">
                <Sparkles className="h-6 w-6 text-amber-500" />
                {t.itineraryResults.diary.title}
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300 font-serif italic">
                {t.itineraryResults.diary.subtitle}
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              {itinerary.map((day, dayIndex) => (
                <div key={dayIndex} className="border-l-2 border-amber-300 pl-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-serif font-bold text-amber-800 dark:text-amber-200">
                      Day {day.day} - {day.theme}
                    </h3>
                    <p className="text-amber-600 dark:text-amber-300 font-serif">
                      {day.date}
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <div className="prose prose-amber dark:prose-invert max-w-none">
                      <p className="font-serif text-lg leading-relaxed">
                        오늘은 {day.theme}의 하루입니다. 
                        {day.places.map((place, index) => (
                          <span key={place.place_id}>
                            {index === 0 && " 먼저 "}
                            {index > 0 && index < day.places.length - 1 && ", 그리고 "}
                            {index === day.places.length - 1 && day.places.length > 1 && ", 마지막으로 "}
                            <strong>{place.name}</strong>
                            {index === day.places.length - 1 && "을(를) 방문합니다."}
                          </span>
                        ))}
                      </p>
                      
                      <div className="bg-amber-100 dark:bg-amber-900/20 p-4 rounded-lg mt-4">
                        <h4 className="font-serif font-semibold text-amber-800 dark:text-amber-200 mb-2">
                          💡 {t.itineraryResults.diary.tip}
                        </h4>
                        <p className="text-amber-700 dark:text-amber-300 font-serif">
                          {day.places.length > 1 
                            ? `${day.places[0].name}과(와) ${day.places[day.places.length - 1].name} 사이의 이동시간을 고려하여 여유롭게 일정을 진행하세요.`
                            : `${day.places[0]?.name}에서 충분한 시간을 보내며 여유로운 여행을 즐기세요.`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-8">
                <div className="bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-800 dark:to-orange-800 rounded-lg p-6">
                  <h3 className="font-serif text-xl font-bold mb-2">✨ 멋진 여행이 되길 바랍니다!</h3>
                  <p className="font-serif text-gray-700 dark:text-gray-300">
                    AI가 추천한 이 일정으로 특별한 추억을 만들어보세요.
                  </p>
            </div>
          </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}