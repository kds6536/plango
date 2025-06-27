"use client"

import { useState } from "react"
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
import Link from "next/link"

export default function CreateItineraryPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [travelers, setTravelers] = useState(2)
  const [destinations, setDestinations] = useState<string[]>([])
  const [currentDestination, setCurrentDestination] = useState("")
  const [ageRanges, setAgeRanges] = useState<string[]>([])
  const [budget, setBudget] = useState("")
  const [currency, setCurrency] = useState("KRW")
  const [gender, setGender] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")

  const addDestination = () => {
    if (currentDestination.trim() && !destinations.includes(currentDestination.trim())) {
      setDestinations([...destinations, currentDestination.trim()])
      setCurrentDestination("")
    }
  }

  const removeDestination = (index: number) => {
    setDestinations(destinations.filter((_, i) => i !== index))
  }

  const addAgeRange = (ageRange: string) => {
    if (!ageRanges.includes(ageRange)) {
      setAgeRanges([...ageRanges, ageRange])
    }
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
      'KRW': '예: 100만원, 2000000',
      'USD': '예: $2000, 5000',
      'EUR': '예: €1800, 4500',
      'JPY': '예: ¥200000, 500000',
      'CNY': '예: ¥12000, 30000',
      'GBP': '예: £1500, 3800'
    }
    return placeholders[currency] || '예: 1000'
  }

  return (
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
            ✈️ 여행 일정 만들기
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            몇 가지 정보만 입력하시면 AI가 완벽한 맞춤형 여행 일정을 생성해드립니다 🎯
          </p>
        </div>

        <Card className="shadow-lg border border-border bg-card">
          <CardHeader className="bg-gradient-to-r from-green-500/80 to-blue-500/80 text-white rounded-t-lg">
            <CardTitle className="text-xl lg:text-2xl text-center font-medium">🌟 여행 정보 입력</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-6 lg:p-8">
            <div className="space-y-4">
              <Label htmlFor="destination" className="text-base font-medium text-foreground flex items-center gap-2">
                🌍 국가 선택 또는 도시 입력
              </Label>
              <div className="flex space-x-3">
                <Input
                  id="destination"
                  placeholder="예: 일본, 도쿄, 파리, 뉴욕..."
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
                📅 여행 날짜 선택
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
                        "날짜를 선택하세요"
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
                👥 인원수
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
                  <p className="text-sm text-muted-foreground mt-1">명</p>
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
                💰 가능 예산
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
                      <SelectItem value="KRW">🇰🇷 원</SelectItem>
                      <SelectItem value="USD">🇺🇸 달러</SelectItem>
                      <SelectItem value="EUR">🇪🇺 유로</SelectItem>
                      <SelectItem value="JPY">🇯🇵 엔</SelectItem>
                      <SelectItem value="CNY">🇨🇳 위안</SelectItem>
                      <SelectItem value="GBP">🇬🇧 파운드</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  숙박, 식사, 교통, 관광 등 전체 예산을 입력해주세요
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium text-foreground flex items-center gap-2">
                🎂 연령대 (복수 선택 가능)
              </Label>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {["10대이하", "10대", "20대", "30대", "40대", "50대 이상"].map((age) => (
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
                👤 성별
              </Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="h-12 bg-background border-input">
                  <SelectValue placeholder="성별을 선택하세요" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="male">남성</SelectItem>
                  <SelectItem value="female">여성</SelectItem>
                  <SelectItem value="none">선택 안함</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label htmlFor="specialRequests" className="text-base font-medium text-foreground flex items-center gap-2">
                ✨ 특별 요청사항 (선택)
              </Label>
              <Textarea
                id="specialRequests"
                placeholder="원하시는 여행 스타일, 특별한 요청사항, 관심사, 피하고 싶은 것들을 자유롭게 작성해주세요.
예: 
- 힐링이 되는 조용한 여행을 원해요
- 맛집 투어에 관심이 많아요  
- 역사적인 장소들을 방문하고 싶어요
- 높은 곳이나 물을 무서워해요
- 비건 음식만 먹을 수 있어요
- 사진 찍기 좋은 장소들로 가고 싶어요"
                className="min-h-[120px] bg-background border-input text-foreground placeholder:text-muted-foreground resize-none"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
              <p className="text-sm text-muted-foreground leading-relaxed">
                더 맞춤형 일정을 위해 특별한 요청사항을 알려주세요 (선택사항)
              </p>
            </div>

            <div className="pt-4">
              <Link href="/itinerary-results" className="block">
                <Button className="w-full bg-gradient-to-r from-green-600/90 to-blue-600/90 hover:from-green-600 hover:to-blue-600 text-white text-lg font-medium py-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                  🎯 맞춤 여행 일정 생성하기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
