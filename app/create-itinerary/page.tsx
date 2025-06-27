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
import { useLanguageStore } from "@/lib/language-store"

// 다국어 번역
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
    currencies: {
      KRW: "🇰🇷 KRW",
      USD: "🇺🇸 USD", 
      EUR: "🇪🇺 EUR",
      JPY: "🇯🇵 JPY",
      CNY: "🇨🇳 CNY",
      GBP: "🇬🇧 GBP"
    }
  },
  ja: {
    title: "✈️ 旅程を作成",
    subtitle: "いくつかの情報を入力するだけで、AIが完璧なカスタム旅行プランを作成します 🎯",
    cardTitle: "🌟 旅行情報入力",
    destination: "🌍 国選択または都市入力",
    destinationPlaceholder: "例：日本、東京、パリ、ニューヨーク...",
    dateSelection: "📅 旅行日選択",
    dateSelectionPlaceholder: "日付を選択してください",
    travelers: "👥 人数",
    travelerUnit: "名",
    budget: "💰 利用可能予算",
    budgetPlaceholder: "宿泊、食事、交通、観光などの総予算を入力してください",
    ageRange: "🎂 年齢層（複数選択可）",
    ageRanges: ["10歳未満", "10代", "20代", "30代", "40代", "50代以上"],
    gender: "👤 性別",
    genderPlaceholder: "性別を選択してください",
    genderOptions: { male: "男性", female: "女性", none: "選択しない" },
    specialRequests: "✨ 特別なリクエスト（任意）",
    specialRequestsPlaceholder: "ご希望の旅行スタイル、特別なリクエスト、興味、避けたいことを自由に記述してください。\n例：\n- 癒しの静かな旅行を希望\n- グルメツアーに興味あり\n- 歴史的な場所を訪問したい\n- 高所や水が苦手\n- ビーガン料理のみ\n- インスタ映えスポットに行きたい",
    specialRequestsDesc: "よりパーソナライズされた行程のための特別なリクエストをお知らせください（任意）",
    generateButton: "🎯 カスタム旅行行程を生成",
    currencies: {
      KRW: "🇰🇷 ウォン",
      USD: "🇺🇸 ドル", 
      EUR: "🇪🇺 ユーロ",
      JPY: "🇯🇵 円",
      CNY: "🇨🇳 元",
      GBP: "🇬🇧 ポンド"
    }
  },
  zh: {
    title: "✈️ 制定旅行计划",
    subtitle: "只需输入几项信息，AI就会为您生成完美的定制旅行行程 🎯",
    cardTitle: "🌟 输入旅行信息",
    destination: "🌍 选择国家或输入城市",
    destinationPlaceholder: "例如：日本、东京、巴黎、纽约...",
    dateSelection: "📅 选择旅行日期",
    dateSelectionPlaceholder: "请选择日期",
    travelers: "👥 人数",
    travelerUnit: "人",
    budget: "💰 可用预算",
    budgetPlaceholder: "请输入住宿、餐饮、交通、观光等总预算",
    ageRange: "🎂 年龄段（可多选）",
    ageRanges: ["10岁以下", "10多岁", "20多岁", "30多岁", "40多岁", "50岁以上"],
    gender: "👤 性别",
    genderPlaceholder: "请选择性别",
    genderOptions: { male: "男性", female: "女性", none: "不选择" },
    specialRequests: "✨ 特殊要求（可选）",
    specialRequestsPlaceholder: "请自由描述您希望的旅行风格、特殊要求、兴趣或想避免的事情。\n例如：\n- 希望轻松安静的旅行\n- 对美食之旅感兴趣\n- 想参观历史景点\n- 恐高或怕水\n- 只能吃素食\n- 想去适合拍照的地方",
    specialRequestsDesc: "告诉我们任何特殊要求，以获得更个性化的行程（可选）",
    generateButton: "🎯 生成定制旅行行程",
    currencies: {
      KRW: "🇰🇷 韩元",
      USD: "🇺🇸 美元", 
      EUR: "🇪🇺 欧元",
      JPY: "🇯🇵 日元",
      CNY: "🇨🇳 人民币",
      GBP: "🇬🇧 英镑"
    }
  },
  vi: {
    title: "✈️ Tạo Lịch Trình",
    subtitle: "Chỉ cần nhập một vài thông tin và AI sẽ tạo lịch trình du lịch tùy chỉnh hoàn hảo cho bạn 🎯",
    cardTitle: "🌟 Nhập Thông Tin Du Lịch",
    destination: "🌍 Chọn Quốc Gia hoặc Nhập Thành Phố",
    destinationPlaceholder: "VD: Nhật Bản, Tokyo, Paris, New York...",
    dateSelection: "📅 Chọn Ngày Du Lịch",
    dateSelectionPlaceholder: "Chọn ngày",
    travelers: "👥 Số Người",
    travelerUnit: "người",
    budget: "💰 Ngân Sách Có Sẵn",
    budgetPlaceholder: "Nhập tổng ngân sách cho chỗ ở, ăn uống, giao thông, tham quan, v.v.",
    ageRange: "🎂 Độ Tuổi (Có thể chọn nhiều)",
    ageRanges: ["Dưới 10 tuổi", "Thiếu niên", "20-29", "30-39", "40-49", "50 tuổi+"],
    gender: "👤 Giới Tính",
    genderPlaceholder: "Chọn giới tính",
    genderOptions: { male: "Nam", female: "Nữ", none: "Không chọn" },
    specialRequests: "✨ Yêu Cầu Đặc Biệt (Tùy chọn)",
    specialRequestsPlaceholder: "Hãy mô tả phong cách du lịch mong muốn, yêu cầu đặc biệt, sở thích hoặc điều muốn tránh.\nVí dụ:\n- Muốn chuyến đi thư giãn, yên tĩnh\n- Quan tâm đến tour ẩm thực\n- Muốn thăm các địa điểm lịch sử\n- Sợ độ cao hoặc nước\n- Chỉ ăn được đồ chay\n- Muốn đến những nơi chụp ảnh đẹp",
    specialRequestsDesc: "Cho chúng tôi biết bất kỳ yêu cầu đặc biệt nào để có lịch trình cá nhân hóa hơn (tùy chọn)",
    generateButton: "🎯 Tạo Lịch Trình Du Lịch Tùy Chỉnh",
    currencies: {
      KRW: "🇰🇷 Won",
      USD: "🇺🇸 USD", 
      EUR: "🇪🇺 EUR",
      JPY: "🇯🇵 Yen",
      CNY: "🇨🇳 Yuan",
      GBP: "🇬🇧 Pound"
    }
  },
  id: {
    title: "✈️ Buat Itinerary",
    subtitle: "Cukup masukkan beberapa informasi dan AI akan membuat itinerary perjalanan kustom yang sempurna untuk Anda 🎯",
    cardTitle: "🌟 Masukkan Informasi Perjalanan",
    destination: "🌍 Pilih Negara atau Masukkan Kota",
    destinationPlaceholder: "Contoh: Jepang, Tokyo, Paris, New York...",
    dateSelection: "📅 Pilih Tanggal Perjalanan",
    dateSelectionPlaceholder: "Pilih tanggal",
    travelers: "👥 Jumlah Traveler",
    travelerUnit: "orang",
    budget: "💰 Budget Tersedia",
    budgetPlaceholder: "Masukkan total budget untuk akomodasi, makanan, transportasi, wisata, dll.",
    ageRange: "🎂 Rentang Usia (Pilihan Ganda)",
    ageRanges: ["Di bawah 10", "Remaja", "20an", "30an", "40an", "50+"],
    gender: "👤 Jenis Kelamin",
    genderPlaceholder: "Pilih jenis kelamin",
    genderOptions: { male: "Laki-laki", female: "Perempuan", none: "Tidak memilih" },
    specialRequests: "✨ Permintaan Khusus (Opsional)",
    specialRequestsPlaceholder: "Silakan deskripsikan gaya perjalanan yang diinginkan, permintaan khusus, minat, atau hal yang ingin dihindari.\nContoh:\n- Ingin perjalanan yang santai dan tenang\n- Tertarik dengan tur kuliner\n- Ingin mengunjungi situs bersejarah\n- Takut ketinggian atau air\n- Hanya bisa makan vegan\n- Ingin tempat yang Instagramable",
    specialRequestsDesc: "Beritahu kami permintaan khusus untuk itinerary yang lebih personal (opsional)",
    generateButton: "🎯 Buat Itinerary Perjalanan Kustom",
    currencies: {
      KRW: "🇰🇷 Won",
      USD: "🇺🇸 USD", 
      EUR: "🇪🇺 EUR",
      JPY: "🇯🇵 Yen",
      CNY: "🇨🇳 Yuan",
      GBP: "🇬🇧 Pound"
    }
  }
}

export default function CreateItineraryPage() {
  const { language } = useLanguageStore()
  const t = translations[language as keyof typeof translations]
  
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
              <Link href="/itinerary-results" className="block">
                <Button className="w-full bg-gradient-to-r from-green-600/90 to-blue-600/90 hover:from-green-600 hover:to-blue-600 text-white text-lg font-medium py-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                  {t.generateButton}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
