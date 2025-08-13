"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" 
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Sparkles, Plane, Plus, X, Calendar } from "lucide-react"
import { useLanguageStore } from "@/lib/language-store"
import { useTranslations } from "@/components/language-wrapper"
import { Destination, ItineraryRequest } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface LocalDestination {
  id: string
  country: string
  city: string
  startDate: string
  endDate: string
}

export default function CreateItineraryPage() {
  const { language } = useLanguageStore()
  const t = useTranslations()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false) 
  const [apiError, setApiError] = useState<string | null>(null)
  const [destinations, setDestinations] = useState<LocalDestination[]>([
    {
      id: Date.now().toString(),
      country: "",
      city: "",
      startDate: "",
      endDate: ""
    }
  ])

  // AMBIGUOUS 응답 처리 상태
  const [isAmbiguousOpen, setIsAmbiguousOpen] = useState(false)
  // { display_name, request_body } 형태로 정규화해 저장
  const [ambiguousOptions, setAmbiguousOptions] = useState<Array<{ display_name: string; request_body: any }>>([])
  // AMBIGUOUS 선택 처리 중 중복 호출 방지
  const [isResolvingAmbiguity, setIsResolvingAmbiguity] = useState(false)

  const isFormValid = destinations.every(dest => 
    dest.country.trim() !== "" && 
    dest.city.trim() !== "" && 
    dest.startDate !== "" && 
    dest.endDate !== ""
  )

  const updateDestination = (id: string, field: keyof LocalDestination, value: string) => {
    setDestinations(prev => prev.map(dest => 
      dest.id === id ? { ...dest, [field]: value } : dest
    ))
  }

  const addDestination = () => {
    setDestinations(prev => [...prev, {
      id: Date.now().toString(),
      country: "",
      city: "",
      startDate: "",
      endDate: ""
    }])
  }

  const removeDestination = (id: string) => {
    if (destinations.length > 1) {
      setDestinations(prev => prev.filter(dest => dest.id !== id))
    }
  }

  const calculateTotalDuration = () => {
    if (!destinations.length || !destinations[0].startDate || !destinations[destinations.length - 1].endDate) {
      return 0
    }
    const start = new Date(destinations[0].startDate)
    const end = new Date(destinations[destinations.length - 1].endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const convertToPlaceRecommendationRequest = () => {
    // v6.0: 첫 번째 목적지만 사용 (단순화)
    const firstDestination = destinations[0]
    
    return {
      country: firstDestination.country,
      city: firstDestination.city,
      total_duration: calculateTotalDuration(),
      travelers_count: 2, // 기본값
      budget_range: "medium", // v6.0에 맞는 형식
      travel_style: ["문화", "액티비티"], // 기본 여행 스타일
      special_requests: "다양한 명소와 맛집을 포함해주세요",
      language_code: language || 'ko'
    }
  }

  // 날짜 입력 언어/플레이스홀더
  const dateInputLangMap: Record<string, string> = {
    ko: 'ko-KR', en: 'en-US', ja: 'ja-JP', zh: 'zh-CN', vi: 'vi-VN', id: 'id-ID'
  }
  const inputLang = dateInputLangMap[language] || 'en-US'
  const datePlaceholderMap: Record<string, string> = {
    ko: '연도-월-일', en: 'YYYY-MM-DD', ja: 'YYYY-MM-DD', zh: 'YYYY-MM-DD', vi: 'YYYY-MM-DD', id: 'YYYY-MM-DD'
  }
  const datePlaceholder = datePlaceholderMap[language] || 'YYYY-MM-DD'

  // 단일 책임: payload로만 API 호출/해석 (명확한 상태 분기)
  const fetchRecommendations = async (payload: any) => {
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '')
    const endpoint = '/api/v1/place-recommendations/generate'
    const url = apiBase.endsWith('/api/v1') ? `${apiBase}/place-recommendations/generate` : `${apiBase}${endpoint}`
    const response = await axios.post(url, payload, { headers: { 'Content-Type': 'application/json' }, timeout: 30000 })

    const status = (response?.data?.status || '').toUpperCase()

    if (status === 'AMBIGUOUS') {
      const raw = Array.isArray(response.data?.options) ? response.data.options : []
      const normalized = raw.filter(Boolean).map((opt: any) => {
        if (typeof opt === 'string') return { display_name: opt, request_body: { ...payload, city: opt } }
        const label = opt?.display_name || opt?.formatted_address || opt?.city || opt?.name || 'Option'
        const rb = (opt && typeof opt.request_body === 'object') ? opt.request_body : {}
        return { display_name: label, request_body: { ...payload, ...rb } }
      })
      setAmbiguousOptions(normalized)
      setIsAmbiguousOpen(true)
      return { status: 'AMBIGUOUS' as const }
    }

    // SUCCESS 또는 status 누락(성공) 처리: 모달/옵션 정리 후 진행
    setAmbiguousOptions([])
    setIsAmbiguousOpen(false)
    return { status: 'SUCCESS' as const, response }
  }

  const handleGenerateItinerary = async () => {
    if (!isFormValid) {
      alert(t.createItinerary.validationError)
      return
    }

    setIsLoading(true)
    setApiError(null) // 이전 에러 상태 초기화

    try {
      // v6.0: 새로운 장소 추천 API 사용
      const requestBody = convertToPlaceRecommendationRequest()

      const apiBaseForLog = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '')
      console.log("Request URL:", `${apiBaseForLog}/api/v1/place-recommendations/generate`)
      console.log("Request Body:", JSON.stringify(requestBody, null, 2))

      // v6.0 장소 추천 API 호출 (명확한 상태 분기)
      const result = await fetchRecommendations(requestBody)
      if (result.status === 'AMBIGUOUS') {
        setIsLoading(false)
        return
      }

      // HTTP 상태 코드 확인
      const response = result.response
      if (!response || response.status !== 200) {
        throw new Error(`서버 응답 오류: ${response?.status || 'Unknown'} ${response?.statusText || ''}`)
      }

      if (response.data && response.data.success && response.data.recommendations) {
        // 성공: v6.0 응답 구조에 맞게 데이터 처리
        console.log("✅ v6.0 API 성공:", response.data)
        
        // v6.0 응답을 그대로 저장 (다국어 카테고리 키 유지)
        const placesData = response.data.recommendations
        
        localStorage.setItem('recommendationResults', JSON.stringify(placesData))
        localStorage.setItem('travelInfo', JSON.stringify(requestBody))
        router.push('/recommendations')
      } else {
        throw new Error("추천 장소 데이터를 받지 못했습니다.")
      }

    } catch (error: any) {
      // 상세한 에러 로깅 (개발자용)
      console.error("❌ API Error Details:", {
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
      let userErrorMessage = "장소를 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요."
      
      if (error.code === 'ECONNABORTED') {
        userErrorMessage = "서버 응답 시간이 초과되었습니다. 네트워크 상태를 확인해 주세요."
      } else if (error.response?.status === 422) {
        userErrorMessage = "입력하신 여행 정보에 문제가 있습니다. 다시 확인해 주세요."
      } else if (error.response?.status === 500) {
        userErrorMessage = "서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
      } else if (!navigator.onLine) {
        userErrorMessage = "인터넷 연결을 확인해 주세요."
      }
      
      setApiError(userErrorMessage)
      
    } finally {
      setIsLoading(false)
    }
  }

  // 도우미: 옵션 표시 텍스트 추출
  const getOptionLabel = (opt: any): string => (typeof opt === 'string' ? opt : (opt?.display_name || '선택지'))

  // 도우미: 옵션으로부터 다음 요청 바디 구성
  const buildRequestBodyFromOption = (opt: any): any => {
    const baseRequest = convertToPlaceRecommendationRequest()
    if (typeof opt === 'string') {
      return { ...baseRequest, city: opt }
    }
    if (opt && typeof opt.request_body === 'object') {
      return { ...baseRequest, ...opt.request_body }
    }
    if (opt && opt.display_name) {
      return { ...baseRequest, city: opt.display_name }
    }
    return { ...baseRequest, city: opt }
  }

  // AMBIGUOUS 모달에서 옵션 선택 시 재호출
  const handleSelectAmbiguousOption = async (option: any) => {
    console.log("🚀 [AMBIGUOUS_SELECT] 옵션 선택 시작:", option)
    
    if (isResolvingAmbiguity) {
      console.log("⚠️ [AMBIGUOUS_SELECT] 이미 처리 중이므로 무시")
      return
    }
    
    setIsResolvingAmbiguity(true)
    console.log("🔄 [AMBIGUOUS_SELECT] 상태 초기화 시작")
    
    // 이전 AMBIGUOUS 상태를 즉시 초기화하여 반복 표시 방지
    setAmbiguousOptions([])
    setIsAmbiguousOpen(false)
    
    const newBody = buildRequestBodyFromOption(option)
    console.log("📋 [AMBIGUOUS_SELECT] 새로운 요청 바디 구성:", JSON.stringify(newBody, null, 2))
    
    setIsLoading(true)
    console.log("⏳ [AMBIGUOUS_SELECT] 로딩 시작, API 호출 준비")
    
    try {
      const result = await fetchRecommendations(newBody)
      const response = (result as any).response
      console.log("📥 [AMBIGUOUS_SELECT] API 응답 받음:", {
        status: result.status,
        hasResponse: !!response,
        responseStatus: response?.status,
        responseDataKeys: response?.data ? Object.keys(response.data) : null
      })
      
      if (result.status === 'AMBIGUOUS') {
        console.log("🔄 [AMBIGUOUS_SELECT] 또 다른 AMBIGUOUS 응답 - 재귀 상황")
        return
      }
      
      if (response?.data && response.data.success && response.data.recommendations) {
        console.log("✅ [AMBIGUOUS_SELECT] 성공 응답 확인됨")
        console.log("📦 [AMBIGUOUS_SELECT] 추천 데이터:", Object.keys(response.data.recommendations))
        
        const placesData = response.data.recommendations
        localStorage.setItem('recommendationResults', JSON.stringify(placesData))
        localStorage.setItem('travelInfo', JSON.stringify(newBody))
        
        console.log("🎯 [AMBIGUOUS_SELECT] 로컬스토리지 저장 완료, 페이지 이동 시작")
        router.push('/recommendations')
      } else {
        console.log("❌ [AMBIGUOUS_SELECT] 응답 데이터 구조가 예상과 다름:", {
          hasData: !!response?.data,
          success: response?.data?.success,
          hasRecommendations: !!response?.data?.recommendations,
          fullResponse: response?.data
        })
      }
    } catch (e: any) {
      console.error("💥 [AMBIGUOUS_SELECT] 예외 발생:", e)
      console.error("💥 [AMBIGUOUS_SELECT] 예외 상세:", {
        message: e.message,
        stack: e.stack,
        response: e.response?.data
      })
    } finally {
      console.log("🏁 [AMBIGUOUS_SELECT] 처리 완료, 상태 정리")
      setIsResolvingAmbiguity(false)
      setIsLoading(false)
    }
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
              {t.createItinerary.generating}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t.createItinerary.generatingSubtitle}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.createItinerary.title}
        </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.createItinerary.subtitle}
        </p>
      </div>

        {/* 여행 정보 입력 카드 */}
        <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center justify-center gap-2">
              <Plane className="h-6 w-6 text-blue-500" />
              {t.createItinerary.cardTitle}
            </CardTitle>
        </CardHeader>
          <CardContent className="space-y-6">
            {/* 목적지 리스트 */}
            {destinations.map((destination, index) => (
              <div key={destination.id} className="p-6 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    {t.createItinerary.destination} {index + 1}
                  </h3>
                  {destinations.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeDestination(destination.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-1" />
                      {t.createItinerary.removeDestination}
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* 국가 입력 (텍스트 필드로 변경) */}
                  <div className="space-y-2">
                    <Label htmlFor={`country-${destination.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.createItinerary.country}
                    </Label>
                    <Input
                      id={`country-${destination.id}`}
                      type="text"
                      placeholder={
                        language === 'en' ? 'e.g., Korea, Japan, USA, France...' :
                        language === 'ja' ? '例: 韓国、日本、アメリカ、フランス...' :
                        language === 'zh' ? '例如：中国、日本、美国、法国…' :
                        language === 'vi' ? 'VD: Hàn Quốc, Nhật Bản, Mỹ, Pháp...' :
                        language === 'id' ? 'mis: Korea, Jepang, AS, Prancis...' :
                        '예: 한국, 일본, 미국, 프랑스...'
                      }
                      value={destination.country}
                      onChange={(e) => updateDestination(destination.id, 'country', e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* 도시 입력 */}
                  <div className="space-y-2">
                    <Label htmlFor={`city-${destination.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.createItinerary.city}
                    </Label>
                    <Input
                      id={`city-${destination.id}`}
                      type="text"
                      placeholder={t.createItinerary.cityPlaceholder}
                      value={destination.city}
                      onChange={(e) => updateDestination(destination.id, 'city', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* 날짜 범위 선택 (하나의 섹션으로 통합) */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Travel Period' : language === 'ja' ? '旅行期間' : language === 'zh' ? '旅行时间' : language === 'vi' ? 'Thời gian du lịch' : language === 'id' ? 'Periode Perjalanan' : '여행 기간'}
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 시작일 */}
                    <div className="relative">
                      <Input
                        id={`start-date-${destination.id}`}
                        type="date"
                        value={destination.startDate}
                        onChange={(e) => updateDestination(destination.id, 'startDate', e.target.value)}
                        className="w-full pl-10"
                        placeholder={datePlaceholder}
                        lang={inputLang}
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    
                    {/* 종료일 */}
                    <div className="relative">
                      <Input
                        id={`end-date-${destination.id}`}
                        type="date"
                        value={destination.endDate}
                        onChange={(e) => updateDestination(destination.id, 'endDate', e.target.value)}
                        className="w-full pl-10"
                        min={destination.startDate}
                        placeholder={datePlaceholder}
                        lang={inputLang}
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
            
                {/* 기간 표시 */}
                {destination.startDate && destination.endDate && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-blue-700 dark:text-blue-300">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {t.createItinerary.duration}: {
                          Math.ceil((new Date(destination.endDate).getTime() - new Date(destination.startDate).getTime()) / (1000 * 60 * 60 * 24))
                        }일
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* 목적지 추가 버튼 */}
            <div className="text-center">
            <Button
                type="button"
                variant="outline"
                onClick={addDestination}
                className="border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
              >
                <Plus className="h-5 w-5 mr-2" />
                {t.createItinerary.addDestination}
            </Button>
          </div>

            {/* 총 여행 기간 표시 */}
            {destinations.length > 0 && destinations[0].startDate && destinations[destinations.length - 1].endDate && (
              <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    총 여행 기간
                  </h4>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <span>{destinations[0].startDate}</span>
                    <span>→</span>
                    <span>{destinations[destinations.length - 1].endDate}</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      ({calculateTotalDuration()}일)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* API 에러 메시지 표시 */}
            {apiError && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <X className="h-5 w-5 text-red-500" />
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
                    <X className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            )}

            {/* 일정 생성 버튼 */}
            <div className="text-center pt-6">
                <Button
                onClick={handleGenerateItinerary}
                disabled={!isFormValid}
                  size="lg"
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                <Sparkles className="h-5 w-5 mr-2" />
                {t.createItinerary.generateButton}
                </Button>
              </div>
            </CardContent>
          </Card>
      </div>

      {/* AMBIGUOUS 도시 선택 모달 */}
      <Dialog open={isAmbiguousOpen} onOpenChange={setIsAmbiguousOpen}>
        <DialogContent className="sm:max-w-lg" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>어떤 도시를 찾으시나요?</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {ambiguousOptions.length === 0 && (
              <p className="text-sm text-gray-500">선택지가 없습니다.</p>
            )}
            {ambiguousOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectAmbiguousOption(opt)}
                disabled={isLoading || isResolvingAmbiguity}
                className="w-full text-left px-3 py-2 rounded border hover:bg-blue-50 dark:hover:bg-blue-900/30 disabled:opacity-60"
              >
                {getOptionLabel(opt)}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}