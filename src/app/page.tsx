"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Shield, ArrowRight, Plane, Star, Users, CheckCircle, Compass, Zap, Clock } from "lucide-react"
import { useLanguage } from "../../hooks/use-language"
import { useScrollPosition } from "../../hooks/use-scroll-position"

export default function HomePage() {
  const { language, changeLanguage } = useLanguage()
  useScrollPosition()

  const translations = {
    ko: {
      logo: "Plan Go",
      nav: {
        createItinerary: "여행 계획 만들기",
        destinations: "인기 여행지 둘러보기",
        community: "여행 커뮤니티",
        pricing: "요금제 안내",
      },
      auth: {
        login: "로그인",
        signup: "회원가입",
      },
      hero: {
        title: "AI 기반 맞춤형 여정으로",
        subtitle: "잊지 못할 여행을 만들어보세요",
        cta: "지금 여행을 계획하세요",
      },
      howItWorks: {
        title: "Plan Go 사용 방법",
        subtitle: "몇 가지 간단한 단계만으로 완벽한 여행 계획을 만들 수 있습니다",
        steps: [
          {
            title: "회원가입 / 로그인",
            description: "간편하게 가입하고 로그인하여 Plan Go의 모든 기능을 이용하세요.",
          },
          {
            title: "여행 정보 입력",
            description: "여행 기간, 목적지, 예산, 관심사 등 기본 정보를 입력합니다.",
          },
          {
            title: "AI 일정 생성",
            description: "AI가 입력된 정보를 바탕으로 최적의 여행 일정을 생성합니다.",
          },
          {
            title: "일정 확인 및 수정",
            description: "생성된 일정을 확인하고 필요에 따라 자유롭게 수정하세요.",
          },
        ],
      },
      features: {
        title: "Plan Go의 특별함을 경험하세요",
        subtitle: "Plan Go가 다른 여행 계획 서비스와 차별화되는 이유",
        items: [
          {
            title: "맞춤형 여정",
            description:
              "AI가 당신의 선호도, 관심사, 예산에 맞춰 완벽한 맞춤형 여행 계획을 세워드립니다. 개인의 취향을 반영한 특별한 여행을 경험하세요.",
          },
          {
            title: "빠르고 효율적인 계획",
            description:
              "몇 분 안에 상세한 여정을 만들어 시간과 노력을 절약하세요. 복잡한 여행 계획을 간단하게 해결합니다.",
          },
          {
            title: "신뢰할 수 있는 정보",
            description:
              "목적지, 명소, 여행 팁에 대한 최신 정보를 얻으세요. 검증된 정보로 안전하고 즐거운 여행을 보장합니다.",
          },
        ],
      },
      popularItineraries: {
        title: "인기 여행 일정",
        subtitle: "전 세계 여행자들이 선택한 베스트 여행 코스를 만나보세요",
        viewItinerary: "여정 보기",
      },
      testimonials: {
        title: "사용자 후기",
        subtitle: "Plan Go를 사용한 여행자들의 생생한 후기를 확인해보세요",
      },
      footer: {
        description: "AI 기반 여행 계획 서비스로 완벽한 여행을 경험하세요.",
        services: {
          title: "서비스",
          items: ["여행 일정 생성", "맞춤형 추천", "여행 정보"],
        },
        support: {
          title: "고객 지원",
          items: ["자주 묻는 질문", "고객센터", "이용약관", "개인정보 처리방침"],
        },
        copyright: "© 2025 Plan Go. All rights reserved.",
      },
    },
    en: {
      logo: "Plan Go",
      nav: {
        createItinerary: "Create Itinerary",
        destinations: "Popular Destinations",
        community: "Travel Community",
        pricing: "Pricing",
      },
      auth: {
        login: "Login",
        signup: "Sign Up",
      },
      hero: {
        title: "Create Unforgettable Journeys",
        subtitle: "with AI-Powered Custom Itineraries",
        cta: "Start Planning Your Trip",
      },
      howItWorks: {
        title: "How Plan Go Works",
        subtitle: "Create the perfect travel plan in just a few simple steps",
        steps: [
          {
            title: "Sign Up / Login",
            description: "Easily sign up and log in to access all Plan Go features.",
          },
          {
            title: "Enter Travel Info",
            description: "Input basic information like travel dates, destinations, budget, and interests.",
          },
          {
            title: "AI Generates Itinerary",
            description: "AI creates the optimal travel itinerary based on your input.",
          },
          {
            title: "Review & Modify",
            description: "Review the generated itinerary and freely modify as needed.",
          },
        ],
      },
      features: {
        title: "Experience Plan Go's Excellence",
        subtitle: "What makes Plan Go different from other travel planning services",
        items: [
          {
            title: "Personalized Journeys",
            description:
              "AI creates perfect custom travel plans based on your preferences, interests, and budget. Experience unique trips tailored to your taste.",
          },
          {
            title: "Fast & Efficient Planning",
            description:
              "Create detailed itineraries in minutes, saving time and effort. Simplify complex travel planning.",
          },
          {
            title: "Reliable Information",
            description:
              "Get the latest information about destinations, attractions, and travel tips. Ensure safe and enjoyable trips with verified information.",
          },
        ],
      },
      popularItineraries: {
        title: "Popular Itineraries",
        subtitle: "Discover the best travel routes chosen by travelers worldwide",
        viewItinerary: "View Itinerary",
      },
      testimonials: {
        title: "User Reviews",
        subtitle: "Check out real reviews from travelers who used Plan Go",
      },
      footer: {
        description: "Experience perfect travel with AI-powered travel planning service.",
        services: {
          title: "Services",
          items: ["Itinerary Generation", "Custom Recommendations", "Travel Information"],
        },
        support: {
          title: "Support",
          items: ["FAQ", "Contact", "Terms", "Privacy Policy"],
        },
        copyright: "© 2025 Plan Go. All rights reserved.",
      },
    },
    zh: {
      logo: "Plan Go",
      nav: {
        createItinerary: "制定旅行计划",
        destinations: "热门目的地",
        community: "旅行社区",
        pricing: "价格方案",
      },
      auth: {
        login: "登录",
        signup: "注册",
      },
      hero: {
        title: "AI定制专属行程",
        subtitle: "创造难忘的旅行体验",
        cta: "立即开始规划旅行",
      },
      howItWorks: {
        title: "Plan Go使用方法",
        subtitle: "通过几个简单步骤创建完美的旅行计划",
        steps: [
          {
            title: "Sign Up / Login",
            description: "Easily sign up and log in to access all Plan Go features.",
          },
          {
            title: "Enter Travel Info",
            description: "Input basic information like travel dates, destinations, budget, and interests.",
          },
          {
            title: "AI Generates Itinerary",
            description: "AI creates the optimal travel itinerary based on your input.",
          },
          {
            title: "Review & Modify",
            description: "Review the generated itinerary and freely modify as needed.",
          },
        ],
      },
      features: {
        title: "Plan Go的特别之处",
        subtitle: "为什么Plan Go与其他旅行规划服务不同",
        items: [
          {
            title: "个性化行程",
            description:
              "AI根据您的偏好、兴趣和预算，为您量身定制完美的旅行计划。体验独特而符合您口味的旅行。",
          },
          {
            title: "快速高效的规划",
            description:
              "只需几分钟即可创建详细的行程，节省时间和精力。简化复杂的旅行规划。",
          },
          {
            title: "可靠的信息",
            description:
              "获取目的地、景点和旅行提示的最新信息。确保安全且愉快的旅行，使用经过验证的信息。",
          },
        ],
      },
      popularItineraries: {
        title: "热门行程",
        subtitle: "发现世界各地旅行者选择的最佳旅行路线",
        viewItinerary: "查看行程",
      },
      testimonials: {
        title: "用户评价",
        subtitle: "查看使用Plan Go的旅行者真实评价",
      },
      footer: {
        description: "体验AI驱动的旅行规划服务，享受完美的旅行。",
        services: {
          title: "服务",
          items: ["行程生成", "个性化推荐", "旅行信息"],
        },
        support: {
          title: "支持",
          items: ["常见问题", "联系我们", "条款", "隐私政策"],
        },
        copyright: "© 2025 Plan Go. All rights reserved.",
      },
    },
  }

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
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
                className="text-gray-700 hover:text-blue-600 font-light transition-colors tracking-wide"
              >
                {t.nav.createItinerary}
              </Link>
              <Link
                href="/destinations"
                className="text-gray-700 hover:text-blue-600 font-light transition-colors tracking-wide"
              >
                {t.nav.destinations}
              </Link>
              <Link
                href="/community"
                className="text-gray-700 hover:text-blue-600 font-light transition-colors tracking-wide"
              >
                {t.nav.community}
              </Link>
              <Link
                href="/pricing"
                className="text-gray-700 hover:text-blue-600 font-light transition-colors tracking-wide"
              >
                {t.nav.pricing}
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={language} onValueChange={changeLanguage}>
              <SelectTrigger className="w-32 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
                <SelectItem value="id">Bahasa Indonesia</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-2 border-gray-300 hover:border-blue-500 font-light">
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
        {/* ... (v0다운로드/app/page.tsx의 전체 JSX 복사) ... */}
      </section>

      {/* 이하 전체 홈페이지 UI 섹션(히어로, HowItWorks, Features, Popular, Testimonials, Footer 등) v0다운로드/app/page.tsx에서 복사한 코드로 완전히 대체 */}
      <footer>
        {/* ... (v0다운로드/app/page.tsx의 전체 JSX 복사) ... */}
      </footer>
    </div>
  );
}
