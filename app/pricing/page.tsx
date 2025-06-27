"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, CreditCard, Shield, Plane, Star, Zap, Crown, Smartphone, Wallet, Building2 } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("")

  const handlePurchase = (planName: string) => {
    setSelectedPlan(planName)
    setIsPaymentOpen(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Plane className="w-7 h-7 text-white transform rotate-45" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Plan Go
            </span>
          </Link>
          <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Plan Go 요금제
          </h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
            여행 계획의 필요에 맞는 완벽한 요금제를 선택하세요
            <br />
            <span className="text-blue-600 font-semibold">모든 플랜에는 AI 기반 맞춤형 일정 생성이 포함됩니다</span>
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto mb-20">
          {/* Free Plan */}
          <Card className="relative border-2 border-border shadow-xl hover:shadow-2xl transition-all duration-300 bg-card">
            <CardHeader className="text-center pb-8 pt-12">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-500 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground mb-2">무료</CardTitle>
              <div className="text-6xl font-black mt-6 text-foreground">$0</div>
              <p className="text-muted-foreground mt-3 text-lg font-medium">기본 여행 계획</p>
            </CardHeader>
            <CardContent className="px-8 pb-12">
              <ul className="space-y-5 mb-10">
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground">아주 간단한 여행 내용 생성</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground">기본 목적지 정보</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground">월 1회 일정 생성</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full h-16 text-lg font-semibold border-2 border-border">
                현재 플랜
              </Button>
            </CardContent>
          </Card>

          {/* One-time Plan */}
          <Card className="relative border-2 border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-300 bg-card">
            <CardHeader className="text-center pb-8 pt-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground mb-2">1회 이용권</CardTitle>
              <div className="text-6xl font-black mt-6 text-blue-600">$20</div>
              <p className="text-muted-foreground mt-3 text-lg font-medium">완벽한 일정 1회</p>
            </CardHeader>
            <CardContent className="px-8 pb-12">
              <ul className="space-y-5 mb-10">
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground">여행 일정 1회 생성 가능</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground">상세한 여행 내용 포함</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground">맛집 및 명소 추천</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground">PDF 다운로드 지원</span>
                </li>
              </ul>
              <Button
                onClick={() => handlePurchase("1회 이용권")}
                className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
              >
                구매하기
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
                      <Card className="relative border-4 border-purple-500 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-card transform scale-105">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg flex items-center">
                <Crown className="w-5 h-5 mr-2" />
                프리미엄
              </span>
            </div>
            <CardHeader className="text-center pb-8 pt-16">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground mb-2">프리미엄</CardTitle>
              <div className="text-6xl font-black mt-6 text-purple-600">
                $50 <span className="text-2xl font-normal text-muted-foreground">/ 연간</span>
              </div>
              <p className="text-muted-foreground mt-3 text-lg font-medium">무제한 프리미엄 서비스</p>
            </CardHeader>
            <CardContent className="px-8 pb-12">
              <ul className="space-y-5 mb-10">
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground font-medium">무제한 일정 생성</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground font-medium">모든 고급 맞춤 설정 기능</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground font-medium">이미지, 링크 등 상세 정보 포함</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground font-medium">실시간 일정 수정</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground font-medium">우선 지원 서비스</span>
                </li>
              </ul>
              <Button
                onClick={() => handlePurchase("프리미엄")}
                className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
              >
                구독하기
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Comparison */}
        <div className="max-w-6xl mx-auto mb-20">
          <Card className="border-0 shadow-2xl bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-4xl text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                플랜 비교
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="pb-6 text-xl font-bold text-foreground">기능</th>
                      <th className="pb-6 text-xl font-bold text-center text-foreground">무료</th>
                      <th className="pb-6 text-xl font-bold text-center text-foreground">1회 이용권</th>
                      <th className="pb-6 text-xl font-bold text-center text-purple-600">프리미엄</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-4">
                    {[
                      ["일정 생성 횟수", "월 1회", "1회", "무제한"],
                      ["상세 정보", "기본", "상세", "프리미엄"],
                      ["PDF 다운로드", "❌", "✅", "✅"],
                      ["실시간 수정", "❌", "❌", "✅"],
                      ["우선 지원", "❌", "❌", "✅"],
                    ].map(([feature, free, oneTime, premium], index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="py-6 font-semibold text-lg text-foreground">{feature}</td>
                        <td className="py-6 text-center text-lg text-muted-foreground">{free}</td>
                        <td className="py-6 text-center text-lg text-muted-foreground">{oneTime}</td>
                        <td className="py-6 text-center text-lg font-semibold text-purple-600">{premium}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Dialog */}
        <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
          <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl text-center">결제 정보 - {selectedPlan}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="cardNumber" className="text-sm">
                    카드 번호
                  </Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="h-10" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="expiryDate" className="text-sm">
                    만료일
                  </Label>
                  <Input id="expiryDate" placeholder="MM/YY" className="h-10" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="cvv" className="text-sm">
                    CVV
                  </Label>
                  <Input id="cvv" placeholder="123" className="h-10" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="cardName" className="text-sm">
                    카드 소유자명
                  </Label>
                  <Input id="cardName" placeholder="홍길동" className="h-10" />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h3 className="font-semibold text-base">지원 결제 수단</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2 p-2 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">Stripe</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                    <Smartphone className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium">Toss</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                    <Wallet className="w-5 h-5 text-blue-700" />
                    <span className="text-sm font-medium">PayPal</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                    <Building2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">네이버페이</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                    <svg className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3c2.755 0 5.455.232 8.083.678 1.275.217 2.22 1.206 2.22 2.32v.859c0 .79-.479 1.501-1.212 1.807-.24.1-.49.18-.748.24v8.553c0 1.657-1.343 3-3 3H6.657c-1.657 0-3-1.343-3-3V8.904c-.258-.06-.508-.14-.748-.24C2.176 8.358 1.697 7.647 1.697 6.857v-.859c0-1.114.945-2.103 2.22-2.32C6.545 3.232 9.245 3 12 3z" />
                    </svg>
                    <span className="text-sm font-medium">카카오페이</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                    <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span className="text-sm font-medium">삼성페이</span>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-800 text-sm">안전한 결제</span>
                </div>
                <p className="text-green-700 text-xs">모든 결제 정보는 SSL 암호화로 보호됩니다.</p>
              </div>

              {/* Subscription Info */}
              <div className="space-y-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
                <p className="flex items-center text-xs">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  자동 결제: 구독 서비스는 자동으로 갱신됩니다.
                </p>
                <p className="flex items-center text-xs">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  언제든지 취소 가능: 계정 설정에서 구독을 취소할 수 있습니다.
                </p>
                <p className="flex items-center text-xs">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  환불 정책: 구매 후 7일 이내 사용횟수만큼 차감한 금액을 환불해드립니다.
                </p>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-4 rounded-xl shadow-lg">
                💳 결제 완료
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
