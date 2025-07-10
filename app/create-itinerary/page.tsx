"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" 
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Minus, Plus, X, Plane, DollarSign } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
import { useLanguageStore } from "@/lib/language-store"
import { useEffect } from "react"

const translations = {
  ko: {
    title: "✈️ 여행 일정 만들기",
    subtitle: "몇 가지 정보만 입력하시면 AI가 완벽한 맞춤형 여행 일정을 생성해드립니다 🎯",
    cardTitle: "🌟 여행 정보 입력",
    destination: "🌍 국가 선택 또는 도시 입력",
    destinationPlaceholder: "예: 일본, 도쿄, 파리, 뉴욕...",
    dateSelection: "📅 여행 날짜 선택",
    dateSelectionPlaceholder: "날짜를 선택하세요",
    travelers: "👥 인원수",
    travelerUnit: "명",
    budget: "💰 가능 예산",
    budgetPlaceholder: "숙박, 식사, 교통, 관광 등 전체 예산을 입력해주세요",
    ageRange: "🎂 연령대 (복수 선택 가능)",
    ageRanges: ["10대이하", "10대", "20대", "30대", "40대", "50대 이상"],
    gender: "👤 성별",
    genderPlaceholder: "성별을 선택하세요",
    genderOptions: { male: "남성", female: "여성", none: "선택 안함" },
    specialRequests: "✨ 특별 요청사항 (선택)",
    specialRequestsPlaceholder: "원하시는 여행 스타일, 특별한 요청사항, 관심사, 피하고 싶은 것들을 자유롭게 작성해주세요.\n예: \n- 힐링이 되는 조용한 여행을 원해요\n- 맛집 투어에 관심이 많아요  \n- 역사적인 장소들을 방문하고 싶어요\n- 높은 곳이나 물을 무서워해요\n- 비건 음식만 먹을 수 있어요\n- 사진 찍기 좋은 장소들로 가고 싶어요",
    specialRequestsDesc: "더 맞춤형 일정을 위해 특별한 요청사항을 알려주세요 (선택사항)",
    generateButton: "🎯 맞춤 여행 일정 생성하기",
    generating: "AI가 최적의 여행 코스를 짜고 있습니다...",
    generatingSubtitle: "잠시만 기다려주세요! 평균적으로 1~2분 정도 소요될 수 있습니다.",
    currencies: {
      KRW: "🇰🇷 원",
      USD: "🇺🇸 달러", 
      EUR: "🇪🇺 유로",
      JPY: "🇯🇵 엔",
      CNY: "🇨🇳 위안",
      GBP: "🇬🇧 파운드"
    }
  },
  en: {
    title: "✈️ Create Itinerary",
    subtitle: "Enter a few details and AI will generate the perfect customized travel itinerary for you 🎯",
    cardTitle: "🌟 Enter Travel Information",
    destination: "🌍 Select Country or Enter City",
    destinationPlaceholder: "e.g. Japan, Tokyo, Paris, New York...",
    dateSelection: "📅 Select Travel Dates",
    dateSelectionPlaceholder: "Select dates",
    travelers: "👥 Number of Travelers",
    travelerUnit: "people",
    budget: "💰 Available Budget",
    budgetPlaceholder: "Enter total budget for accommodation, meals, transportation, sightseeing, etc.",
    ageRange: "🎂 Age Range (Multiple Selection)",
    ageRanges: ["Under 10", "Teens", "20s", "30s", "40s", "50s+"],
    gender: "👤 Gender",
    genderPlaceholder: "Select gender",
    genderOptions: { male: "Male", female: "Female", none: "Prefer not to say" },
    specialRequests: "✨ Special Requests (Optional)",
    specialRequestsPlaceholder: "Feel free to describe your preferred travel style, special requests, interests, or things to avoid.\nExamples:\n- Looking for a relaxing, quiet trip\n- Interested in food tours\n- Want to visit historical sites\n- Afraid of heights or water\n- Can only eat vegan food\n- Want Instagram-worthy photo spots",
    specialRequestsDesc: "Let us know any special requests for a more personalized itinerary (optional)",
    generateButton: "🎯 Generate Custom Travel Itinerary",
    generating: "AI is creating the optimal travel route...",
    generatingSubtitle: "Please wait a moment! This usually takes about 1-2 minutes.",
    currencies: {
      KRW: "🇰🇷 KRW",
      USD: "🇺🇸 USD", 
      EUR: "🇪🇺 EUR",
      JPY: "🇯🇵 JPY",
      CNY: "🇨🇳 CNY",
      GBP: "🇬🇧 GBP"
    }
  },
};

