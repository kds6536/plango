"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Minus, Plus, X, Plane, DollarSign } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import Link from "next/link"
import { useTranslations } from "@/components/language-wrapper"
import { DayPicker } from "react-day-picker"
import type { DateRange } from "react-day-picker"

export default function CreateItineraryPage() {
  const t = useTranslations()
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [travelers, setTravelers] = useState(2)
  const [destinations, setDestinations] = useState<string[]>([])
  const [currentDestination, setCurrentDestination] = useState("")
  const [ageRanges, setAgeRanges] = useState<string[]>([])
  const [budget, setBudget] = useState("")

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-white transform rotate-45" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Plan Go
            </span>
          </Link>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            ✈️ 여행 일정 만들기
          </h1>
          <p className="text-xl text-gray-600">
            몇 가지 정보만 입력하시면 AI가 완벽한 맞춤형 여행 일정을 생성해드립니다 🎯
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">🌟 여행 정보 입력</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="space-y-4">
              <Label htmlFor="destination" className="text-lg font-semibold">
                🌍 국가 선택 또는 도시 입력
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="destination"
                  placeholder="예: 일본, 도쿄, 파리, 뉴욕..."
                  className="flex-1"
                  value={currentDestination}
                  onChange={(e) => setCurrentDestination(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addDestination()}
                />
                <Button onClick={addDestination} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {destinations.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {destinations.map((dest, index) => (
                    <div
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center space-x-2"
                    >
                      <span>{dest}</span>
                      <button onClick={() => removeDestination(index)} className="hover:text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">📅 여행 날짜 선택</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal h-12">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    {dateRange && dateRange.from ? (
                      dateRange.to ? (
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
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">👥 인원수</Label>
              <div className="flex items-center justify-center space-x-6 bg-gray-50 rounded-lg p-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="h-12 w-12"
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <span className="text-3xl font-bold w-16 text-center">{travelers}명</span>
                <Button variant="outline" size="icon" onClick={() => setTravelers(travelers + 1)} className="h-12 w-12">
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">💰 가능 예산</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="예: 100만원, $2000, ¥200000..."
                  className="pl-10 h-12"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
              <p className="text-sm text-gray-500">숙박, 식사, 교통, 관광 등 전체 예산을 입력해주세요</p>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">🎂 연령대 (복수 선택 가능)</Label>
              <div className="grid grid-cols-2 gap-3">
                {["10대", "20대", "30대", "40대", "50대 이상"].map((age) => (
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
                    className="h-12"
                  >
                    {age}
                  </Button>
                ))}
              </div>
              {ageRanges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {ageRanges.map((age, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center space-x-2"
                    >
                      <span>{age}</span>
                      <button onClick={() => removeAgeRange(index)} className="hover:text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">👤 성별</Label>
              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="성별을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">남</SelectItem>
                  <SelectItem value="female">여</SelectItem>
                  <SelectItem value="none">선택 안함</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Link href="/itinerary-results" className="block">
              <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-xl py-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                🎯 맞춤 여행 일정 생성하기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
