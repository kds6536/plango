"use client"

import Link from "next/link"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
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
            title: "注册/登录",
            description: "轻松注册并登录，使用Plan Go的所有功能。",
          },
          {
            title: "输入旅行信息",
            description: "输入旅行日期、目的地、预算、兴趣等基本信息。",
          },
          {
            title: "AI生成行程",
            description: "AI根据您的输入信息生成最佳旅行行程。",
          },
          {
            title: "查看和修改",
            description: "查看生成的行程并根据需要自由修改。",
          },
        ],
      },
      features: {
        title: "体验Plan Go的卓越",
        subtitle: "Plan Go与其他旅行规划服务的差异化优势",
        items: [
          {
            title: "个性化行程",
            description: "AI根据您的偏好、兴趣和预算制定完美的定制旅行计划。体验符合您品味的独特旅行。",
          },
          {
            title: "快速高效规划",
            description: "几分钟内创建详细行程，节省时间和精力。简化复杂的旅行规划。",
          },
          {
            title: "可靠信息",
            description: "获取关于目的地、景点和旅行贴士的最新信息。通过验证信息确保安全愉快的旅行。",
          },
        ],
      },
      popularItineraries: {
        title: "热门行程",
        subtitle: "发现全球旅行者选择的最佳旅行路线",
        viewItinerary: "查看行程",
      },
      testimonials: {
        title: "用户评价",
        subtitle: "查看使用Plan Go的旅行者的真实评价",
      },
      footer: {
        description: "通过AI驱动的旅行规划服务体验完美旅行。",
        services: {
          title: "服务",
          items: ["行程生成", "定制推荐", "旅行信息"],
        },
        support: {
          title: "客户支持",
          items: ["常见问题", "客服中心", "使用条款", "隐私政策"],
        },
        copyright: "© 2025 Plan Go. 版权所有。",
      },
    },
    ja: {
      logo: "Plan Go",
      nav: {
        createItinerary: "旅行プランを作成",
        destinations: "人気の目的地",
        community: "旅行コミュニティ",
        pricing: "料金プラン",
      },
      auth: {
        login: "ログイン",
        signup: "新規登録",
      },
      hero: {
        title: "AIベースのカスタム旅程で",
        subtitle: "忘れられない旅を作りましょう",
        cta: "今すぐ旅行を計画する",
      },
      howItWorks: {
        title: "Plan Goの使い方",
        subtitle: "いくつかの簡単なステップで完璧な旅行計画を作成できます",
        steps: [
          {
            title: "会員登録/ログイン",
            description: "簡単に登録してログインし、Plan Goのすべての機能をご利用ください。",
          },
          {
            title: "旅行情報入力",
            description: "旅行期間、目的地、予算、興味などの基本情報を入力します。",
          },
          {
            title: "AI行程生成",
            description: "AIが入力された情報を基に最適な旅行行程を生成します。",
          },
          {
            title: "行程確認・修正",
            description: "生成された行程を確認し、必要に応じて自由に修正してください。",
          },
        ],
      },
      features: {
        title: "Plan Goの特別さを体験",
        subtitle: "Plan Goが他の旅行計画サービスと差別化される理由",
        items: [
          {
            title: "カスタム旅程",
            description:
              "AIがあなたの好み、興味、予算に合わせて完璧なカスタム旅行計画を立てます。個人の趣味を反映した特別な旅行を体験してください。",
          },
          {
            title: "迅速で効率的な計画",
            description: "数分で詳細な旅程を作成し、時間と労力を節約します。複雑な旅行計画を簡単に解決します。",
          },
          {
            title: "信頼できる情報",
            description:
              "目的地、観光地、旅行のコツについて最新の情報を取得します。検証された情報で安全で楽しい旅行を保証します。",
          },
        ],
      },
      popularItineraries: {
        title: "人気の旅程",
        subtitle: "世界中の旅行者が選んだベスト旅行コースをご覧ください",
        viewItinerary: "旅程を見る",
      },
      testimonials: {
        title: "ユーザーレビュー",
        subtitle: "Plan Goを使用した旅行者の生の声をご確認ください",
      },
      footer: {
        description: "AIベースの旅行計画サービスで完璧な旅行を体験してください。",
        services: {
          title: "サービス",
          items: ["旅程生成", "カスタム推奨", "旅行情報"],
        },
        support: {
          title: "カスタマーサポート",
          items: ["よくある質問", "カスタマーセンター", "利用規約", "プライバシーポリシー"],
        },
        copyright: "© 2025 Plan Go. 全著作権所有。",
      },
    },
    vi: {
      logo: "Plan Go",
      nav: {
        createItinerary: "Tạo Lịch Trình",
        destinations: "Điểm Đến Phổ Biến",
        community: "Cộng Đồng Du Lịch",
        pricing: "Bảng Giá",
      },
      auth: {
        login: "Đăng Nhập",
        signup: "Đăng Ký",
      },
      hero: {
        title: "Tạo Hành Trình Khó Quên",
        subtitle: "với Lịch Trình Tùy Chỉnh AI",
        cta: "Bắt Đầu Lập Kế Hoạch Du Lịch",
      },
      howItWorks: {
        title: "Cách Plan Go Hoạt Động",
        subtitle: "Tạo kế hoạch du lịch hoàn hảo chỉ với vài bước đơn giản",
        steps: [
          {
            title: "Đăng Ký / Đăng Nhập",
            description: "Dễ dàng đăng ký và đăng nhập để truy cập tất cả tính năng Plan Go.",
          },
          {
            title: "Nhập Thông Tin Du Lịch",
            description: "Nhập thông tin cơ bản như ngày du lịch, điểm đến, ngân sách và sở thích.",
          },
          {
            title: "AI Tạo Lịch Trình",
            description: "AI tạo lịch trình du lịch tối ưu dựa trên thông tin bạn nhập.",
          },
          {
            title: "Xem Xét & Chỉnh Sửa",
            description: "Xem xét lịch trình được tạo và tự do chỉnh sửa theo nhu cầu.",
          },
        ],
      },
      features: {
        title: "Trải Nghiệm Sự Xuất Sắc Của Plan Go",
        subtitle: "Điều gì làm Plan Go khác biệt so với các dịch vụ lập kế hoạch du lịch khác",
        items: [
          {
            title: "Hành Trình Cá Nhân Hóa",
            description:
              "AI tạo kế hoạch du lịch tùy chỉnh hoàn hảo dựa trên sở thích, quan tâm và ngân sách của bạn. Trải nghiệm những chuyến đi độc đáo phù hợp với gu của bạn.",
          },
          {
            title: "Lập Kế Hoạch Nhanh & Hiệu Quả",
            description:
              "Tạo lịch trình chi tiết trong vài phút, tiết kiệm thời gian và công sức. Đơn giản hóa việc lập kế hoạch du lịch phức tạp.",
          },
          {
            title: "Thông Tin Đáng Tin Cậy",
            description:
              "Nhận thông tin mới nhất về điểm đến, điểm tham quan và mẹo du lịch. Đảm bảo chuyến đi an toàn và thú vị với thông tin đã được xác minh.",
          },
        ],
      },
      popularItineraries: {
        title: "Lịch Trình Phổ Biến",
        subtitle: "Khám phá những tuyến đường du lịch tốt nhất được lựa chọn bởi du khách trên toàn thế giới",
        viewItinerary: "Xem Lịch Trình",
      },
      testimonials: {
        title: "Đánh Giá Người Dùng",
        subtitle: "Xem đánh giá thực tế từ những du khách đã sử dụng Plan Go",
      },
      footer: {
        description: "Trải nghiệm du lịch hoàn hảo với dịch vụ lập kế hoạch du lịch AI.",
        services: {
          title: "Dịch Vụ",
          items: ["Tạo Lịch Trình", "Đề Xuất Tùy Chỉnh", "Thông Tin Du Lịch"],
        },
        support: {
          title: "Hỗ Trợ",
          items: ["Câu Hỏi Thường Gặp", "Liên Hệ", "Điều Khoản", "Chính Sách Bảo Mật"],
        },
        copyright: "© 2025 Plan Go. Tất cả quyền được bảo lưu.",
      },
    },
    id: {
      logo: "Plan Go",
      nav: {
        createItinerary: "Buat Itinerary",
        destinations: "Destinasi Populer",
        community: "Komunitas Travel",
        pricing: "Harga",
      },
      auth: {
        login: "Masuk",
        signup: "Daftar",
      },
      hero: {
        title: "Ciptakan Perjalanan Tak Terlupakan",
        subtitle: "dengan Itinerary Kustom Bertenaga AI",
        cta: "Mulai Merencanakan Perjalanan",
      },
      howItWorks: {
        title: "Cara Kerja Plan Go",
        subtitle: "Buat rencana perjalanan sempurna hanya dengan beberapa langkah sederhana",
        steps: [
          {
            title: "Daftar / Masuk",
            description: "Mudah mendaftar dan masuk untuk mengakses semua fitur Plan Go.",
          },
          {
            title: "Masukkan Info Perjalanan",
            description: "Masukkan informasi dasar seperti tanggal perjalanan, destinasi, budget, dan minat.",
          },
          {
            title: "AI Membuat Itinerary",
            description: "AI membuat itinerary perjalanan optimal berdasarkan input Anda.",
          },
          {
            title: "Tinjau & Modifikasi",
            description: "Tinjau itinerary yang dibuat dan modifikasi sesuai kebutuhan.",
          },
        ],
      },
      features: {
        title: "Rasakan Keunggulan Plan Go",
        subtitle: "Apa yang membuat Plan Go berbeda dari layanan perencanaan perjalanan lainnya",
        items: [
          {
            title: "Perjalanan Personal",
            description:
              "AI membuat rencana perjalanan kustom sempurna berdasarkan preferensi, minat, dan budget Anda. Rasakan perjalanan unik yang disesuaikan dengan selera Anda.",
          },
          {
            title: "Perencanaan Cepat & Efisien",
            description:
              "Buat itinerary detail dalam hitungan menit, menghemat waktu dan tenaga. Sederhanakan perencanaan perjalanan yang kompleks.",
          },
          {
            title: "Informasi Terpercaya",
            description:
              "Dapatkan informasi terbaru tentang destinasi, atraksi, dan tips perjalanan. Pastikan perjalanan aman dan menyenangkan dengan informasi terverifikasi.",
          },
        ],
      },
      popularItineraries: {
        title: "Itinerary Populer",
        subtitle: "Temukan rute perjalanan terbaik yang dipilih oleh traveler di seluruh dunia",
        viewItinerary: "Lihat Itinerary",
      },
      testimonials: {
        title: "Ulasan Pengguna",
        subtitle: "Lihat ulasan nyata dari traveler yang telah menggunakan Plan Go",
      },
      footer: {
        description: "Rasakan perjalanan sempurna dengan layanan perencanaan perjalanan bertenaga AI.",
        services: {
          title: "Layanan",
          items: ["Pembuatan Itinerary", "Rekomendasi Kustom", "Informasi Perjalanan"],
        },
        support: {
          title: "Dukungan",
          items: ["FAQ", "Kontak", "Syarat", "Kebijakan Privasi"],
        },
        copyright: "© 2025 Plan Go. Semua hak dilindungi.",
      },
    },
  }

  const t = translations[language as keyof typeof translations]

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
            <div className="absolute bottom-1/3 left-1/3 animate-float transform hover:scale-110 transition-transform duration-300">
              <div className="relative">
                <Compass className="w-11 h-11 text-white/40 drop-shadow-2xl" />
                <div className="absolute inset-0 w-11 h-11 bg-green-400/20 rounded-full blur-xl"></div>
              </div>
            </div>

            {/* Additional 3D floating elements */}
            <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl animate-float transform rotate-45 shadow-2xl"></div>
            <div className="absolute top-3/4 right-10 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full animate-float-delayed shadow-2xl"></div>
          </div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-6xl">
          <h1 className="text-6xl md:text-8xl font-light mb-8 leading-tight tracking-wide">
            <span className="block text-white drop-shadow-2xl">{t.hero.title}</span>
          </h1>
          <p className="text-4xl md:text-5xl mb-16 font-light leading-relaxed drop-shadow-lg max-w-5xl mx-auto tracking-wide">
            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              {t.hero.subtitle}
            </span>
          </p>
          <Link href="/create-itinerary">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-16 py-8 text-2xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 font-light border-2 border-white/20 tracking-wide"
            >
              <Plane className="w-8 h-8 mr-4" />
              {t.hero.cta}
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
              {t.howItWorks.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light tracking-wide">{t.howItWorks.subtitle}</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {t.howItWorks.steps.map((item, index) => (
                <div key={index} className="text-center group">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${
                      index === 0
                        ? "from-blue-500 to-cyan-500"
                        : index === 1
                          ? "from-purple-500 to-pink-500"
                          : index === 2
                            ? "from-green-500 to-teal-500"
                            : "from-orange-500 to-red-500"
                    } rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}
                  >
                    {index === 0 && <Users className="w-10 h-10 text-white" />}
                    {index === 1 && <MapPin className="w-10 h-10 text-white" />}
                    {index === 2 && <Zap className="w-10 h-10 text-white" />}
                    {index === 3 && <CheckCircle className="w-10 h-10 text-white" />}
                  </div>
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${
                      index === 0
                        ? "from-blue-500 to-cyan-500"
                        : index === 1
                          ? "from-purple-500 to-pink-500"
                          : index === 2
                            ? "from-green-500 to-teal-500"
                            : "from-orange-500 to-red-500"
                    } rounded-full flex items-center justify-center mx-auto mb-4 text-white font-light text-lg`}
                  >
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-gray-800 tracking-wide">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-light tracking-wide">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plan Go의 특별함을 경험하세요 Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wide">
              {t.features.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light tracking-wide">{t.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {t.features.items.map((feature, index) => (
              <Card
                key={index}
                className={`${
                  index === 0 ? "bg-blue-50" : index === 1 ? "bg-purple-50" : "bg-green-50"
                } border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:scale-105`}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${
                      index === 0
                        ? "from-blue-500 to-cyan-500"
                        : index === 1
                          ? "from-purple-500 to-pink-500"
                          : "from-green-500 to-teal-500"
                    } rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    {index === 0 && <Compass className="w-10 h-10 text-white" />}
                    {index === 1 && <Clock className="w-10 h-10 text-white" />}
                    {index === 2 && <Shield className="w-10 h-10 text-white" />}
                  </div>
                  <h3 className="text-2xl font-medium mb-4 text-gray-800 tracking-wide">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg font-light tracking-wide">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Itineraries Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent tracking-wide">
              {t.popularItineraries.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light tracking-wide">
              {t.popularItineraries.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "4일간의 도쿄 탐험",
                description:
                  "전통과 현대가 조화를 이루는 도쿄의 매력을 만끽하세요. 센소지 절부터 도쿄 스카이트리까지, 일본의 진정한 아름다움을 경험할 수 있습니다.",
                image: "from-pink-400 to-red-400",
                rating: 4.9,
                reviews: 1234,
              },
              {
                title: "5일간의 파리 발견",
                description:
                  "사랑의 도시 파리에서 로맨틱한 순간들을 만들어보세요. 에펠탑, 루브르 박물관, 샹젤리제 거리에서 특별한 추억을 쌓으세요.",
                image: "from-blue-400 to-purple-400",
                rating: 4.8,
                reviews: 2156,
              },
              {
                title: "서울 문화 여행",
                description:
                  "한국의 전통과 현대 문화를 동시에 체험하세요. 경복궁부터 강남까지, 서울의 다양한 매력을 발견할 수 있습니다.",
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
                  <h3 className="text-xl font-medium mb-3 text-gray-800 tracking-wide">{itinerary.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed font-light tracking-wide">{itinerary.description}</p>
                  <Link href="/itinerary-results">
                    <Button
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-light group"
                    >
                      {t.popularItineraries.viewItinerary}
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wide">
              {t.testimonials.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light tracking-wide">
              {t.testimonials.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "김지연",
                rating: 5,
                review:
                  "Plan Go 덕분에 일본 여행을 정말 효율적으로 계획할 수 있었어요. 아이와 함께 여행 계획을 세우는 일이 몇 주가 걸렸는데, Plan Go로는 단 몇 분만에 완벽한 일정을 만들어줬어요. 특히 숨겨진 현지 맛집 추천이 정말 좋았습니다!",
                date: "2025년 4월 여행",
                avatar: "from-pink-400 to-rose-400",
              },
              {
                name: "박민호",
                rating: 5,
                review:
                  "가족 여행을 계획하면서 Plan Go를 사용하는 데 아이들 취향까지 고려한 일정을 추천해줘서 놀랐어요. 특히 기존 가이드북에 없는 특별한 장소들을 발견할 수 있어서 좋았습니다. 덕분에 예산 조절 없이 알찬 여행을 즐길 수 있었습니다.",
                date: "2025년 3월 여행",
                avatar: "from-blue-400 to-cyan-400",
              },
              {
                name: "이수진",
                rating: 5,
                review:
                  "혼자 떠나는 유럽 배낭여행을 Plan Go로 계획했어요. 안전한 숙소와 교통편 추천은 물론이고, 실시간으로 일정을 수정할 수 있어서 편했습니다. 다음 여행도 반드시 Plan Go와 함께할 거예요!",
                date: "2025년 5월 여행",
                avatar: "from-green-400 to-teal-400",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gray-50">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${testimonial.avatar} rounded-full flex items-center justify-center text-white font-light mr-4`}
                    >
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 tracking-wide">{testimonial.name}</h4>
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4 font-light tracking-wide">"{testimonial.review}"</p>
                  <div className="flex justify-end">
                    <p className="text-sm text-gray-500 font-light">{testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fixed Footer */}
      <footer className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
                  <Plane className="w-6 h-6 text-white transform rotate-45" />
                </div>
                <span className="text-3xl font-light text-white tracking-wide">{t.logo}</span>
              </div>
              <p className="text-gray-300 mb-6 font-light tracking-wide">{t.footer.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-white tracking-wide">{t.footer.services.title}</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link
                    href="/create-itinerary"
                    className="hover:text-white transition-colors font-light tracking-wide"
                  >
                    {t.footer.services.items[0]}
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors font-light tracking-wide">
                    {t.footer.services.items[1]}
                  </Link>
                </li>
                <li>
                  <Link href="/destinations" className="hover:text-white transition-colors font-light tracking-wide">
                    {t.footer.services.items[2]}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-white tracking-wide">{t.footer.support.title}</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/support/faq" className="hover:text-white transition-colors font-light tracking-wide">
                    {t.footer.support.items[0]}
                  </Link>
                </li>
                <li>
                  <Link href="/support/contact" className="hover:text-white transition-colors font-light tracking-wide">
                    {t.footer.support.items[1]}
                  </Link>
                </li>
                <li>
                  <Link href="/support/terms" className="hover:text-white transition-colors font-light tracking-wide">
                    {t.footer.support.items[2]}
                  </Link>
                </li>
                <li>
                  <Link href="/support/privacy" className="hover:text-white transition-colors font-light tracking-wide">
                    {t.footer.support.items[3]}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm font-light tracking-wide">{t.footer.copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
