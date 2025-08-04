"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Users, Clock, Sparkles, ArrowRight } from "lucide-react"
import { useLanguageStore } from "@/lib/language-store"
import { useTranslations } from "@/components/language-wrapper"

interface Place {
  place_id: string
  name: string
  rating?: number
  user_ratings_total?: number
  photos?: string[]
  address?: string
  category?: string
  description?: string
  tags?: string[]
  price_level?: number
}

export default function RecommendationsPage() {
  const { language } = useLanguageStore()
  const t = useTranslations()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([])
  const [placesByCategory, setPlacesByCategory] = useState<{
    tourist: Place[]
    food: Place[]
    activity: Place[]
    accommodation: Place[]
  }>({
    tourist: [],
    food: [],
    activity: [],
    accommodation: []
  })

  const categories = [
    { id: "tourist", label: t.recommendations.tabs.tourism, icon: "🏛️" },
    { id: "food", label: t.recommendations.tabs.food, icon: "🍴" },
    { id: "activity", label: t.recommendations.tabs.activity, icon: "🎯" },
    { id: "accommodation", label: t.recommendations.tabs.accommodation, icon: "🏨" }
  ]

  // 더미 데이터 생성 함수
  const generateDummyPlaces = (category: string): Place[] => {
    const baseNames = {
      tourist: ["경복궁", "N서울타워", "부산 해운대", "제주 성산일출봉", "경주 불국사"],
      food: ["명동교자", "광장시장", "부산 국제시장", "제주 흑돼지", "전주 한옥마을"],
      activity: ["한강공원", "롯데월드", "에버랜드", "제주 올레길", "설악산"],
      accommodation: ["신라호텔", "롯데호텔", "파크하야트", "그랜드하야트", "워커힐"]
    }

    return (baseNames[category as keyof typeof baseNames] || []).map((name, index) => ({
      place_id: `${category}_${index}`,
      name,
      rating: 4.2 + Math.random() * 0.8,
      user_ratings_total: Math.floor(Math.random() * 1000) + 100,
      photos: [`https://via.placeholder.com/400x300?text=${encodeURIComponent(name)}`],
      address: `주소 ${index + 1}`,
      category,
      description: `${name}에 대한 설명입니다.`,
      tags: ["인기", "추천", "핫플레이스"],
      price_level: Math.floor(Math.random() * 4) + 1
    }))
  }

  useEffect(() => {
    // 실제 API 데이터 또는 더미 데이터 로드
    const loadPlacesData = () => {
      try {
        // localStorage에서 API 응답 데이터 확인
        const recommendationResults = localStorage.getItem('recommendationResults')
        
        if (recommendationResults) {
          // 실제 API 데이터 사용
          const placesArray = JSON.parse(recommendationResults)
          console.log("API 데이터 로드:", placesArray)
          
          // API 데이터를 카테고리별로 분류
          const categorizedPlaces: {
            tourist: Place[]
            food: Place[]
            activity: Place[]
            accommodation: Place[]
          } = {
            tourist: [],
            food: [],
            activity: [],
            accommodation: []
          }
          
          placesArray.forEach((place: Place) => {
            const category = place.category?.toLowerCase() || 'tourist'
            if (categorizedPlaces[category as keyof typeof categorizedPlaces]) {
              categorizedPlaces[category as keyof typeof categorizedPlaces].push(place)
            } else {
              categorizedPlaces.tourist.push(place)
            }
          })
          
          setPlacesByCategory(categorizedPlaces)
        } else {
          // API 데이터가 없으면 더미 데이터 사용
          console.log("더미 데이터 사용")
          setPlacesByCategory({
            tourist: generateDummyPlaces("tourist"),
            food: generateDummyPlaces("food"),
            activity: generateDummyPlaces("activity"),
            accommodation: generateDummyPlaces("accommodation")
          })
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error("데이터 로드 실패:", error)
        // 에러 발생시 더미 데이터로 폴백
        setPlacesByCategory({
          tourist: generateDummyPlaces("tourist"),
          food: generateDummyPlaces("food"),
          activity: generateDummyPlaces("activity"),
          accommodation: generateDummyPlaces("accommodation")
        })
        setIsLoading(false)
      }
    }

    // 2초 로딩 시뮬레이션 후 데이터 로드
    setTimeout(loadPlacesData, 2000)
  }, [])

  const togglePlaceSelection = (place: Place) => {
    setSelectedPlaces(prev => {
      const isSelected = prev.some(p => p.place_id === place.place_id)
      if (isSelected) {
        return prev.filter(p => p.place_id !== place.place_id)
      } else {
        return [...prev, place]
      }
    })
  }

  const isPlaceSelected = (place: Place) => {
    return selectedPlaces.some(p => p.place_id === place.place_id)
  }

  const handleCreateItinerary = () => {
    if (selectedPlaces.length === 0) {
      alert("최소 1개 이상의 장소를 선택해주세요.")
      return
    }

    // 선택된 장소들과 현재 여행 정보를 저장
    localStorage.setItem('selectedPlacesForItinerary', JSON.stringify(selectedPlaces))
    localStorage.setItem('currentTravelInfo', localStorage.getItem('travelInfo') || '{}')
    
    // 결과 페이지로 이동
    router.push('/itinerary-results')
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
              {t.recommendations.loading}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              AI가 선별한 최고의 장소들을 준비하고 있습니다...
            </p>
          </div>
        </div>
      </div>
    )
  }

  const allPlacesEmpty = Object.values(placesByCategory).every(places => places.length === 0)

  if (allPlacesEmpty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="text-6xl">😅</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t.recommendations.noData}
          </h2>
          <Button onClick={() => router.push('/create-itinerary')} size="lg">
            <ArrowRight className="mr-2 h-5 w-5" />
            {t.recommendations.backToInput}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.recommendations.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.recommendations.subtitle}
          </p>
        </div>

        {/* 선택된 장소 플로팅 바 */}
        {selectedPlaces.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-full shadow-2xl border border-gray-200 dark:border-gray-600 px-6 py-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {selectedPlaces.length}
                </Badge>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t.recommendations.selectedPlaces}
                </span>
              </div>
              <Button 
                onClick={handleCreateItinerary}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {t.recommendations.createItinerary}
              </Button>
            </div>
          </div>
        )}

        {/* 카테고리별 탭 */}
        <Tabs defaultValue="tourist" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-lg py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {placesByCategory[category.id as keyof typeof placesByCategory].map((place) => (
                  <Card 
                    key={place.place_id} 
                    className={`overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
                      isPlaceSelected(place) 
                        ? 'ring-2 ring-blue-500 shadow-lg bg-blue-50 dark:bg-blue-900/20' 
                        : 'hover:shadow-md bg-white dark:bg-gray-800'
                    }`}
                    onClick={() => togglePlaceSelection(place)}
                  >
                    {/* 이미지 */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                      {place.photos && place.photos[0] ? (
                        <img 
                          src={place.photos[0]} 
                          alt={place.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <MapPin className="h-12 w-12" />
                        </div>
                      )}
                      
                      {/* 선택 표시 */}
                      {isPlaceSelected(place) && (
                        <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full p-2">
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                      )}

                      {/* 가격 레벨 */}
                      {place.price_level && (
                        <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
                          {'₩'.repeat(place.price_level)}
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4">
                      {/* 장소명 */}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {place.name}
                      </h3>

                      {/* 주소 */}
                      {place.address && (
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <MapPin className="h-3 w-3" />
                          <span className="line-clamp-1">{place.address}</span>
                        </div>
                      )}

                      {/* 평점 및 리뷰 수 */}
                      {place.rating && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {place.rating.toFixed(1)}
                            </span>
                          </div>
                          {place.user_ratings_total && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Users className="h-3 w-3" />
                              <span>
                                {t.recommendations.reviews} {place.user_ratings_total.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 태그 */}
                      {place.tags && place.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {place.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* 설명 */}
                      {place.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {place.description}
                        </p>
                      )}

                      {/* 선택 버튼 */}
                      <div className="mt-4">
                        <Button 
                          variant={isPlaceSelected(place) ? "default" : "outline"}
                          size="sm"
                          className={`w-full ${
                            isPlaceSelected(place) 
                              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                              : 'border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            togglePlaceSelection(place)
                          }}
                        >
                          {isPlaceSelected(place) ? t.recommendations.selectedButton : t.recommendations.selectButton}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 카테고리별 빈 상태 */}
              {placesByCategory[category.id as keyof typeof placesByCategory].length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {category.label} 정보가 없습니다
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    다른 카테고리를 확인해보세요
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}