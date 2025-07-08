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

  const handleGenerateItinerary = async () => {
    // ---- 개선된 로직 시작 ----
    let updatedDestinations = [...destinations];
    // 현재 입력 필드에 텍스트가 있고, 목록에 중복되지 않은 경우
    if (currentDestination.trim() && !updatedDestinations.includes(currentDestination.trim())) {
      updatedDestinations = [...updatedDestinations, currentDestination.trim()];
      // 상태를 업데이트하여 UI에도 반영하고, 입력 필드를 비웁니다.
      setDestinations(updatedDestinations);
      setCurrentDestination("");
    }
    // ---- 개선된 로직 끝 ----

    if (updatedDestinations.length === 0) { // 수정된 목록으로 유효성 검사
      alert(t.destinationPlaceholder)
      return
    }
    if (!dateRange || !dateRange.from) {
      alert(t.dateSelectionPlaceholder)
      return
    }

    setIsLoading(true)

    // --- 백엔드 스키마에 맞게 요청 데이터 가공 ---
    const calculateDuration = (from: Date, to: Date | undefined) => {
      if (!to) return 1;
      const diffInMs = to.getTime() - from.getTime();
      const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
      return diffInDays + 1;
    };

    const getBudgetRange = (budget: string, currency: string) => {
      const budgetNum = parseInt(budget, 10);
      if (isNaN(budgetNum)) return "medium";

      // KRW 기준으로 일일 예산 계산 (대략적인 값)
      const dailyBudgetKRW = currency !== 'KRW' 
        ? budgetNum * 1300 // 달러 등 외화로 가정
        : budgetNum / (calculateDuration(dateRange.from!, dateRange.to) || 1);
      
      if (dailyBudgetKRW <= 50000) return "low";
      if (dailyBudgetKRW <= 150000) return "medium";
      return "high";
    }

    // 여행 스타일 키워드 (Enum과 유사하게)
    const travelStyles = ["adventure", "relaxation", "cultural", "gourmet", "shopping", "nature"];
    const foundStyles = travelStyles.filter(style => specialRequests.toLowerCase().includes(style));


    const requestBody = {
      destination: updatedDestinations[0], // 첫 번째 목적지를 대표로 설정
      city: updatedDestinations[0],
      duration: calculateDuration(dateRange.from, dateRange.to),
      travelers_count: travelers,
      budget_range: getBudgetRange(budget, currency),
      accommodation_preference: "호텔", // 임시 기본값
      travel_style: foundStyles,
      special_interests: ageRanges,
      special_requests: specialRequests,
    };

    try {
      // 환경변수에 /api/v1가 포함되어 있을 수도 있으므로, 중복되지 않게 안전하게 조합
      const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
      const endpoint = '/api/v1/itinerary/generate';
      const url = apiBase.endsWith('/api/v1') ? `${apiBase}/itinerary/generate` : `${apiBase}${endpoint}`;
      const response = await axios.post(url, requestBody);
      
      localStorage.setItem('itineraryResult', JSON.stringify(response.data))
      
      router.push('/itinerary-results')

    } catch (error) {
      console.error("Error generating itinerary:", error)
      if (axios.isAxiosError(error) && error.response) {
        alert(`여행 생성 실패: ${error.response.data.detail || "알 수 없는 오류가 발생했습니다."}`)
      } else {
        alert("여행 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
      }
    } finally {
      setIsLoading(false)
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
              disabled={isLoading}
            >
              <Plane className="mr-2 h-5 w-5" />
              {t.generateButton}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
