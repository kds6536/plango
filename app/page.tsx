"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Plane, MapPin, Star, Users, Calendar, Compass, Heart, Camera } from "lucide-react"
import { useLanguageStore } from "@/lib/language-store"
import { useScrollPosition } from "@/hooks/use-scroll-position"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTranslations } from "@/components/language-wrapper"

export default function HomePage() {
  const { language, setLanguage } = useLanguageStore()
  const t = useTranslations()
  useScrollPosition()

  // 번역 데이터가 완전히 로드되지 않았을 때 로딩 표시
  if (!t || !t.nav || !t.popularItineraries || !t.testimonials || !t.footer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Plane className="w-6 h-6 text-white transform rotate-45" />
              </div>
              <span className="text-3xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
                {t.logo}
              </span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/create-itinerary"
                className="text-foreground/70 hover:text-primary font-light transition-colors tracking-wide"
              >
                {t.nav.createItinerary}
              </Link>
              <Link
                href="/destinations"
                className="text-foreground/70 hover:text-primary font-light transition-colors tracking-wide"
              >
                {t.nav.destinations}
              </Link>
              <Link
                href="/community"
                className="text-foreground/70 hover:text-primary font-light transition-colors tracking-wide"
              >
                {t.nav.community}
              </Link>
              <Link
                href="/pricing"
                className="text-foreground/70 hover:text-primary font-light transition-colors tracking-wide"
              >
                {t.nav.pricing}
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32 border-border bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
                <SelectItem value="id">Bahasa Indonesia</SelectItem>
              </SelectContent>
            </Select>
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-2 border-border hover:border-primary font-light">
                {t.auth.login}
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg font-light"
              >
                {t.auth.signup}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Premium Hero Section with Scrolling Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Scrolling Travel-themed background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2835&q=80')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
          </div>

          {/* Enhanced 3D Animated travel elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating geometric shapes with 3D effect */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-3xl animate-float blur-sm transform rotate-12 shadow-2xl"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/30 to-red-400/30 rounded-full animate-float-delayed blur-sm shadow-2xl"></div>
            <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-green-400/30 to-teal-400/30 rounded-2xl animate-float blur-sm transform -rotate-12 shadow-2xl"></div>
            <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full animate-float-delayed blur-sm shadow-2xl"></div>

            {/* 3D Travel icons with enhanced animations */}
            <div className="absolute top-1/4 left-1/4 animate-float transform hover:scale-110 transition-transform duration-300">
              <div className="relative">
                <Plane className="w-12 h-12 text-white/40 transform rotate-45 drop-shadow-2xl" />
                <div className="absolute inset-0 w-12 h-12 bg-blue-400/20 rounded-full blur-xl"></div>
              </div>
            </div>
            <div className="absolute top-1/3 right-1/4 animate-float-delayed transform hover:scale-110 transition-transform duration-300">
              <div className="relative">
                <MapPin className="w-10 h-10 text-white/40 drop-shadow-2xl" />
                <div className="absolute inset-0 w-10 h-10 bg-red-400/20 rounded-full blur-xl"></div>
              </div>
            </div>
            <div className="absolute bottom-1/4 left-1/3 animate-float transform hover:scale-110 transition-transform duration-300">
              <div className="relative">
                <Compass className="w-10 h-10 text-white/40 drop-shadow-2xl" />
                <div className="absolute inset-0 w-10 h-10 bg-green-400/20 rounded-full blur-xl"></div>
              </div>
            </div>
            <div className="absolute bottom-1/3 right-1/4 animate-float-delayed transform hover:scale-110 transition-transform duration-300">
              <div className="relative">
                <Camera className="w-8 h-8 text-white/40 drop-shadow-2xl" />
                <div className="absolute inset-0 w-8 h-8 bg-purple-400/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-extralight mb-8 leading-tight tracking-wider">
            {t.hero?.title || "AI 기반 맞춤형 여정으로"}
          </h1>
          <p className="text-2xl md:text-3xl mb-12 font-light tracking-wide text-white/90">
            {t.hero?.subtitle || "잊지 못할 여행을 만들어보세요"}
          </p>
          <Link href="/create-itinerary">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 font-light tracking-wide"
            >
              {t.hero?.cta || "지금 여행을 계획하세요"}
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
              {t.features?.title || "Plan Go의 특별함을 경험하세요"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light tracking-wide">
              {t.features?.subtitle || "Plan Go가 다른 여행 계획 서비스와 차별화되는 이유"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {(t.features?.items || [
              {
                title: "맞춤형 여정",
                description: "AI가 당신의 선호도, 관심사, 예산에 맞춰 완벽한 맞춤형 여행 계획을 세워드립니다."
              },
              {
                title: "빠르고 효율적인 계획",
                description: "몇 분 안에 상세한 여정을 만들어 시간과 노력을 절약하세요."
              },
              {
                title: "신뢰할 수 있는 정보",
                description: "목적지, 명소, 여행 팁에 대한 최신 정보를 얻으세요."
              }
            ]).map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-shadow bg-background">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {index === 0 && <Heart className="w-8 h-8 text-white" />}
                    {index === 1 && <Calendar className="w-8 h-8 text-white" />}
                    {index === 2 && <Star className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-2xl font-medium mb-4 text-foreground tracking-wide">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light tracking-wide">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Itineraries Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent tracking-wide">
              {t.popularItineraries?.title || "인기 여행 일정"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light tracking-wide">
              {t.popularItineraries?.subtitle || "전 세계 여행자들이 선택한 베스트 여행 코스를 만나보세요"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: t.popularItineraries?.itinerary1?.title || "4일간의 도쿄 탐험",
                description: t.popularItineraries?.itinerary1?.description || "전통과 현대가 조화를 이루는 도쿄의 매력을 만끽하세요.",
                image: "from-pink-400 to-red-400",
                rating: 4.9,
                reviews: 1234,
              },
              {
                title: t.popularItineraries?.itinerary2?.title || "5일간의 파리 발견",
                description: t.popularItineraries?.itinerary2?.description || "사랑의 도시 파리에서 로맨틱한 순간들을 만들어보세요.",
                image: "from-blue-400 to-purple-400",
                rating: 4.8,
                reviews: 2156,
              },
              {
                title: t.popularItineraries?.itinerary3?.title || "서울 문화 여행",
                description: t.popularItineraries?.itinerary3?.description || "한국의 전통과 현대 문화를 동시에 체험하세요.",
                image: "from-green-400 to-teal-400",
                rating: 4.7,
                reviews: 892,
              },
            ].map((itinerary, index) => (
              <Card
                key={index}
                className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105 border-0"
              >
                <div className={`aspect-video bg-gradient-to-r ${itinerary.image} relative`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{itinerary.rating}</span>
                    <span className="text-xs text-gray-600">({itinerary.reviews})</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-3 text-foreground tracking-wide">{itinerary.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed font-light tracking-wide">{itinerary.description}</p>
                  <Link href="/itinerary-results">
                    <Button
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 p-0 h-auto font-light group"
                    >
                      {t.popularItineraries?.viewItinerary || "여정 보기"}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wide">
              {t.testimonials?.title || "사용자 후기"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light tracking-wide">
              {t.testimonials?.subtitle || "Plan Go를 사용한 여행자들의 생생한 후기를 확인해보세요"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: t.testimonials?.user1?.name || "김지연",
                rating: 5,
                review: t.testimonials?.user1?.review || "Plan Go 덕분에 일본 여행을 정말 효율적으로 계획할 수 있었어요.",
                date: t.testimonials?.user1?.date || "2025년 4월 여행",
                avatar: "from-pink-400 to-rose-400",
              },
              {
                name: t.testimonials?.user2?.name || "박민호",
                rating: 5,
                review: t.testimonials?.user2?.review || "가족 여행을 계획하면서 Plan Go를 사용했는데 정말 만족스러웠어요.",
                date: t.testimonials?.user2?.date || "2025년 3월 여행",
                avatar: "from-blue-400 to-cyan-400",
              },
              {
                name: t.testimonials?.user3?.name || "이수진",
                rating: 5,
                review: t.testimonials?.user3?.review || "혼자 떠나는 유럽 배낭여행을 Plan Go로 계획했어요.",
                date: t.testimonials?.user3?.date || "2025년 5월 여행",
                avatar: "from-green-400 to-teal-400",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-muted/50">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${testimonial.avatar} rounded-full flex items-center justify-center text-white font-light mr-4`}
                    >
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground tracking-wide">{testimonial.name}</h4>
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4 font-light tracking-wide">"{testimonial.review}"</p>
                  <div className="flex justify-end">
                    <p className="text-sm text-muted-foreground/70 font-light">{testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fixed Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
                  <Plane className="w-6 h-6 text-white transform rotate-45" />
                </div>
                <span className="text-3xl font-light text-white tracking-wide">{t.logo}</span>
              </div>
              <p className="text-gray-300 mb-6 font-light tracking-wide">{t.footer?.description || "AI 기반 맞춤형 여행 계획으로 완벽한 여행을 만들어보세요."}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-white tracking-wide">{t.footer?.services?.title || "서비스"}</h3>
              <ul className="space-y-2 text-gray-300">
                {(t.footer?.services?.items || ["여행 계획 만들기", "요금제 안내", "인기 여행지"]).map((item, index) => (
                  <li key={index}>
                    <Link
                      href={index === 0 ? "/create-itinerary" : index === 1 ? "/pricing" : "/destinations"}
                      className="hover:text-white transition-colors font-light tracking-wide"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-white tracking-wide">{t.footer?.support?.title || "고객 지원"}</h3>
              <ul className="space-y-2 text-gray-300">
                {(t.footer?.support?.items || ["자주 묻는 질문", "문의하기", "이용약관", "개인정보처리방침"]).map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={
                        index === 0 ? "/support/faq" : 
                        index === 1 ? "/support/contact" : 
                        index === 2 ? "/support/terms" : 
                        "/support/privacy"
                      } 
                      className="hover:text-white transition-colors font-light tracking-wide"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm font-light tracking-wide">{t.footer?.copyright || "© 2025 Plan Go. All rights reserved."}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
