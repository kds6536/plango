"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, Users, Check, Heart, Sparkles, Clock } from "lucide-react"
import { useLanguageStore } from "@/lib/language-store"

const translations = {
  ko: {
    title: "✨ 테마별 장소 추천",
    subtitle: "마음에 드는 장소를 선택하여 나만의 여행 일정을 만들어보세요",
    themes: {
      tourist: "관광",
      food: "먹거리", 
      activity: "놀거리",
      accommodation: "숙소"
    },
    selected: "선택됨",
    selectPlace: "장소 선택",
    selectedCount: "개 선택됨",
    createItinerary: "나만의 일정 만들기",
    reviewCount: "리뷰",
    noPlaces: "추천 장소가 없습니다",
    loadingPlaces: "AI가 최적의 장소를 추천하고 있습니다...",
    validationError: "최소 1개 이상의 장소를 선택해주세요!"
  },
  en: {
    title: "✨ Theme-based Place Recommendations",
    subtitle: "Select your favorite places to create your personalized travel itinerary",
    themes: {
      tourist: "Sightseeing",
      food: "Food", 
      activity: "Activities",
      accommodation: "Accommodation"
    },
    selected: "Selected",
    selectPlace: "Select Place",
    selectedCount: "selected",
    createItinerary: "Create My Itinerary",
    reviewCount: "reviews",
    noPlaces: "No recommended places available",
    loadingPlaces: "AI is recommending the best places for you...",
    validationError: "Please select at least one place!"
  }
}

// 임시 더미 데이터 (실제로는 API에서 받아올 예정)
const generateDummyPlaces = (theme: string, count: number = 10) => {
  const placeNames = {
    tourist: ["경복궁", "남산타워", "부산 해운대", "제주 성산일출봉", "경주 불국사", "전주 한옥마을", "설악산 국립공원", "담양 죽녹원", "여수 밤바다", "순천만 국가정원"],
    food: ["명동교자", "광장시장 빈대떡", "부산 자갈치시장", "제주 흑돼지", "전주 비빔밥", "춘천 닭갈비", "안동 찜닭", "대구 동인동 찜갈비", "속초 순대국밥", "강릉 초당순두부"],
    activity: ["롯데월드", "에버랜드", "서울랜드", "제주 한라산", "부산 감천문화마을", "여수 아쿠아플라넷", "강원도 스키장", "경주 월드", "대전 엑스포과학공원", "통영 케이블카"],
    accommodation: ["롯데호텔 서울", "파크하얏트 부산", "제주 신라호텔", "경주 힐튼", "전주 한옥마을 게스트하우스", "강릉 펜션", "여수 리조트", "속초 해변호텔", "대구 호텔", "울산 비즈니스호텔"]
  }

  return Array.from({ length: count }, (_, i) => ({
    place_id: `${theme}_${i + 1}`,
    name: placeNames[theme as keyof typeof placeNames][i] || `${theme} 장소 ${i + 1}`,
    photoUrl: `/placeholder.jpg`,
    rating: (Math.random() * 2 + 3).toFixed(1),
    user_rating_count: Math.floor(Math.random() * 1000) + 100,
    address: `${theme} 주소 ${i + 1}`,
    tags: [`#${theme}`, `#추천`, `#인기`],
    short_description: `${theme} 관련 멋진 장소입니다. 많은 여행객들이 추천하는 곳이에요.`,
    category: theme
  }))
}

