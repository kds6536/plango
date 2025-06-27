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
