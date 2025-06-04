"use client"

import type React from "react"
import { useLanguage } from "hooks/use-language"
import { useScrollPosition } from "hooks/use-scroll-position"

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
    destinations: {
      title: "인기 여행지",
      subtitle: "전 세계 여행자들이 사랑하는 최고의 여행 목적지를 발견하세요",
      searchPlaceholder: "도시나 국가를 검색하세요...",
      region: "지역 선택",
      style: "여행 스타일",
      asia: "아시아",
      europe: "유럽",
      america: "아메리카",
      oceania: "오세아니아",
      culture: "문화",
      nature: "자연",
      food: "음식",
      romantic: "로맨틱",
      adventure: "모험",
      duration: "추천 기간",
      travelers: "추천 인원",
      createPlan: "일정 만들기",
      viewDetail: "자세히 보기",
      cards: [
        {
          name: "도쿄",
          country: "일본",
          description: "전통과 현대가 조화를 이루는 매력적인 도시"
        },
        {
          name: "파리",
          country: "프랑스",
          description: "사랑과 예술의 도시, 로맨틱한 여행지"
        },
        {
          name: "제주도",
          country: "한국",
          description: "아름다운 자연과 힐링이 있는 섬"
        },
        {
          name: "뉴욕",
          country: "미국",
          description: "꿈의 도시, 무한한 가능성의 땅"
        },
        {
          name: "방콕",
          country: "태국",
          description: "맛있는 음식과 저렴한 물가의 동남아 여행지"
        },
        {
          name: "로마",
          country: "이탈리아",
          description: "영원한 도시, 역사와 예술의 보고"
        }
      ],
      loadMore: "더 많은 여행지 보기",
    },
    createItinerary: {
      title: "여행 일정 만들기",
      subtitle: "몇 가지 정보만 입력하시면 AI가 완벽한 맞춤형 여행 일정을 생성해드립니다 🎯",
      infoInput: "여행 정보 입력",
      destinationLabel: "국가 선택 또는 도시 입력",
      destinationPlaceholder: "예: 일본, 도쿄, 파리, 뉴욕...",
      dateLabel: "여행 날짜 선택",
      datePlaceholder: "날짜를 선택하세요",
      travelersLabel: "인원수",
      budgetLabel: "가능 예산",
      budgetPlaceholder: "예: 100만원, $2000, ¥200000...",
      budgetDesc: "숙박, 식사, 교통, 관광 등 전체 예산을 입력해주세요",
      ageLabel: "연령대 (복수 선택 가능)",
      ageOptions: ["10대", "20대", "30대", "40대", "50대 이상"],
      genderLabel: "성별",
      genderPlaceholder: "성별을 선택하세요",
      createButton: "맞춤 여행 일정 생성하기"
    },
    plans: {
      title: "여행 계획 만들기",
      desc: "AI가 추천하는 맞춤형 여행 계획을 만들어보세요.",
      destinationLabel: "여행지",
      destinationPlaceholder: "여행하고 싶은 도시나 국가를 입력하세요",
      periodLabel: "여행 기간",
      createButton: "계획 생성하기",
      aiRecommendCustomPlan: "AI가 추천하는 맞춤형 여행 계획을 만들어보세요.",
      destination: "여행지",
      enterCityOrCountry: "여행하고 싶은 도시나 국가를 입력하세요",
      tripDuration: "여행 기간",
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
  },
}

export interface Translations {
  logo: string;
  nav: {
    createItinerary: string;
    destinations: string;
    community: string;
    pricing: string;
    home: string;
    profile: string;
  };
  auth: {
    login: string;
    signup: string;
  };
  form: {
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    forgotPassword: string;
    or: string;
    noAccount: string;
    haveAccount: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
    confirmPasswordPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    terms: string;
    privacy: string;
    marketing: string;
  };
  social: {
    google: string;
    kakao: string;
    apple: string;
    googleSignup: string;
    kakaoSignup: string;
    appleSignup: string;
  };
  welcome: {
    title: string;
    subtitle: string;
  };
  destinations: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    region: string;
    style: string;
    asia: string;
    europe: string;
    america: string;
    oceania: string;
    culture: string;
    nature: string;
    food: string;
    romantic: string;
    adventure: string;
    duration: string;
    travelers: string;
    createPlan: string;
    viewDetail: string;
    cards: { name: string; country: string; description: string }[];
    loadMore: string;
  };
  createItinerary: {
    title: string;
    subtitle: string;
    infoInput: string;
    destinationLabel: string;
    destinationPlaceholder: string;
    dateLabel: string;
    datePlaceholder: string;
    travelersLabel: string;
    budgetLabel: string;
    budgetPlaceholder: string;
    budgetDesc: string;
    ageLabel: string;
    ageOptions: string[];
    genderLabel: string;
    genderPlaceholder: string;
    createButton: string;
  };
  plans: {
    title: string;
    desc: string;
    destinationLabel: string;
    destinationPlaceholder: string;
    periodLabel: string;
    createButton: string;
    aiRecommendCustomPlan: string;
    destination: string;
    enterCityOrCountry: string;
    tripDuration: string;
  };
}

interface LanguageWrapperProps {
  children: React.ReactNode
}

export function LanguageWrapper({ children }: LanguageWrapperProps) {
  const { language } = useLanguage()
  useScrollPosition()

  return <>{children}</>
}

export function useTranslations() {
  const { language } = useLanguage()
  return translations[language as keyof typeof translations] || translations.ko
}