export default function RecommendationsPage() {
  const { language } = useLanguageStore()
  const t = translations[language as keyof typeof translations]
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [placesByCategory, setPlacesByCategory] = useState<{
    tourist: any[]
    food: any[]
    activity: any[]
    accommodation: any[]
  }>({
    tourist: [],
    food: [],
    activity: [],
    accommodation: []
  })
  const [selectedPlaces, setSelectedPlaces] = useState<{ [category: string]: any[] }>({})
  const [activeTab, setActiveTab] = useState("tourist")

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
            tourist: any[]
            food: any[]
            activity: any[]
            accommodation: any[]
          } = {
            tourist: [],
            food: [],
            activity: [],
            accommodation: []
          }
          
          placesArray.forEach((place: any) => {
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

  const handlePlaceSelect = (category: string, place: any) => {
    setSelectedPlaces((prev) => {
      const currentCategoryPlaces = prev[category] || []
      const isSelected = currentCategoryPlaces.some(p => p.place_id === place.place_id)
      
      let newCategoryPlaces
      if (isSelected) {
        newCategoryPlaces = currentCategoryPlaces.filter(p => p.place_id !== place.place_id)
      } else {
        newCategoryPlaces = [...currentCategoryPlaces, place]
      }
      
      return { ...prev, [category]: newCategoryPlaces }
    })
  }

  const handleCreateItinerary = async () => {
    try {
      const allSelectedPlaces = Object.values(selectedPlaces).flat()
      if (allSelectedPlaces.length === 0) {
        alert(t.validationError)
        return
      }
      
      console.log("선택된 장소들:", allSelectedPlaces)
      
      // v6.0: 선택된 장소 데이터를 일정 결과 페이지에서 사용할 수 있도록 저장
      localStorage.setItem('selectedPlacesForItinerary', JSON.stringify(allSelectedPlaces))
      
      // 여행 정보도 함께 저장
      const travelInfo = localStorage.getItem('travelInfo')
      if (travelInfo) {
        localStorage.setItem('currentTravelInfo', travelInfo)
      }
      
      router.push('/itinerary-results')
      
    } catch (error) {
      console.error("일정 생성 실패:", error)
      alert("일정 생성 중 오류가 발생했습니다.")
    }
  }

  const getTotalSelectedCount = () => {
    return Object.values(selectedPlaces).reduce((total, places) => total + places.length, 0)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center">
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-blue-500 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t.loadingPlaces}</h2>
        <p className="text-gray-600 dark:text-gray-300">잠시만 기다려주세요...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16 pb-32">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 mb-4">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Theme Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 h-14 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl">
            <TabsTrigger value="tourist" className="text-sm font-semibold rounded-xl data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              🏛️ {t.themes.tourist}
            </TabsTrigger>
            <TabsTrigger value="food" className="text-sm font-semibold rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              🍜 {t.themes.food}
            </TabsTrigger>
            <TabsTrigger value="activity" className="text-sm font-semibold rounded-xl data-[state=active]:bg-green-500 data-[state=active]:text-white">
              🎢 {t.themes.activity}
            </TabsTrigger>
            <TabsTrigger value="accommodation" className="text-sm font-semibold rounded-xl data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              🏨 {t.themes.accommodation}
            </TabsTrigger>
          </TabsList>

          {/* Place Cards for each theme */}
          {Object.entries(placesByCategory).map(([category, places]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {places.map((place, index) => {
                    const isSelected = selectedPlaces[category]?.some(p => p.place_id === place.place_id)
                    return (
                      <div key={place.place_id}>
                        <Card 
                          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 group ${
                            isSelected 
                              ? 'ring-4 ring-blue-500 shadow-2xl transform scale-105' 
                              : 'ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-2 hover:ring-blue-300'
                          }`}
                          onClick={() => handlePlaceSelect(category, place)}
                        >
                          <CardContent className="p-0 relative">
                            {/* 선택 체크 표시 */}
                            {isSelected && (
                              <div className="absolute top-3 right-3 z-10 bg-blue-500 text-white rounded-full p-2 shadow-lg">
                                <Check className="h-4 w-4" />
                              </div>
                            )}
                            
                            {/* 하트 아이콘 */}
                            <div className="absolute top-3 left-3 z-10">
                              <Heart className={`h-5 w-5 transition-colors ${isSelected ? 'text-red-500 fill-red-500' : 'text-white group-hover:text-red-500'}`} />
                            </div>

                            {/* 이미지 */}
                            <div className="relative overflow-hidden rounded-t-lg">
                              <img 
                                src={place.photoUrl || "/placeholder.jpg"} 
                                alt={place.name} 
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>

                            {/* 장소 정보 */}
                            <div className="p-4">
                              <h3 className="font-bold text-lg mb-2 line-clamp-1" title={place.name}>
                                {place.name}
                              </h3>
                              
                              {/* 평점 및 리뷰 */}
                              <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                  <span className="font-semibold text-sm">{place.rating}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 text-sm">
                                  <Users className="h-4 w-4" />
                                  <span>{place.user_rating_count} {t.reviewCount}</span>
                                </div>
                              </div>

                              {/* 주소 */}
                              <div className="flex items-start gap-2 mb-3">
                                <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                  {place.address}
                                </p>
                              </div>

                              {/* 태그 */}
                              <div className="flex flex-wrap gap-1 mb-3">
                                {place.tags?.slice(0, 3).map((tag: string, index: number) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              {/* 설명 */}
                              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                {place.short_description}
                              </p>
                              
                              {/* 선택 버튼 */}
                              <Button
                                className={`w-full mt-4 transition-all duration-300 ${
                                  isSelected 
                                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handlePlaceSelect(category, place)
                                }}
                              >
                                {isSelected ? (
                                  <>
                                    <Check className="h-4 w-4 mr-2" />
                                    {t.selected}
                                  </>
                                ) : (
                                  <>
                                    <Heart className="h-4 w-4 mr-2" />
                                    {t.selectPlace}
                                  </>
                                )}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )
                  })}
              </div>

              {places.length === 0 && (
                <div className="text-center py-16">
                  <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-xl text-gray-500 dark:text-gray-400">{t.noPlaces}</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Floating Action Bar */}
        {getTotalSelectedCount() > 0 && (
          <div className="fixed bottom-6 left-6 right-6 z-50">
            <div className="max-w-md mx-auto">
              <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg shadow-2xl border-none">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{getTotalSelectedCount()}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {getTotalSelectedCount()}{t.selectedCount}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">장소가 선택되었습니다</p>
                      </div>
                    </div>
                    
                    <Button
                      onClick={handleCreateItinerary}
                      className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {t.createItinerary}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
    </div>
  )
}