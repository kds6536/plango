"use client"

import type React from "react"
import { useLanguage } from "@/hooks/use-language"
import { useScrollPosition } from "@/hooks/use-scroll-position"

const translations = {
  ko: {
    logo: "Plan Go",
      nav: {
    createItinerary: "여행 계획 만들기",
    destinations: "인기 여행지 둘러보기",
    community: "여행 커뮤니티",
    pricing: "요금제 안내",
    home: "홈",
    profile: "내 계정",
  },
    auth: {
      login: "로그인",
      signup: "회원가입",
    },
    form: {
      email: "이메일 주소",
      emailPlaceholder: "example@email.com",
      password: "비밀번호",
      passwordPlaceholder: "비밀번호를 입력하세요",
      forgotPassword: "비밀번호 찾기",
      or: "또는",
      noAccount: "계정이 없으신가요?",
      haveAccount: "이미 계정이 있으신가요?",
      firstName: "이름",
      lastName: "성",
      confirmPassword: "비밀번호 확인",
      confirmPasswordPlaceholder: "비밀번호를 다시 입력하세요",
      phone: "전화번호 (선택)",
      phonePlaceholder: "010-1234-5678",
      terms: "이용약관에 동의합니다 (필수)",
      privacy: "개인정보 처리방침에 동의합니다 (필수)",
      marketing: "마케팅 정보 수신에 동의합니다 (선택)",
    },
    social: {
      google: "Google로 로그인",
      kakao: "카카오로 로그인",
      apple: "Apple로 로그인",
      googleSignup: "Google로 가입하기",
      kakaoSignup: "카카오로 가입하기",
      appleSignup: "Apple로 가입하기",
    },
    welcome: {
      title: "Plan Go에 오신 것을 환영합니다!",
      subtitle: "AI와 함께 완벽한 여행을 계획해보세요",
    },
    hero: {
      title: "AI 기반 맞춤형 여정으로",
      subtitle: "잊지 못할 여행을 만들어보세요",
      cta: "지금 여행을 계획하세요",
    },
    features: {
      title: "Plan Go의 특별함을 경험하세요",
      subtitle: "Plan Go가 다른 여행 계획 서비스와 차별화되는 이유",
      items: [
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
      ]
    },
    pricing: {
      title: "Plan Go 요금제",
      subtitle: "여행 계획의 필요에 맞는 완벽한 요금제를 선택하세요",
      aiIncluded: "모든 플랜에는 AI 기반 맞춤형 일정 생성이 포함됩니다",
      free: {
        name: "무료",
        description: "기본 여행 계획",
        button: "현재 플랜",
        features: {
          basicContent: "아주 간단한 여행 내용 생성",
          basicInfo: "기본 목적지 정보",
          monthlyLimit: "월 1회 일정 생성"
        }
      },
      oneTime: {
        name: "1회 이용권",
        description: "완벽한 일정 1회",
        button: "구매하기",
        features: {
          oneItinerary: "여행 일정 1회 생성 가능",
          detailedContent: "상세한 여행 내용 포함",
          recommendations: "맛집 및 명소 추천",
          pdfDownload: "PDF 다운로드 지원"
        }
      },
      premium: {
        name: "프리미엄",
        badge: "프리미엄",
        description: "무제한 프리미엄 서비스",
        period: "/ 연간",
        button: "구독하기",
        features: {
          unlimited: "무제한 일정 생성",
          advanced: "모든 고급 맞춤 설정 기능",
          detailedInfo: "이미지, 링크 등 상세 정보 포함",
          realTimeEdit: "실시간 일정 수정",
          prioritySupport: "우선 지원 서비스"
        }
      },
      comparison: {
        title: "플랜 비교",
        feature: "기능",
        itineraryCount: "일정 생성 횟수",
        detailLevel: "상세 정보",
        pdfDownload: "PDF 다운로드",
        realTimeEdit: "실시간 수정",
        prioritySupport: "우선 지원",
        monthlyOne: "월 1회",
        oneTime: "1회",
        unlimited: "무제한",
        basic: "기본",
        detailed: "상세",
        premium: "프리미엄"
      },
      payment: {
        title: "지원 결제 수단",
        card: "신용카드",
        cardDesc: "모든 주요 신용카드 지원",
        mobile: "모바일 결제",
        mobileDesc: "카카오페이, 토스, 네이버페이",
        bank: "계좌이체",
        bankDesc: "은행 계좌 직접 이체"
      },
      modal: {
        title: "결제 정보",
        cardNumber: "카드 번호",
        expiry: "만료일",
        cvc: "CVC",
        name: "카드 소유자명",
        namePlaceholder: "홍길동",
        confirm: "결제 완료"
      }
    },
    destinations: {
      title: "인기 여행지",
      subtitle: "전 세계 여행자들이 사랑하는 최고의 여행 목적지를 발견하세요",
      searchPlaceholder: "도시나 국가를 검색하세요...",
      regionSelect: "지역 선택",
      styleSelect: "여행 스타일",
      recommendedDuration: "추천 기간",
      recommendedPeople: "추천 인원",
      createItinerary: "일정 만들기",
      viewDetails: "자세히 보기",
      loadMore: "더 많은 여행지 보기",
      regions: {
        asia: "아시아",
        europe: "유럽",
        america: "아메리카",
        oceania: "오세아니아"
      },
      tags: {
        culture: "문화",
        food: "음식",
        shopping: "쇼핑",
        romantic: "로맨틱",
        art: "예술",
        history: "역사",
        nature: "자연",
        healing: "힐링",
        beach: "해변",
        city: "도시",
        affordable: "저렴",
        adventure: "모험"
      },
      cities: {
        tokyo: "도쿄",
        paris: "파리",
        jeju: "제주도",
        newYork: "뉴욕",
        bangkok: "방콕",
        rome: "로마"
      },
      countries: {
        japan: "일본",
        france: "프랑스",
        korea: "한국",
        usa: "미국",
        thailand: "태국",
        italy: "이탈리아"
      },
      descriptions: {
        tokyo: "전통과 현대가 조화를 이루는 매력적인 도시",
        paris: "사랑과 예술의 도시, 로맨틱한 여행지",
        jeju: "아름다운 자연과 힐링이 있는 섬",
        newYork: "꿈의 도시, 무한한 가능성의 땅",
        bangkok: "맛있는 음식과 저렴한 물가의 동남아 여행지",
        rome: "영원한 도시, 역사와 예술의 보고"
      }
    },
    popularItineraries: {
      title: "인기 여행 일정",
      subtitle: "많은 여행자들이 사랑하는 여행 계획을 확인해보세요",
      viewItinerary: "여정 보기",
      itinerary1: {
        title: "4일간의 도쿄 탐험",
        description: "전통과 현대가 조화를 이루는 도쿄의 매력을 만끽하세요. 센소지 절부터 시부야까지, 일본의 진정한 아름다움을 경험할 수 있습니다."
      },
      itinerary2: {
        title: "5일간의 파리 발견",
        description: "에펠탑부터 루브르까지, 파리의 로맨스와 예술을 체험해보세요."
      },
      itinerary3: {
        title: "서울 문화 여행",
        description: "경복궁부터 홍대까지, 한국 문화를 체험하는 3일간의 서울 여행."
      }
    },
    testimonials: {
      title: "사용자 후기",
      subtitle: "Plan Go를 사용한 여행자들의 실제 경험담",
      user1: {
        name: "김지연",
        review: "Plan Go 덕분에 일본 여행을 정말 효율적으로 계획할 수 있었어요. 아이와 함께 여행 계획을 세우는 일이 몇 주가 걸렸는데, Plan Go로는 단 몇 분만에 완벽한 일정을 만들어줬어요. 특히 숨겨진 현지 맛집 추천이 정말 좋았습니다!",
        date: "2025년 4월 여행"
      },
      user2: {
        name: "박민호",
        review: "가족 여행을 계획하면서 Plan Go를 사용하는 데 아이들 취향까지 고려한 일정을 추천해줘서 놀랐어요. 특히 기존 가이드북에 없는 특별한 장소들을 발견할 수 있어서 좋았습니다. 덕분에 예산 조절 없이 알찬 여행을 즐길 수 있었습니다.",
        date: "2025년 3월 여행"
      },
      user3: {
        name: "이수진",
        review: "혼자 떠나는 유럽 배낭여행을 Plan Go로 계획했어요. 안전한 숙소와 교통편 추천은 물론이고, 실시간으로 일정을 수정할 수 있어서 편했습니다. Plan Go 덕분에 정말 멋진 여행이 되었어요!",
        date: "2025년 5월 여행"
      }
    },
    footer: {
      description: "AI 기반 맞춤형 여행 계획으로 완벽한 여행을 만들어보세요.",
      services: {
        title: "서비스",
        items: ["여행 계획 만들기", "요금제 안내", "인기 여행지"]
      },
      support: {
        title: "고객 지원",
        items: ["자주 묻는 질문", "문의하기", "이용약관", "개인정보처리방침"]
      },
      copyright: "© 2025 Plan Go. All rights reserved."
    }
  },
  en: {
    logo: "Plan Go",
    nav: {
      createItinerary: "Create Itinerary",
      destinations: "Popular Destinations",
      community: "Travel Community",
      pricing: "Pricing",
      home: "Home",
      profile: "My Account",
    },
    auth: {
      login: "Login",
      signup: "Sign Up",
    },
    form: {
      email: "Email Address",
      emailPlaceholder: "example@email.com",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      forgotPassword: "Forgot Password",
      or: "or",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      firstName: "First Name",
      lastName: "Last Name",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Re-enter your password",
      phone: "Phone Number (Optional)",
      phonePlaceholder: "010-1234-5678",
      terms: "I agree to the Terms of Service (Required)",
      privacy: "I agree to the Privacy Policy (Required)",
      marketing: "I agree to receive marketing information (Optional)",
    },
    social: {
      google: "Login with Google",
      kakao: "Login with Kakao",
      apple: "Login with Apple",
      googleSignup: "Sign up with Google",
      kakaoSignup: "Sign up with Kakao",
      appleSignup: "Sign up with Apple",
    },
    welcome: {
      title: "Welcome to Plan Go!",
      subtitle: "Plan the perfect trip with AI",
    },
    hero: {
      title: "Create Unforgettable Journeys",
      subtitle: "with AI-Powered Custom Itineraries",
      cta: "Start Planning Your Trip",
    },
    features: {
      title: "Experience Plan Go's Excellence",
      subtitle: "What makes Plan Go different from other travel planning services",
      items: [
        {
          title: "Personalized Journeys",
          description: "AI creates perfect custom travel plans based on your preferences, interests, and budget."
        },
        {
          title: "Fast & Efficient Planning",
          description: "Create detailed itineraries in minutes, saving time and effort."
        },
        {
          title: "Reliable Information",
          description: "Get the latest information about destinations, attractions, and travel tips."
        }
      ]
    },
    pricing: {
      title: "Plan Go Pricing",
      subtitle: "Choose the perfect pricing plan for your travel planning needs",
      aiIncluded: "All plans include AI-powered custom itinerary generation",
      free: {
        name: "Free",
        description: "Basic travel planning",
        button: "Current Plan",
        features: {
          basicContent: "Very simple travel content generation",
          basicInfo: "Basic destination information",
          monthlyLimit: "1 itinerary per month"
        }
      },
      oneTime: {
        name: "One-time Pass",
        description: "Perfect itinerary once",
        button: "Purchase",
        features: {
          oneItinerary: "Generate 1 travel itinerary",
          detailedContent: "Detailed travel content included",
          recommendations: "Restaurant and attraction recommendations",
          pdfDownload: "PDF download support"
        }
      },
      premium: {
        name: "Premium",
        badge: "Premium",
        description: "Unlimited premium service",
        period: "/ yearly",
        button: "Subscribe",
        features: {
          unlimited: "Unlimited itinerary generation",
          advanced: "All advanced customization features",
          detailedInfo: "Images, links and detailed information included",
          realTimeEdit: "Real-time itinerary editing",
          prioritySupport: "Priority support service"
        }
      },
      comparison: {
        title: "Plan Comparison",
        feature: "Feature",
        itineraryCount: "Itinerary Generation Count",
        detailLevel: "Detail Level",
        pdfDownload: "PDF Download",
        realTimeEdit: "Real-time Editing",
        prioritySupport: "Priority Support",
        monthlyOne: "1 per month",
        oneTime: "1 time",
        unlimited: "Unlimited",
        basic: "Basic",
        detailed: "Detailed",
        premium: "Premium"
      },
      payment: {
        title: "Supported Payment Methods",
        card: "Credit Card",
        cardDesc: "All major credit cards supported",
        mobile: "Mobile Payment",
        mobileDesc: "KakaoPay, Toss, NaverPay",
        bank: "Bank Transfer",
        bankDesc: "Direct bank account transfer"
      },
      modal: {
        title: "Payment Information",
        cardNumber: "Card Number",
        expiry: "Expiry Date",
        cvc: "CVC",
        name: "Cardholder Name",
        namePlaceholder: "John Doe",
        confirm: "Complete Payment"
      }
    },
    destinations: {
      title: "Popular Destinations",
      subtitle: "Discover the world's top travel destinations loved by travelers everywhere",
      searchPlaceholder: "Search for cities or countries...",
      regionSelect: "Select Region",
      styleSelect: "Travel Style",
      recommendedDuration: "Recommended Duration",
      recommendedPeople: "Recommended Group Size",
      createItinerary: "Create Itinerary",
      viewDetails: "View Details",
      loadMore: "View More Destinations",
      regions: {
        asia: "Asia",
        europe: "Europe",
        america: "America",
        oceania: "Oceania"
      },
      tags: {
        culture: "Culture",
        food: "Food",
        shopping: "Shopping",
        romantic: "Romantic",
        art: "Art",
        history: "History",
        nature: "Nature",
        healing: "Healing",
        beach: "Beach",
        city: "City",
        affordable: "Affordable",
        adventure: "Adventure"
      },
      cities: {
        tokyo: "Tokyo",
        paris: "Paris",
        jeju: "Jeju Island",
        newYork: "New York",
        bangkok: "Bangkok",
        rome: "Rome"
      },
      countries: {
        japan: "Japan",
        france: "France",
        korea: "Korea",
        usa: "USA",
        thailand: "Thailand",
        italy: "Italy"
      },
      descriptions: {
        tokyo: "A charming city where tradition and modernity harmonize",
        paris: "The city of love and art, a romantic travel destination",
        jeju: "An island with beautiful nature and healing",
        newYork: "The city of dreams, a land of infinite possibilities",
        bangkok: "A Southeast Asian destination with delicious food and affordable prices",
        rome: "The eternal city, a treasure trove of history and art"
      }
    },
    popularItineraries: {
      title: "Popular Itineraries",
      subtitle: "Discover the best travel routes chosen by travelers worldwide",
      viewItinerary: "View Itinerary",
      itinerary1: {
        title: "4-Day Tokyo Exploration",
        description: "Experience the charm of Tokyo where tradition meets modernity. From Sensoji Temple to Tokyo Skytree, discover the true beauty of Japan."
      },
      itinerary2: {
        title: "5-Day Paris Discovery",
        description: "Create romantic moments in Paris, the city of love. Build special memories at the Eiffel Tower, Louvre Museum, and Champs-Élysées."
      },
      itinerary3: {
        title: "Seoul Cultural Journey",
        description: "Experience both traditional and modern Korean culture. From Gyeongbokgung Palace to Gangnam, discover Seoul's diverse charms."
      }
    },
    testimonials: {
      title: "User Reviews",
      subtitle: "Check out real reviews from travelers who used Plan Go",
      user1: {
        name: "Sarah Kim",
        review: "Plan Go made planning my perfect trip so easy! This AI helped me discover hidden gems I would never have found on my own. Plan Go truly offers an amazing travel experience!",
        date: "April 2025 Trip"
      },
      user2: {
        name: "Michael Park",
        review: "I used Plan Go to plan my family vacation and the kids loved it too! From child-friendly accommodations to fun activities, this amazing travel planner thought of everything we needed.",
        date: "March 2025 Trip"
      },
      user3: {
        name: "Lisa Lee",
        review: "I recently planned a solo backpacking trip with Plan Go! The detailed schedules and affordable recommendations were all perfect. Thank you Plan Go for such a wonderful experience!",
        date: "May 2025 Trip"
      }
    },
    footer: {
      description: "Create perfect trips with AI-powered custom travel planning.",
      services: {
        title: "Services",
        items: ["Create Itinerary", "Pricing Plans", "Popular Destinations"]
      },
      support: {
        title: "Support",
        items: ["FAQ", "Contact Us", "Terms of Service", "Privacy Policy"]
      },
      copyright: "© 2025 Plan Go. All rights reserved."
    }
  },
  zh: {
    logo: "Plan Go",
    nav: {
      createItinerary: "制定旅行计划",
      destinations: "热门目的地",
      community: "旅行社区",
      pricing: "价格方案",
      home: "首页",
      profile: "我的账户",
    },
    auth: {
      login: "登录",
      signup: "注册",
    },
    form: {
      email: "邮箱地址",
      emailPlaceholder: "example@email.com",
      password: "密码",
      passwordPlaceholder: "请输入密码",
      forgotPassword: "忘记密码",
      or: "或",
      noAccount: "还没有账户？",
      haveAccount: "已有账户？",
      firstName: "名",
      lastName: "姓",
      confirmPassword: "确认密码",
      confirmPasswordPlaceholder: "请再次输入密码",
      phone: "电话号码（可选）",
      phonePlaceholder: "010-1234-5678",
      terms: "我同意服务条款（必需）",
      privacy: "我同意隐私政策（必需）",
      marketing: "我同意接收营销信息（可选）",
    },
    social: {
      google: "使用Google登录",
      kakao: "使用Kakao登录",
      apple: "使用Apple登录",
      googleSignup: "使用Google注册",
      kakaoSignup: "使用Kakao注册",
      appleSignup: "使用Apple注册",
    },
    welcome: {
      title: "欢迎来到Plan Go！",
      subtitle: "与AI一起规划完美旅行",
    },
    hero: {
      title: "用AI定制行程",
      subtitle: "创造难忘的旅程",
      cta: "立即开始规划旅行",
    },
    features: {
      title: "体验Plan Go的卓越",
      subtitle: "Plan Go与其他旅行规划服务的不同之处",
      items: [
        {
          title: "个性化旅程",
          description: "AI根据您的偏好、兴趣和预算创建完美的定制旅行计划。"
        },
        {
          title: "快速高效规划",
          description: "几分钟内创建详细行程，节省时间和精力。"
        },
        {
          title: "可靠信息",
          description: "获取关于目的地、景点和旅行贴士的最新信息。"
        }
      ]
    },
    pricing: {
      title: "Plan Go 价格方案",
      subtitle: "选择适合您旅行规划需求的完美价格方案",
      aiIncluded: "所有方案都包含AI驱动的定制行程生成",
      free: {
        name: "免费",
        description: "基础旅行规划",
        button: "当前方案",
        features: {
          basicContent: "非常简单的旅行内容生成",
          basicInfo: "基础目的地信息",
          monthlyLimit: "每月1次行程生成"
        }
      },
      oneTime: {
        name: "单次通行证",
        description: "完美行程一次",
        button: "购买",
        features: {
          oneItinerary: "生成1次旅行行程",
          detailedContent: "包含详细旅行内容",
          recommendations: "餐厅和景点推荐",
          pdfDownload: "PDF下载支持"
        }
      },
      premium: {
        name: "高级版",
        badge: "高级版",
        description: "无限高级服务",
        period: "/ 年",
        button: "订阅",
        features: {
          unlimited: "无限行程生成",
          advanced: "所有高级定制功能",
          detailedInfo: "包含图片、链接等详细信息",
          realTimeEdit: "实时行程编辑",
          prioritySupport: "优先支持服务"
        }
      },
      comparison: {
        title: "方案比较",
        feature: "功能",
        itineraryCount: "行程生成次数",
        detailLevel: "详细程度",
        pdfDownload: "PDF下载",
        realTimeEdit: "实时编辑",
        prioritySupport: "优先支持",
        monthlyOne: "每月1次",
        oneTime: "1次",
        unlimited: "无限",
        basic: "基础",
        detailed: "详细",
        premium: "高级"
      },
      payment: {
        title: "支持的支付方式",
        card: "信用卡",
        cardDesc: "支持所有主要信用卡",
        mobile: "移动支付",
        mobileDesc: "KakaoPay, Toss, NaverPay",
        bank: "银行转账",
        bankDesc: "银行账户直接转账"
      },
      modal: {
        title: "支付信息",
        cardNumber: "卡号",
        expiry: "到期日",
        cvc: "CVC",
        name: "持卡人姓名",
        namePlaceholder: "张三",
        confirm: "完成支付"
      }
    },
    popularItineraries: {
      title: "热门行程",
      subtitle: "探索世界各地旅行者选择的最佳旅行路线",
      viewItinerary: "查看行程",
      itinerary1: {
        title: "4天东京探索",
        description: "体验传统与现代和谐融合的东京魅力。从浅草寺到东京晴空塔，发现日本的真正美丽。"
      },
      itinerary2: {
        title: "5天巴黎发现",
        description: "在爱情之都巴黎创造浪漫时刻。在埃菲尔铁塔、卢浮宫和香榭丽舍大街留下特殊回忆。"
      },
      itinerary3: {
        title: "首尔文化之旅",
        description: "体验韩国传统和现代文化。从景福宫到江南，发现首尔的多样魅力。"
      }
    },
    testimonials: {
      title: "用户评价",
      subtitle: "查看使用Plan Go的旅行者的真实评价",
      user1: {
        name: "李小雅",
        review: "Plan Go让我的旅行计划变得如此简单！这个AI帮我发现了我自己永远不会找到的隐藏宝石。Plan Go真的提供了令人惊叹的旅行体验！",
        date: "2025年4月旅行"
      },
      user2: {
        name: "王明浩",
        review: "我用Plan Go计划家庭度假，孩子们也很喜欢！从适合儿童的住宿到有趣的活动，这个神奇的旅行规划师考虑到了我们需要的一切。",
        date: "2025年3月旅行"
      },
      user3: {
        name: "张丽华",
        review: "我最近用Plan Go计划了一次独自背包旅行！详细的时间表和实惠的推荐都非常完美。感谢Plan Go给了我如此美好的体验！",
        date: "2025年5月旅行"
      }
    },
    footer: {
      description: "使用AI驱动的定制旅行规划，打造完美旅程。",
      services: {
        title: "服务",
        items: ["制定旅行计划", "价格方案", "热门目的地"]
      },
      support: {
        title: "支持",
        items: ["常见问题", "联系我们", "服务条款", "隐私政策"]
      },
      copyright: "© 2025 Plan Go. All rights reserved."
    }
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
    form: {
      email: "メールアドレス",
      emailPlaceholder: "example@email.com",
      password: "パスワード",
      passwordPlaceholder: "パスワードを入力してください",
      forgotPassword: "パスワードを忘れた方",
      or: "または",
      noAccount: "アカウントをお持ちでない方",
      haveAccount: "すでにアカウントをお持ちの方",
      firstName: "名",
      lastName: "姓",
      confirmPassword: "パスワード確認",
      confirmPasswordPlaceholder: "パスワードを再入力してください",
      phone: "電話番号（任意）",
      phonePlaceholder: "010-1234-5678",
      terms: "利用規約に同意します（必須）",
      privacy: "プライバシーポリシーに同意します（必須）",
      marketing: "マーケティング情報の受信に同意します（任意）",
    },
    social: {
      google: "Googleでログイン",
      kakao: "Kakaoでログイン",
      apple: "Appleでログイン",
      googleSignup: "Googleで登録",
      kakaoSignup: "Kakaoで登録",
      appleSignup: "Appleで登録",
    },
    welcome: {
      title: "Plan Goへようこそ！",
      subtitle: "AIと一緒に完璧な旅行を計画しましょう",
    },
    hero: {
      title: "AI駆動のカスタム旅程で",
      subtitle: "忘れられない旅を作りましょう",
      cta: "今すぐ旅行を計画する",
    },
    features: {
      title: "Plan Goの優秀性を体験",
      subtitle: "Plan Goが他の旅行計画サービスと違う理由",
      items: [
        {
          title: "パーソナライズされた旅程",
          description: "AIがあなたの好み、興味、予算に基づいて完璧なカスタム旅行計画を作成します。"
        },
        {
          title: "迅速で効率的な計画",
          description: "数分で詳細な旅程を作成し、時間と労力を節約します。"
        },
        {
          title: "信頼できる情報",
          description: "目的地、観光スポット、旅行のヒントに関する最新情報を入手してください。"
        }
      ]
    },
    pricing: {
      title: "Plan Go 料金プラン",
      subtitle: "あなたの旅行計画のニーズに最適な料金プランをお選びください",
      aiIncluded: "すべてのプランにはAI搭載のカスタム旅程生成が含まれています",
      free: {
        name: "無料",
        description: "基本的な旅行計画",
        button: "現在のプラン",
        features: {
          basicContent: "とてもシンプルな旅行コンテンツ生成",
          basicInfo: "基本的な目的地情報",
          monthlyLimit: "月1回の旅程生成"
        }
      },
      oneTime: {
        name: "ワンタイムパス",
        description: "完璧な旅程を1回",
        button: "購入",
        features: {
          oneItinerary: "1回の旅行旅程生成",
          detailedContent: "詳細な旅行コンテンツを含む",
          recommendations: "レストランと観光地の推薦",
          pdfDownload: "PDFダウンロードサポート"
        }
      },
      premium: {
        name: "プレミアム",
        badge: "プレミアム",
        description: "無制限プレミアムサービス",
        period: "/ 年間",
        button: "登録",
        features: {
          unlimited: "無制限旅程生成",
                      advanced: "すべての高度なカスタマイズ機能",
          detailedInfo: "画像、リンクなどの詳細情報を含む",
          realTimeEdit: "リアルタイム旅程編集",
          prioritySupport: "優先サポートサービス"
        }
      },
      comparison: {
        title: "プラン比較",
        feature: "機能",
        itineraryCount: "旅程生成回数",
        detailLevel: "詳細レベル",
        pdfDownload: "PDFダウンロード",
        realTimeEdit: "リアルタイム編集",
        prioritySupport: "優先サポート",
        monthlyOne: "月1回",
        oneTime: "1回",
        unlimited: "無制限",
        basic: "基本",
        detailed: "詳細",
        premium: "プレミアム"
      },
      payment: {
        title: "対応支払い方法",
        card: "クレジットカード",
        cardDesc: "すべての主要クレジットカードに対応",
        mobile: "モバイル決済",
        mobileDesc: "KakaoPay, Toss, NaverPay",
        bank: "銀行振込",
        bankDesc: "銀行口座から直接振込"
      },
      modal: {
        title: "支払い情報",
        cardNumber: "カード番号",
        expiry: "有効期限",
        cvc: "CVC",
        name: "カード名義人",
        namePlaceholder: "田中太郎",
        confirm: "支払い完了"
      }
    },
    popularItineraries: {
      title: "人気の旅程",
      subtitle: "世界中の旅行者が選ぶ最高の旅行ルートを発見してください",
      viewItinerary: "旅程を見る",
      itinerary1: {
        title: "4日間の東京探索",
        description: "伝統とモダンが調和する東京の魅力を体験してください。浅草寺から東京スカイツリーまで、日本の真の美しさを発見できます。"
      },
      itinerary2: {
        title: "5日間のパリ発見",
        description: "愛の都パリでロマンチックな瞬間を作りましょう。エッフェル塔、ルーブル美術館、シャンゼリゼ通りで特別な思い出を作ってください。"
      },
      itinerary3: {
        title: "ソウル文化の旅",
        description: "韓国の伝統と現代文化の両方を体験してください。景福宮から江南まで、ソウルの多様な魅力を発見してください。"
      }
    },
    testimonials: {
      title: "ユーザーレビュー",
      subtitle: "Plan Goを使用した旅行者の実際のレビューをご覧ください",
      user1: {
        name: "田中花子",
        review: "Plan Goのおかげで旅行計画がとても簡単になりました！このAIは私が一人では見つけられなかった隠れた名所を発見してくれました。Plan Goは本当に素晴らしい旅行体験を提供してくれます！",
        date: "2025年4月旅行"
      },
      user2: {
        name: "佐藤太郎",
        review: "Plan Goで家族旅行を計画しましたが、子供たちも大喜びでした！子供向けの宿泊施設から楽しいアクティビティまで、この素晴らしい旅行プランナーは私たちが必要とするすべてを考えてくれました。",
        date: "2025年3月旅行"
      },
      user3: {
        name: "山田美咲",
        review: "最近Plan Goで一人バックパッキング旅行を計画しました！詳細なスケジュールと手頃な価格の推奨事項はすべて完璧でした。Plan Goのおかげで素晴らしい体験ができました！",
        date: "2025年5月旅行"
      }
    },
    footer: {
      description: "AI駆動のカスタム旅行計画で完璧な旅行を作成しましょう。",
      services: {
        title: "サービス",
        items: ["旅行プランを作成", "料金プラン", "人気の目的地"]
      },
      support: {
        title: "サポート",
        items: ["よくある質問", "お問い合わせ", "利用規約", "プライバシーポリシー"]
      },
      copyright: "© 2025 Plan Go. All rights reserved."
    }
  },
  vi: {
    logo: "Plan Go",
    nav: {
      createItinerary: "Tạo Lịch Trình",
      destinations: "Điểm Đến Phổ Biến",
      community: "Cộng Đồng Du Lịch",
      pricing: "Bảng Giá",
      home: "Trang Chủ",
      profile: "Tài Khoản",
    },
    auth: {
      login: "Đăng Nhập",
      signup: "Đăng Ký",
    },
    form: {
      email: "Địa Chỉ Email",
      emailPlaceholder: "example@email.com",
      password: "Mật Khẩu",
      passwordPlaceholder: "Nhập mật khẩu của bạn",
      forgotPassword: "Quên Mật Khẩu",
      or: "hoặc",
      noAccount: "Chưa có tài khoản?",
      haveAccount: "Đã có tài khoản?",
      firstName: "Tên",
      lastName: "Họ",
      confirmPassword: "Xác Nhận Mật Khẩu",
      confirmPasswordPlaceholder: "Nhập lại mật khẩu",
      phone: "Số Điện Thoại (Tùy chọn)",
      phonePlaceholder: "010-1234-5678",
      terms: "Tôi đồng ý với Điều khoản Dịch vụ (Bắt buộc)",
      privacy: "Tôi đồng ý với Chính sách Bảo mật (Bắt buộc)",
      marketing: "Tôi đồng ý nhận thông tin marketing (Tùy chọn)",
    },
    social: {
      google: "Đăng nhập với Google",
      kakao: "Đăng nhập với Kakao",
      apple: "Đăng nhập với Apple",
      googleSignup: "Đăng ký với Google",
      kakaoSignup: "Đăng ký với Kakao",
      appleSignup: "Đăng ký với Apple",
    },
    welcome: {
      title: "Chào mừng đến với Plan Go!",
      subtitle: "Lập kế hoạch du lịch hoàn hảo với AI",
    },
    hero: {
      title: "Hành trình tùy chỉnh bằng AI",
      subtitle: "Tạo những chuyến đi khó quên",
      cta: "Lập kế hoạch du lịch ngay bây giờ",
    },
    features: {
      title: "Trải nghiệm sự xuất sắc của Plan Go",
      subtitle: "Lý do Plan Go khác biệt với các dịch vụ lập kế hoạch du lịch khác",
      items: [
        {
          title: "Hành trình tùy chỉnh",
          description: "AI tạo kế hoạch du lịch tùy chỉnh hoàn hảo dựa trên sở thích, sở thích và ngân sách của bạn."
        },
        {
          title: "Lập kế hoạch nhanh chóng và hiệu quả",
          description: "Tạo lịch trình chi tiết trong vài phút để tiết kiệm thời gian và công sức."
        },
        {
          title: "Thông tin đáng tin cậy",
          description: "Nhận thông tin cập nhật về điểm đến, điểm tham quan và mẹo du lịch."
        }
      ]
    },
    pricing: {
      title: "Bảng Giá Plan Go",
      subtitle: "Chọn gói giá hoàn hảo cho nhu cầu lập kế hoạch du lịch của bạn",
      aiIncluded: "Tất cả gói đều bao gồm tạo lịch trình tùy chỉnh bằng AI",
      free: {
        name: "Miễn phí",
        description: "Lập kế hoạch du lịch cơ bản",
        button: "Gói hiện tại",
        features: {
          basicContent: "Tạo nội dung du lịch rất đơn giản",
          basicInfo: "Thông tin điểm đến cơ bản",
          monthlyLimit: "Tạo 1 lịch trình mỗi tháng"
        }
      },
      oneTime: {
        name: "Vé một lần",
        description: "Lịch trình hoàn hảo một lần",
        button: "Mua",
        features: {
          oneItinerary: "Tạo 1 lịch trình du lịch",
          detailedContent: "Bao gồm nội dung du lịch chi tiết",
          recommendations: "Gợi ý nhà hàng và điểm tham quan",
          pdfDownload: "Hỗ trợ tải xuống PDF"
        }
      },
      premium: {
        name: "Cao cấp",
        badge: "Cao cấp",
        description: "Dịch vụ cao cấp không giới hạn",
        period: "/ năm",
        button: "Đăng ký",
        features: {
          unlimited: "Tạo lịch trình không giới hạn",
          advanced: "Tất cả tính năng tùy chỉnh nâng cao",
          detailedInfo: "Bao gồm hình ảnh, liên kết và thông tin chi tiết",
          realTimeEdit: "Chỉnh sửa lịch trình thời gian thực",
          prioritySupport: "Dịch vụ hỗ trợ ưu tiên"
        }
      },
      comparison: {
        title: "So sánh gói",
        feature: "Tính năng",
        itineraryCount: "Số lần tạo lịch trình",
        detailLevel: "Mức độ chi tiết",
        pdfDownload: "Tải xuống PDF",
        realTimeEdit: "Chỉnh sửa thời gian thực",
        prioritySupport: "Hỗ trợ ưu tiên",
        monthlyOne: "1 lần/tháng",
        oneTime: "1 lần",
        unlimited: "Không giới hạn",
        basic: "Cơ bản",
        detailed: "Chi tiết",
        premium: "Cao cấp"
      },
      payment: {
        title: "Phương thức thanh toán được hỗ trợ",
        card: "Thẻ tín dụng",
        cardDesc: "Hỗ trợ tất cả thẻ tín dụng chính",
        mobile: "Thanh toán di động",
        mobileDesc: "KakaoPay, Toss, NaverPay",
        bank: "Chuyển khoản ngân hàng",
        bankDesc: "Chuyển khoản trực tiếp từ tài khoản ngân hàng"
      },
      modal: {
        title: "Thông tin thanh toán",
        cardNumber: "Số thẻ",
        expiry: "Ngày hết hạn",
        cvc: "CVC",
        name: "Tên chủ thẻ",
        namePlaceholder: "Nguyễn Văn A",
        confirm: "Hoàn tất thanh toán"
      }
    },
    destinations: {
      title: "Điểm Đến Phổ Biến",
      subtitle: "Khám phá những điểm đến hàng đầu thế giới được yêu thích bởi du khách khắp nơi",
      searchPlaceholder: "Tìm kiếm thành phố hoặc quốc gia...",
      regionSelect: "Chọn Khu Vực",
      allRegions: "Tất Cả Khu Vực",
      styleSelect: "Phong Cách Du Lịch",
      recommendedDuration: "Thời Gian Khuyến Nghị",
      recommendedPeople: "Kích Thước Nhóm Khuyến Nghị",
      createItinerary: "Tạo Lịch Trình",
      viewDetails: "Xem Chi Tiết",
      loadMore: "Xem Thêm Điểm Đến",
      regions: {
        asia: "Châu Á",
        europe: "Châu Âu",
        northAmerica: "Bắc Mỹ",
        southAmerica: "Nam Mỹ",
        africa: "Châu Phi",
        oceania: "Châu Đại Dương"
      },
      tags: {
        culture: "Văn Hóa",
        food: "Ẩm Thực",
        shopping: "Mua Sắm",
        romantic: "Lãng Mạn",
        art: "Nghệ Thuật",
        history: "Lịch Sử",
        nature: "Thiên Nhiên",
        healing: "Nghỉ Dưỡng",
        beach: "Bãi Biển",
        city: "Thành Phố",
        affordable: "Giá Cả Phải Chăng",
        adventure: "Phiêu Lưu"
      },
      cities: {
        tokyo: "Tokyo",
        paris: "Paris",
        jeju: "Đảo Jeju",
        newYork: "New York",
        bangkok: "Bangkok",
        rome: "Roma"
      },
      countries: {
        japan: "Nhật Bản",
        france: "Pháp",
        korea: "Hàn Quốc",
        usa: "Mỹ",
        thailand: "Thái Lan",
        italy: "Ý"
      },
      descriptions: {
        tokyo: "Thành phố quyến rũ nơi truyền thống hòa quyện với hiện đại",
        paris: "Thành phố tình yêu và nghệ thuật, điểm đến lãng mạn",
        jeju: "Hòn đảo với thiên nhiên tuyệt đẹp và không gian nghỉ dưỡng",
        newYork: "Thành phố của những giấc mơ, vùng đất của những khả năng vô hạn",
        bangkok: "Điểm đến Đông Nam Á với ẩm thực ngon và giá cả phải chăng",
        rome: "Thành phố vĩnh cửu, kho báu lịch sử và nghệ thuật"
      }
    },
    popularItineraries: {
      title: "Lịch Trình Phổ Biến",
      subtitle: "Khám phá những tuyến du lịch tốt nhất được lựa chọn bởi du khách trên toàn thế giới",
      viewItinerary: "Xem Lịch Trình",
      itinerary1: {
        title: "Khám Phá Tokyo 4 Ngày",
        description: "Trải nghiệm sự quyến rũ của Tokyo nơi truyền thống hòa quyện với hiện đại. Từ Chùa Sensoji đến Tokyo Skytree, khám phá vẻ đẹp thực sự của Nhật Bản."
      },
      itinerary2: {
        title: "Khám Phá Paris 5 Ngày",
        description: "Tạo những khoảnh khắc lãng mạn ở Paris, thành phố tình yêu. Xây dựng những kỷ niệm đặc biệt tại Tháp Eiffel, Bảo tàng Louvre và Đại lộ Champs-Élysées."
      },
      itinerary3: {
        title: "Hành Trình Văn Hóa Seoul",
        description: "Trải nghiệm cả văn hóa truyền thống và hiện đại của Hàn Quốc. Từ Cung điện Gyeongbokgung đến Gangnam, khám phá những nét quyến rũ đa dạng của Seoul."
      }
    },
    testimonials: {
      title: "Đánh Giá Người Dùng",
      subtitle: "Xem những đánh giá thực tế từ các du khách đã sử dụng Plan Go",
      user1: {
        name: "Nguyễn Thị Lan",
        review: "Plan Go đã làm cho việc lập kế hoạch chuyến đi hoàn hảo của tôi trở nên rất dễ dàng! AI này đã giúp tôi khám phá những viên ngọc ẩn mà tôi không bao giờ có thể tự mình tìm thấy. Plan Go thực sự mang đến trải nghiệm du lịch tuyệt vời!",
        date: "Chuyến đi tháng 4 năm 2025"
      },
      user2: {
        name: "Trần Văn Minh",
        review: "Tôi đã sử dụng Plan Go để lập kế hoạch cho kỳ nghỉ gia đình và các con cũng rất thích! Từ chỗ ở thân thiện với trẻ em đến các hoạt động vui nhộn, người lập kế hoạch du lịch tuyệt vời này đã nghĩ đến mọi thứ chúng tôi cần.",
        date: "Chuyến đi tháng 3 năm 2025"
      },
      user3: {
        name: "Lê Thị Mai",
        review: "Gần đây tôi đã lập kế hoạch cho một chuyến du lịch ba lô một mình với Plan Go! Các lịch trình chi tiết và những gợi ý giá cả phải chăng đều hoàn hảo. Cảm ơn Plan Go vì đã mang lại cho tôi trải nghiệm tuyệt vời như vậy!",
        date: "Chuyến đi tháng 5 năm 2025"
      }
    },
    footer: {
      description: "Tạo chuyến đi hoàn hảo với kế hoạch du lịch tùy chỉnh bằng AI.",
      services: {
        title: "Dịch vụ",
        items: ["Tạo Lịch Trình", "Bảng Giá", "Điểm Đến Phổ Biến"]
      },
      support: {
        title: "Hỗ trợ",
        items: ["Câu hỏi thường gặp", "Liên hệ", "Điều khoản Dịch vụ", "Chính sách Bảo mật"]
      },
      copyright: "© 2025 Plan Go. All rights reserved."
    }
  },
  id: {
    logo: "Plan Go",
    nav: {
      createItinerary: "Buat Itinerary",
      destinations: "Destinasi Populer",
      community: "Komunitas Travel",
      pricing: "Harga",
      home: "Beranda",
      profile: "Akun Saya",
    },
    auth: {
      login: "Masuk",
      signup: "Daftar",
    },
    form: {
      email: "Alamat Email",
      emailPlaceholder: "example@email.com",
      password: "Kata Sandi",
      passwordPlaceholder: "Masukkan kata sandi Anda",
      forgotPassword: "Lupa Kata Sandi",
      or: "atau",
      noAccount: "Belum punya akun?",
      haveAccount: "Sudah punya akun?",
      firstName: "Nama Depan",
      lastName: "Nama Belakang",
      confirmPassword: "Konfirmasi Kata Sandi",
      confirmPasswordPlaceholder: "Masukkan ulang kata sandi",
      phone: "Nomor Telepon (Opsional)",
      phonePlaceholder: "010-1234-5678",
      terms: "Saya setuju dengan Syarat Layanan (Wajib)",
      privacy: "Saya setuju dengan Kebijakan Privasi (Wajib)",
      marketing: "Saya setuju menerima informasi marketing (Opsional)",
    },
    social: {
      google: "Masuk dengan Google",
      kakao: "Masuk dengan Kakao",
      apple: "Masuk dengan Apple",
      googleSignup: "Daftar dengan Google",
      kakaoSignup: "Daftar dengan Kakao",
      appleSignup: "Daftar dengan Apple",
    },
    welcome: {
      title: "Selamat datang di Plan Go!",
      subtitle: "Rencanakan perjalanan sempurna dengan AI",
    },
    hero: {
      title: "Perjalanan kustom bertenaga AI",
      subtitle: "Ciptakan perjalanan yang tak terlupakan",
      cta: "Rencanakan perjalanan Anda sekarang",
    },
    features: {
      title: "Rasakan Keunggulan Plan Go",
      subtitle: "Mengapa Plan Go berbeda dari layanan perencanaan perjalanan lainnya",
      items: [
        {
          title: "Perjalanan Kustom",
          description: "AI menciptakan rencana perjalanan kustom yang sempurna berdasarkan preferensi, minat, dan anggaran Anda."
        },
        {
          title: "Perencanaan Cepat dan Efisien",
          description: "Buat itinerary detail dalam hitungan menit untuk menghemat waktu dan tenaga."
        },
        {
          title: "Informasi Terpercaya",
          description: "Dapatkan informasi terkini tentang destinasi, tempat wisata, dan tips perjalanan."
        }
      ]
    },
    pricing: {
      title: "Harga Plan Go",
      subtitle: "Pilih paket harga yang sempurna untuk kebutuhan perencanaan perjalanan Anda",
      aiIncluded: "Semua paket termasuk pembuatan itinerary kustom bertenaga AI",
      free: {
        name: "Gratis",
        description: "Perencanaan perjalanan dasar",
        button: "Paket saat ini",
        features: {
          basicContent: "Pembuatan konten perjalanan yang sangat sederhana",
          basicInfo: "Informasi destinasi dasar",
          monthlyLimit: "1 itinerary per bulan"
        }
      },
      oneTime: {
        name: "Tiket sekali pakai",
        description: "Itinerary sempurna sekali",
        button: "Beli",
        features: {
          oneItinerary: "Buat 1 itinerary perjalanan",
          detailedContent: "Termasuk konten perjalanan detail",
          recommendations: "Rekomendasi restoran dan tempat wisata",
          pdfDownload: "Dukungan unduh PDF"
        }
      },
      premium: {
        name: "Premium",
        badge: "Premium",
        description: "Layanan premium tanpa batas",
        period: "/ tahun",
        button: "Berlangganan",
        features: {
          unlimited: "Pembuatan itinerary tanpa batas",
          advanced: "Semua fitur kustomisasi lanjutan",
          detailedInfo: "Termasuk gambar, tautan dan informasi detail",
          realTimeEdit: "Pengeditan itinerary real-time",
          prioritySupport: "Layanan dukungan prioritas"
        }
      },
      comparison: {
        title: "Perbandingan paket",
        feature: "Fitur",
        itineraryCount: "Jumlah pembuatan itinerary",
        detailLevel: "Tingkat detail",
        pdfDownload: "Unduh PDF",
        realTimeEdit: "Pengeditan real-time",
        prioritySupport: "Dukungan prioritas",
        monthlyOne: "1 per bulan",
        oneTime: "1 kali",
        unlimited: "Tanpa batas",
        basic: "Dasar",
        detailed: "Detail",
        premium: "Premium"
      },
      payment: {
        title: "Metode pembayaran yang didukung",
        card: "Kartu kredit",
        cardDesc: "Mendukung semua kartu kredit utama",
        mobile: "Pembayaran mobile",
        mobileDesc: "KakaoPay, Toss, NaverPay",
        bank: "Transfer bank",
        bankDesc: "Transfer langsung dari rekening bank"
      },
      modal: {
        title: "Informasi pembayaran",
        cardNumber: "Nomor kartu",
        expiry: "Tanggal kedaluwarsa",
        cvc: "CVC",
        name: "Nama pemegang kartu",
        namePlaceholder: "John Doe",
        confirm: "Selesaikan pembayaran"
      }
    },
    destinations: {
      title: "Destinasi Populer",
      subtitle: "Temukan destinasi perjalanan terbaik dunia yang dicintai oleh traveler di mana-mana",
      searchPlaceholder: "Cari kota atau negara...",
      regionSelect: "Pilih Wilayah",
      allRegions: "Semua Wilayah",
      styleSelect: "Gaya Perjalanan",
      recommendedDuration: "Durasi Rekomendasi",
      recommendedPeople: "Ukuran Grup Rekomendasi",
      createItinerary: "Buat Itinerary",
      viewDetails: "Lihat Detail",
      loadMore: "Lihat Lebih Banyak Destinasi",
      regions: {
        asia: "Asia",
        europe: "Eropa",
        northAmerica: "Amerika Utara",
        southAmerica: "Amerika Selatan",
        africa: "Afrika",
        oceania: "Oseania"
      },
      tags: {
        culture: "Budaya",
        food: "Makanan",
        shopping: "Belanja",
        romantic: "Romantis",
        art: "Seni",
        history: "Sejarah",
        nature: "Alam",
        healing: "Penyembuhan",
        beach: "Pantai",
        city: "Kota",
        affordable: "Terjangkau",
        adventure: "Petualangan"
      },
      cities: {
        tokyo: "Tokyo",
        paris: "Paris",
        jeju: "Pulau Jeju",
        newYork: "New York",
        bangkok: "Bangkok",
        rome: "Roma"
      },
      countries: {
        japan: "Jepang",
        france: "Prancis",
        korea: "Korea Selatan",
        usa: "Amerika Serikat",
        thailand: "Thailand",
        italy: "Italia"
      },
      descriptions: {
        tokyo: "Kota menawan di mana tradisi dan modernitas berpadu harmonis",
        paris: "Kota cinta dan seni, destinasi romantis",
        jeju: "Pulau dengan alam indah dan energi penyembuhan",
        newYork: "Kota impian, tanah kemungkinan tak terbatas",
        bangkok: "Destinasi Asia Tenggara dengan makanan lezat dan harga terjangkau",
        rome: "Kota abadi, harta karun sejarah dan seni"
      }
    },
    popularItineraries: {
      title: "Itinerary Populer",
      subtitle: "Temukan rute perjalanan terbaik yang dipilih oleh traveler di seluruh dunia",
      viewItinerary: "Lihat Itinerary",
      itinerary1: {
        title: "Eksplorasi Tokyo 4 Hari",
        description: "Rasakan pesona Tokyo di mana tradisi bertemu dengan modernitas. Dari Kuil Sensoji hingga Tokyo Skytree, temukan keindahan sejati Jepang."
      },
      itinerary2: {
        title: "Penemuan Paris 5 Hari",
        description: "Ciptakan momen romantis di Paris, kota cinta. Bangun kenangan spesial di Menara Eiffel, Museum Louvre, dan Champs-Élysées."
      },
      itinerary3: {
        title: "Perjalanan Budaya Seoul",
        description: "Alami budaya tradisional dan modern Korea. Dari Istana Gyeongbokgung hingga Gangnam, temukan pesona Seoul yang beragam."
      }
    },
    testimonials: {
      title: "Ulasan Pengguna",
      subtitle: "Lihat ulasan nyata dari traveler yang telah menggunakan Plan Go",
      user1: {
        name: "Sari Dewi",
        review: "Plan Go membuat perencanaan perjalanan sempurna saya menjadi sangat mudah! AI ini membantu saya menemukan permata tersembunyi yang tidak akan pernah saya temukan sendiri. Plan Go benar-benar menawarkan pengalaman perjalanan yang luar biasa!",
        date: "Perjalanan April 2025"
      },
      user2: {
        name: "Budi Santoso",
        review: "Saya menggunakan Plan Go untuk merencanakan liburan keluarga dan anak-anak juga menyukainya! Dari akomodasi ramah anak hingga aktivitas menyenangkan, perencana perjalanan luar biasa ini memikirkan semua yang kami butuhkan.",
        date: "Perjalanan Maret 2025"
      },
      user3: {
        name: "Maya Putri",
        review: "Saya baru-baru ini merencanakan perjalanan backpacking solo dengan Plan Go! Jadwal detail dan rekomendasi terjangkau semuanya sempurna. Terima kasih Plan Go atas pengalaman luar biasa seperti itu!",
        date: "Perjalanan Mei 2025"
      }
    },
    footer: {
      description: "Ciptakan perjalanan sempurna dengan perencanaan perjalanan kustom bertenaga AI.",
      services: {
        title: "Layanan",
        items: ["Buat Itinerary", "Harga", "Destinasi Populer"]
      },
      support: {
        title: "Dukungan",
        items: ["FAQ", "Hubungi Kami", "Syarat Layanan", "Kebijakan Privasi"]
      },
      copyright: "© 2025 Plan Go. All rights reserved."
    }
  },
}

interface LanguageWrapperProps {
  children: React.ReactNode
}

export function LanguageWrapper({ children }: LanguageWrapperProps) {
  const { language } = useLanguage()
  useScrollPosition()

  return <div key={language}>{children}</div>
}

export function useTranslations() {
  const { language } = useLanguage()
  return translations[language as keyof typeof translations] || translations.ko
}
