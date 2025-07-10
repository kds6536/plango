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
import { motion, AnimatePresence } from "framer-motion"

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
    specialRequests: "✨ 특별 요청사항",
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
    specialRequests: "✨ Special Requests",
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
  const [countries, setCountries] = useState<string[]>([])
  const [currentCountry, setCurrentCountry] = useState("")
  const [cities, setCities] = useState<string[]>([])
  const [currentCity, setCurrentCity] = useState("")
  const [ageRanges, setAgeRanges] = useState<string[]>([])
  const [budget, setBudget] = useState("")
  const [currency, setCurrency] = useState("KRW")
  const [gender, setGender] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")

  const isFormValid =
    countries.length > 0 &&
    cities.length > 0 &&
    !!dateRange?.from &&
    !!dateRange?.to &&
    travelers > 0 &&
    budget.trim() !== "" &&
    ageRanges.length > 0 &&
    gender !== "" &&
    specialRequests.trim() !== "";

  const [placesByCategory, setPlacesByCategory] = useState<{
    숙소?: any[];
    볼거리?: any[];
    먹거리?: any[];
    즐길거리?: any[];
  }>({});
  const [selectedPlaces, setSelectedPlaces] = useState<{ [category: string]: Set<string> }>({});

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
    if (!isFormValid) return;

    setIsLoading(true)
    try {
      let brainstormResult;
      try {
        const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
        const endpoint = '/api/v1/itinerary/generate';
        const url = apiBase.endsWith('/api/v1') ? `${apiBase}/itinerary/generate` : `${apiBase}${endpoint}`;
        const aiRes = await axios.post(url, {
          destination: cities[0] || countries[0],
          duration: dateRange?.to && dateRange.from ? (dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 3600 * 24) + 1 : 1,
          travelers_count: travelers,
          budget_range: budget,
          special_requests: specialRequests,
        });
        brainstormResult = aiRes.data;
      } catch (e) {
        brainstormResult = {
          숙소: ["호텔A", "호텔B", "호텔C", "호텔D", "호텔E"],
          볼거리: ["관광지A", "관광지B", "관광지C", "관광지D", "관광지E"],
          먹거리: ["맛집A", "맛집B", "맛집C", "맛집D", "맛집E"],
          즐길거리: ["체험A", "체험B", "체험C", "체험D", "체험E"]
        };
      }
      
      let placesResult;
      try {
        const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
        const endpoint = '/api/v1/places/batch-search';
        const url = apiBase.endsWith('/api/v1') ? `${apiBase}/places/batch-search` : `${apiBase}${endpoint}`;
        const placesRes = await axios.post(url, { brainstormResult });
        placesResult = placesRes.data;
      } catch (e) {
        placesResult = {
          숙소: [
            { place_id: "1", displayName: "호텔A", editorialSummary: "럭셔리 호텔", photoUrl: "/placeholder.jpg", address: "제주도" },
            { place_id: "2", displayName: "호텔B", editorialSummary: "가성비 호텔", photoUrl: "/placeholder.jpg", address: "제주도" },
          ],
          볼거리: [
            { place_id: "4", displayName: "관광지A", editorialSummary: "유명 관광지", photoUrl: "/placeholder.jpg", address: "제주도" },
          ],
          먹거리: [
            { place_id: "6", displayName: "맛집A", editorialSummary: "현지 맛집", photoUrl: "/placeholder.jpg", address: "제주도" },
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

  const addCountry = () => {
    if (currentCountry.trim() && !countries.includes(currentCountry.trim())) {
      setCountries([...countries, currentCountry.trim()])
      setCurrentCountry("")
    }
  }
  const addCity = () => {
    if (currentCity.trim() && !cities.includes(currentCity.trim())) {
      setCities([...cities, currentCity.trim()])
      setCurrentCity("")
    }
  }
  const removeCountry = (index: number) => {
    setCountries(countries.filter((_, i) => i !== index))
  }
  const removeCity = (index: number) => {
    setCities(cities.filter((_, i) => i !== index))
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
              <Label htmlFor="country" className="text-lg font-semibold">국가 입력</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="country"
                  placeholder="예: 한국, 일본, 프랑스..."
                  value={currentCountry}
                  onChange={(e) => setCurrentCountry(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') addCountry()
                  }}
                  onBlur={addCountry}
                  className="flex-grow"
                />
                <Button onClick={addCountry} size="icon" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <AnimatePresence>
                  {countries.map((country, index) => (
                    <motion.div
                      key={country}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1 bg-blue-100 dark:bg-blue-700 rounded-full px-3 py-1 text-sm shadow"
                    >
                      <span>{country}</span>
                      <button onClick={() => removeCountry(index)} className="text-blue-500 hover:text-blue-800 dark:text-blue-200 dark:hover:text-white">
                        <X className="h-3 w-3" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-lg font-semibold">도시 입력</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="city"
                  placeholder="예: 도쿄, 파리, 뉴욕..."
                  value={currentCity}
                  onChange={(e) => setCurrentCity(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') addCity()
                  }}
                  onBlur={addCity}
                  className="flex-grow"
                />
                <Button onClick={addCity} size="icon" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <AnimatePresence>
                  {cities.map((city, index) => (
                    <motion.div
                      key={city}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1 bg-teal-100 dark:bg-teal-700 rounded-full px-3 py-1 text-sm shadow"
                    >
                      <span>{city}</span>
                      <button onClick={() => removeCity(index)} className="text-teal-500 hover:text-teal-800 dark:text-teal-200 dark:hover:text-white">
                        <X className="h-3 w-3" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-lg font-semibold">여행 기간</Label>
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
              <Select onValueChange={setGender} value={gender}>
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
                className="min-h-[120px]"
              />
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="w-full max-w-md mx-auto text-lg font-bold shadow-lg transition-all duration-300 ease-in-out hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
              onClick={handleGenerateItinerary}
              disabled={!isFormValid}
            >
              <Plane className="mr-2 h-5 w-5" />
              {t.generateButton}
            </Button>
          </div>
        </CardContent>
      </Card>

      {Object.keys(placesByCategory).length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">AI 추천 장소 목록</h2>
          <div className="space-y-12">
            {Object.entries(placesByCategory).map(([category, places]) => (
              <div key={category}>
                <h3 className="text-2xl font-semibold mb-4">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(places as any[]).map((place) => (
                    <Card key={place.place_id} className="overflow-hidden">
                      <img src={place.photoUrl || "/placeholder.jpg"} alt={place.displayName} className="w-full h-48 object-cover" />
                      <CardHeader>
                        <CardTitle>{place.displayName}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{place.editorialSummary}</p>
                        <p className="text-xs text-gray-500 mt-2">{place.address}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-yellow-500">별점: {place.rating || 'N/A'}</span>
                          <Button 
                            variant={selectedPlaces[category]?.has(place.place_id) ? 'default' : 'outline'}
                            onClick={() => handlePlaceSelect(category, place.place_id)}
                          >
                            {selectedPlaces[category]?.has(place.place_id) ? '선택됨' : '선택'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}