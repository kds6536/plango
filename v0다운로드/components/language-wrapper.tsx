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
