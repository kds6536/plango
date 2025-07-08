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
import Link from "next/link"

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
  const [error, setError] = useState<string | null>(null)

  const addDestination = () => {
    if (currentDestination.trim() && !destinations.includes(currentDestination.trim())) {
      setDestinations([...destinations, currentDestination.trim()])
      setCurrentDestination("")
    }
  }

  const removeDestination = (index: number) => {
    setDestinations(destinations.filter((_, i) => i !== index))
  }

  const addAgeRange = (age: string) => {
    setAgeRanges([...ageRanges, age])
  }

  const removeAgeRange = (index: number) => {
    setAgeRanges(ageRanges.filter((_, i) => i !== index))
  }

  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      'KRW': '₩',
      'USD': '$',
      'EUR': '€',
      'JPY': '¥',
      'CNY': '¥',
      'GBP': '£'
    }
    return symbols[currency] || currency
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

  // --- API 호출 및 생성 핸들러 ---
  const handleGenerateItinerary = async () => {
    setIsLoading(true)
    setError && setError(null)

    // 1. 입력 데이터 검증
    if (!destinations.length || !dateRange) {
      setError && setError(language === 'ko' ? "여행지와 날짜는 필수 입력 항목입니다." : "Destination and dates are required.");
      setIsLoading(false);
      return;
    }

    // 2. 요청 데이터 구성
    const calculateDuration = (from: Date, to: Date | undefined) => {
      if (!to) return 1;
      const diffInMs = to.getTime() - from.getTime();
      const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
      return diffInDays + 1;
    };
    const getBudgetRange = (budget: string, currency: string) => {
      const budgetNum = parseInt(budget, 10);
      if (isNaN(budgetNum)) return "medium";
      let dailyBudgetKRW = budgetNum;
      if (currency !== 'KRW') {
        const exchangeRates: { [key: string]: number } = {
          'USD': 1300, 'EUR': 1400, 'JPY': 9, 'CNY': 180, 'GBP': 1600
        };
        dailyBudgetKRW = budgetNum * (exchangeRates[currency] || 1300);
      }
      dailyBudgetKRW = dailyBudgetKRW / (calculateDuration(dateRange.from!, dateRange.to) || 1);
      if (dailyBudgetKRW <= 50000) return "low";
      if (dailyBudgetKRW <= 150000) return "medium";
      return "high";
    };
    const extractTravelStyles = (requests: string, ages: string[]) => {
      const styles = [];
      const requestLower = requests.toLowerCase();
      if (requestLower.includes('맛집') || requestLower.includes('음식') || requestLower.includes('미식')) styles.push('gourmet');
      if (requestLower.includes('문화') || requestLower.includes('역사') || requestLower.includes('박물관')) styles.push('cultural');
      if (requestLower.includes('모험') || requestLower.includes('액티비티') || requestLower.includes('체험')) styles.push('adventure');
      if (requestLower.includes('휴양') || requestLower.includes('힐링') || requestLower.includes('조용')) styles.push('relaxation');
      if (requestLower.includes('쇼핑') || requestLower.includes('구매')) styles.push('shopping');
      if (requestLower.includes('자연') || requestLower.includes('산') || requestLower.includes('바다')) styles.push('nature');
      if (ages.includes('20대') || ages.includes('30대')) {
        if (styles.length === 0) styles.push('cultural', 'gourmet');
      }
      return styles.length > 0 ? styles : ['cultural'];
    };
    const requestData = {
      city: destinations[0] || "서울",
      duration: calculateDuration(dateRange.from!, dateRange.to),
      special_requests: [
        specialRequests || "특별한 요청 없음",
        `연령대: ${ageRanges.join(', ')}`,
        `성별: ${gender || '선택 안함'}`,
        `예산: ${getCurrencySymbol ? getCurrencySymbol(currency) : currency}${budget}`
      ].join(', '),
      travel_style: extractTravelStyles(specialRequests || "", ageRanges),
      budget_range: getBudgetRange(budget, currency),
      travelers_count: travelers
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL + '/itinerary/generate' : 'https://plango-api-production.up.railway.app/api/v1/itinerary/generate'}`,
        requestData
      );
      if (response.data) {
        localStorage.setItem('itineraryResult', JSON.stringify(response.data));
        router.push('/itinerary-results');
      } else {
        throw new Error(language === 'ko' ? "API로부터 유효한 응답을 받지 못했습니다." : "Did not receive a valid response from the API.");
      }
    } catch (err: any) {
      console.error("여행 생성 실패:", err);
      setError && setError(err.response?.data?.detail || err.message || (language === 'ko' ? "알 수 없는 오류가 발생했습니다." : "An unknown error occurred."));
    } finally {
      setIsLoading(false);
    }
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

    <div className="min-h-screen bg-background text-foreground py-8 lg:py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-white transform rotate-45" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Plan Go
            </span>
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {t.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t.subtitle}
          </p>
        </div>

        <Card className="shadow-lg border border-border bg-card">
          <CardHeader className="bg-gradient-to-r from-green-500/80 to-blue-500/80 text-white rounded-t-lg">
              <CardTitle className="text-xl lg:text-2xl text-center font-medium">{t.cardTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-6 lg:p-8">
            <div className="space-y-4">
              <Label htmlFor="destination" className="text-base font-medium text-foreground flex items-center gap-2">
                  {t.destination}
              </Label>
              <div className="flex space-x-3">
                <Input
                  id="destination"
                    placeholder={t.destinationPlaceholder}
                  className="flex-1 h-11 bg-background border-input text-foreground placeholder:text-muted-foreground"
                  value={currentDestination}
                  onChange={(e) => setCurrentDestination(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addDestination()}
                />
                <Button 
                  onClick={addDestination} 
                  className="bg-green-600/90 hover:bg-green-600 text-white px-4 h-11"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {destinations.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {destinations.map((dest, index) => (
                    <div
                      key={index}
                      className="bg-green-100/80 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-3 py-2 rounded-lg flex items-center space-x-2 border border-green-200 dark:border-green-800"
                    >
                      <span className="text-sm font-medium">{dest}</span>
                      <button 
                        onClick={() => removeDestination(index)} 
                        className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium text-foreground flex items-center gap-2">
                  {t.dateSelection}
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal h-12 bg-background border-input hover:bg-muted/50"
                  >
                    <CalendarIcon className="mr-3 h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">
                      {dateRange?.from ? (
                        dateRange?.to ? (
                          <>
                            {format(dateRange.from, "PPP", { locale: ko })} -{" "}
                            {format(dateRange.to, "PPP", { locale: ko })}
                          </>
                        ) : (
                          format(dateRange.from, "PPP", { locale: ko })
                        )
                      ) : (
                          t.dateSelectionPlaceholder
                      )}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                  <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium text-foreground flex items-center gap-2">
                  {t.travelers}
              </Label>
              <div className="flex items-center justify-center space-x-8 bg-muted/30 rounded-xl p-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="h-12 w-12 border-input hover:bg-muted/50"
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <div className="text-center">
                  <span className="text-3xl font-bold text-foreground">{travelers}</span>
                    <p className="text-sm text-muted-foreground mt-1">{t.travelerUnit}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setTravelers(travelers + 1)} 
                  className="h-12 w-12 border-input hover:bg-muted/50"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium text-foreground flex items-center gap-2">
                  {t.budget}
              </Label>
              <div className="space-y-3">
                <div className="flex space-x-3">
                  <div className="relative flex-1">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground font-medium">
                      {getCurrencySymbol(currency)}
                    </div>
                    <Input
                      placeholder={getCurrencyPlaceholder(currency)}
                      className="pl-12 h-12 bg-background border-input text-foreground placeholder:text-muted-foreground"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-32 h-12 bg-background border-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                        <SelectItem value="KRW">{t.currencies.KRW}</SelectItem>
                        <SelectItem value="USD">{t.currencies.USD}</SelectItem>
                        <SelectItem value="EUR">{t.currencies.EUR}</SelectItem>
                        <SelectItem value="JPY">{t.currencies.JPY}</SelectItem>
                        <SelectItem value="CNY">{t.currencies.CNY}</SelectItem>
                        <SelectItem value="GBP">{t.currencies.GBP}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {t.budgetPlaceholder}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium text-foreground flex items-center gap-2">
                  {t.ageRange}
              </Label>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {t.ageRanges.map((age, index) => (
                  <Button
                    key={age}
                    variant={ageRanges.includes(age) ? "default" : "outline"}
                    onClick={() => {
                      if (ageRanges.includes(age)) {
                        removeAgeRange(ageRanges.indexOf(age))
                      } else {
                        addAgeRange(age)
                      }
                    }}
                    className={`h-11 transition-all ${
                      ageRanges.includes(age) 
                        ? "bg-blue-600/90 hover:bg-blue-600 text-white" 
                        : "border-input hover:bg-muted/50"
                    }`}
                  >
                    {age}
                  </Button>
                ))}
              </div>
              {ageRanges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {ageRanges.map((age, index) => (
                    <div
                      key={index}
                      className="bg-blue-100/80 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg flex items-center space-x-2 border border-blue-200 dark:border-blue-800"
                    >
                      <span className="text-sm font-medium">{age}</span>
                      <button 
                        onClick={() => removeAgeRange(index)} 
                        className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium text-foreground flex items-center gap-2">
                  {t.gender}
              </Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="h-12 bg-background border-input">
                    <SelectValue placeholder={t.genderPlaceholder} />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                    <SelectItem value="male">{t.genderOptions.male}</SelectItem>
                    <SelectItem value="female">{t.genderOptions.female}</SelectItem>
                    <SelectItem value="none">{t.genderOptions.none}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label htmlFor="specialRequests" className="text-base font-medium text-foreground flex items-center gap-2">
                  {t.specialRequests}
              </Label>
              <Textarea
                id="specialRequests"
                  placeholder={t.specialRequestsPlaceholder}
                className="min-h-[120px] bg-background border-input text-foreground placeholder:text-muted-foreground resize-none"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
              <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.specialRequestsDesc}
              </p>
            </div>

            <div className="pt-4">
              <Button 
                  className="w-full bg-gradient-to-r from-green-600/90 to-blue-600/90 hover:from-green-600 hover:to-blue-600 text-white text-lg font-medium py-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
                  onClick={handleGenerateItinerary}
                disabled={isLoading}
                >
                  {t.generateButton}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  )
}