export default function CreateItineraryPage() {
  const { language } = useLanguageStore()
  const t = translations[language as keyof typeof translations]
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false) 
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [travelers, setTravelers] = useState(2)
  const [destinations, setDestinations] = useState<string[]>([])
  const [currentDestination, setCurrentDestination] = useState("")
  const [ageRanges, setAgeRanges] = useState<string[]>([])
  const [budget, setBudget] = useState("")
  const [currency, setCurrency] = useState("KRW")
  const [gender, setGender] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")

  // v3.0: 카테고리별 장소 추천 결과 및 선택 상태 관리
  const [placesByCategory, setPlacesByCategory] = useState<{
    숙소?: any[];
    볼거리?: any[];
    먹거리?: any[];
    즐길거리?: any[];
  }>({});
  const [selectedPlaces, setSelectedPlaces] = useState<{ [category: string]: Set<string> }>({});

  // 카테고리별 장소 선택 토글 함수
  const handlePlaceSelect = (category: string, placeId: string) => {
    setSelectedPlaces((prev) => {
      const prevSet = prev[category] || new Set();
      const newSet = new Set(prevSet);
      if (newSet.has(placeId)) {
        newSet.delete(placeId);
      } else {
        newSet.add(placeId);
      }
      return { ...prev, [category]: newSet };
    });
  };

  const handleGenerateItinerary = async () => {
    // ---- v3.0: AI 브레인스토밍 + Google Places API 연동 구조 ----
    let updatedDestinations = [...destinations];
    if (currentDestination.trim() && !updatedDestinations.includes(currentDestination.trim())) {
      updatedDestinations = [...updatedDestinations, currentDestination.trim()];
      setDestinations(updatedDestinations);
      setCurrentDestination("");
    }
    if (updatedDestinations.length === 0) {
      alert(t.destinationPlaceholder)
      return
    }
    if (!dateRange || !dateRange.from) {
      alert(t.dateSelectionPlaceholder)
      return
    }
    setIsLoading(true)
    try {
      // 1. AI 브레인스토밍: 4개 카테고리별 5개 키워드 요청
      // 실제 API가 준비되지 않았다면 더미 데이터로 대체
      let brainstormResult;
      try {
        const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
        const endpoint = '/api/v1/itinerary/generate-recommendations';
        const url = apiBase.endsWith('/api/v1') ? `${apiBase}/itinerary/generate-recommendations` : `${apiBase}${endpoint}`;
        const aiRes = await axios.post(url, {
          destination: updatedDestinations[0],
          duration: 1, // 예시
          travelers_count: travelers,
          budget_range: 'medium',
          special_requests: specialRequests,
        });
        brainstormResult = aiRes.data; // { 숙소: [키워드], 볼거리: [키워드], ... }
      } catch (e) {
        // 더미 데이터 (테스트용)
        brainstormResult = {
          숙소: ["호텔A", "호텔B", "호텔C", "호텔D", "호텔E"],
          볼거리: ["관광지A", "관광지B", "관광지C", "관광지D", "관광지E"],
          먹거리: ["맛집A", "맛집B", "맛집C", "맛집D", "맛집E"],
          즐길거리: ["체험A", "체험B", "체험C", "체험D", "체험E"]
        };
      }
      // 2. Google Places API: 각 카테고리별 키워드로 실제 장소 정보 확보
      let placesResult;
      try {
        const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
        const endpoint = '/api/v1/places/batch-search';
        const url = apiBase.endsWith('/api/v1') ? `${apiBase}/places/batch-search` : `${apiBase}${endpoint}`;
        const placesRes = await axios.post(url, { brainstormResult });
        placesResult = placesRes.data; // { 숙소: [장소], 볼거리: [장소], ... }
      } catch (e) {
        // 더미 데이터 (테스트용)
        placesResult = {
          숙소: [
            { place_id: "1", displayName: "호텔A", editorialSummary: "럭셔리 호텔", photoUrl: "/placeholder.jpg", address: "제주도" },
            { place_id: "2", displayName: "호텔B", editorialSummary: "가성비 호텔", photoUrl: "/placeholder.jpg", address: "제주도" },
            { place_id: "3", displayName: "호텔C", editorialSummary: "바다 전망", photoUrl: "/placeholder.jpg", address: "제주도" }
          ],
          볼거리: [
            { place_id: "4", displayName: "관광지A", editorialSummary: "유명 관광지", photoUrl: "/placeholder.jpg", address: "제주도" },
            { place_id: "5", displayName: "관광지B", editorialSummary: "자연 경관", photoUrl: "/placeholder.jpg", address: "제주도" }
          ],
          먹거리: [
            { place_id: "6", displayName: "맛집A", editorialSummary: "현지 맛집", photoUrl: "/placeholder.jpg", address: "제주도" },
            { place_id: "7", displayName: "맛집B", editorialSummary: "해산물 전문", photoUrl: "/placeholder.jpg", address: "제주도" }
          ],
          즐길거리: [
            { place_id: "8", displayName: "체험A", editorialSummary: "액티비티", photoUrl: "/placeholder.jpg", address: "제주도" }
          ]
        };
      }
      setPlacesByCategory(placesResult);
    } catch (error) {
      alert("추천 장소를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  const addDestination = () => {
    if (currentDestination.trim() && !destinations.includes(currentDestination.trim())) {
      setDestinations([...destinations, currentDestination.trim()])
      setCurrentDestination("")
    }
  }

  const removeDestination = (index: number) => {
    setDestinations(destinations.filter((_, i) => i !== index))
  }

  const getCurrencyPlaceholder = (currency: string) => {
    const placeholders: { [key: string]: string } = {
      'KRW': '예: 1000000',
      'USD': 'e.g., 1000',
      'EUR': 'z.B. 1000',
      'JPY': '例: 100000',
      'CNY': '例如 5000',
      'GBP': 'e.g. 800'
    }
    return placeholders[currency] || '예: 1000'
  }

  // 버튼 활성화 조건: 필수값만 검사, 특별 요청사항은 무관
  const isDisabled =
    isLoading ||
    destinations.length === 0 ||
    !dateRange || !dateRange.from ||
    !budget ||
    !gender;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        <h2 className="text-white text-2xl font-bold mt-8">{t.generating}</h2>
        <p className="text-white text-lg mt-2">{t.generatingSubtitle}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          {t.title}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      <Card className="w-full max-w-4xl mx-auto shadow-2xl rounded-2xl border-none bg-white dark:bg-gray-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-white">{t.cardTitle}</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-2">
              <Label htmlFor="destination" className="text-lg font-semibold">{t.destination}</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="destination"
                  placeholder={t.destinationPlaceholder}
                  value={currentDestination}
                  onChange={(e) => setCurrentDestination(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addDestination()}
                  className="flex-grow"
                />
                <Button onClick={addDestination} size="icon" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {destinations.map((dest, index) => (
                  <div key={index} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">
                    <span>{dest}</span>
                    <button onClick={() => removeDestination(index)} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-lg font-semibold">{t.dateSelection}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        `${format(dateRange.from, "PPP", { locale: ko })} - ${format(dateRange.to, "PPP", { locale: ko })}`
                      ) : (
                        format(dateRange.from, "PPP", { locale: ko })
                      )
                    ) : (
                      <span>{t.dateSelectionPlaceholder}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    locale={ko}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelers" className="text-lg font-semibold">{t.travelers}</Label>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => setTravelers(Math.max(1, travelers - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-bold w-12 text-center">{travelers} {t.travelerUnit}</span>
                <Button variant="outline" size="icon" onClick={() => setTravelers(travelers + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-lg font-semibold">{t.budget}</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="budget"
                  type="text"
                  placeholder={getCurrencyPlaceholder(currency)}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value.replace(/[^0-9]/g, ''))}
                  className="pl-10"
                />
                 <div className="absolute right-1 top-1/2 -translate-y-1/2">
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-[120px] bg-transparent border-0 shadow-none focus:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.currencies).map(([code, name]) => (
                         <SelectItem key={code} value={code}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                 </div>
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label className="text-lg font-semibold">{t.ageRange}</Label>
              <div className="flex flex-wrap gap-2">
                {t.ageRanges.map((age, index) => (
                  <Button
                    key={index}
                    variant={ageRanges.includes(age) ? "default" : "outline"}
                    onClick={() => {
                      if (ageRanges.includes(age)) {
                        setAgeRanges(ageRanges.filter((r) => r !== age));
                      } else {
                        setAgeRanges([...ageRanges, age]);
                      }
                    }}
                  >
                    {age}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-lg font-semibold">{t.gender}</Label>
              <Select onValueChange={setGender}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder={t.genderPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t.genderOptions.male}</SelectItem>
                  <SelectItem value="female">{t.genderOptions.female}</SelectItem>
                  <SelectItem value="none">{t.genderOptions.none}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="special-requests" className="text-lg font-semibold">{t.specialRequests}</Label>
              <Textarea
                id="special-requests"
                placeholder={t.specialRequestsPlaceholder}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          
          <div className="pt-8 text-center">
            <Button 
              size="lg" 
              className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-lg font-bold"
              onClick={handleGenerateItinerary}
              disabled={isDisabled}
            >
              <Plane className="mr-2 h-5 w-5" />
              {t.generateButton}
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* 일정 생성 버튼 아래에 추천 결과가 있으면 카테고리별 카드 UI 표시 */}
      {Object.keys(placesByCategory).length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">카테고리별 추천 장소 선택</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(placesByCategory).map(([category, places]) => (
              <div key={category} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <h3 className="text-xl font-semibold mb-4">{category}</h3>
                <div className="flex flex-col gap-4">
                  {places && places.length > 0 ? places.map((place: any) => (
                    <label key={place.place_id} className="flex items-center gap-4 p-3 rounded-lg border hover:shadow cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPlaces[category]?.has(place.place_id) || false}
                        onChange={() => handlePlaceSelect(category, place.place_id)}
                        className="accent-blue-600 w-5 h-5"
                      />
                      <img src={place.photoUrl || '/placeholder.jpg'} alt={place.displayName} className="w-16 h-16 object-cover rounded-md" />
                      <div>
                        <div className="font-bold">{place.displayName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">{place.editorialSummary || place.address}</div>
                      </div>
                    </label>
                  )) : <div className="text-gray-400">추천 결과가 없습니다.</div>}
                </div>
              </div>
            ))}
          </div>
          {/* 최종 일정 생성 버튼 */}
          <div className="text-center mt-10">
            <Button
              size="lg"
              className="w-full max-w-md bg-teal-600 hover:bg-teal-700 text-lg font-bold"
              onClick={() => {
                // 선택된 place_id 목록 추출
                const selected = Object.entries(selectedPlaces).flatMap(([category, set]) => Array.from(set || []));
                if (selected.length === 0) {
                  alert('최소 1개 이상의 장소를 선택해주세요!');
                  return;
                }
                // 선택값을 로컬스토리지에 저장
                localStorage.setItem('selectedPlaceIds', JSON.stringify(selected));
                // 결과 페이지로 이동
                router.push('/itinerary-results');
              }}
            >
              최종 일정 생성하기
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
