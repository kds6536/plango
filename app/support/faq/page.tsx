"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Search, Plane, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqData = [
    {
      category: "일반",
      questions: [
        {
          question: "Plan Go는 어떤 서비스인가요?",
          answer:
            "Plan Go는 AI 기반 여행 계획 서비스로, 사용자의 선호도와 예산에 맞춰 맞춤형 여행 일정을 자동으로 생성해드립니다. 목적지, 숙박, 맛집, 관광지 등 모든 여행 정보를 한 번에 제공합니다.",
        },
        {
          question: "무료로 사용할 수 있나요?",
          answer:
            "네, Plan Go는 기본적인 여행 일정 생성 기능을 무료로 제공합니다. 월 1회 일정 생성이 가능하며, 더 많은 기능을 원하시면 유료 플랜을 이용하실 수 있습니다.",
        },
        {
          question: "어떤 국가의 여행 계획을 세울 수 있나요?",
          answer:
            "전 세계 주요 여행 목적지에 대한 여행 계획을 세울 수 있습니다. 아시아, 유럽, 아메리카, 오세아니아 등 200개 이상의 국가와 도시를 지원합니다.",
        },
      ],
    },
    {
      category: "요금제",
      questions: [
        {
          question: "요금제는 어떻게 구성되어 있나요?",
          answer:
            "무료 플랜(월 1회), 1회 이용권($20), 프리미엄 연간 구독($50)으로 구성되어 있습니다. 각 플랜마다 제공되는 기능과 일정 생성 횟수가 다릅니다.",
        },
        {
          question: "구독을 취소할 수 있나요?",
          answer:
            "네, 언제든지 구독을 취소할 수 있습니다. 계정 설정에서 구독 관리 메뉴를 통해 취소하실 수 있으며, 취소 후에도 구독 기간이 끝날 때까지 서비스를 이용하실 수 있습니다.",
        },
        {
          question: "환불 정책은 어떻게 되나요?",
          answer:
            "구매 후 사용횟수를 차감한 금액만큼 환불해드립니다. 환불 요청은 고객센터를 통해 접수하실 수 있습니다.",
        },
      ],
    },
    {
      category: "기술적 문제",
      questions: [
        {
          question: "일정이 생성되지 않아요.",
          answer:
            "일정 생성에 문제가 있다면 다음을 확인해주세요: 1) 인터넷 연결 상태 2) 브라우저 새로고침 3) 입력 정보의 정확성. 문제가 지속되면 고객센터로 문의해주세요.",
        },
        {
          question: "생성된 일정을 수정할 수 있나요?",
          answer:
            "프리미엄 플랜에서는 실시간으로 일정을 수정할 수 있습니다. 무료 플랜과 1회 이용권에서는 새로운 일정을 다시 생성하셔야 합니다.",
        },
        {
          question: "일정을 PDF로 다운로드할 수 있나요?",
          answer:
            "1회 이용권과 프리미엄 플랜에서 PDF 다운로드 기능을 제공합니다. 생성된 일정 페이지에서 '다운로드' 버튼을 클릭하시면 됩니다.",
        },
      ],
    },
  ]

  const filteredFAQ = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-24 left-20 w-36 h-36 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-28 w-28 h-28 bg-teal-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/3 w-32 h-32 bg-cyan-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-white transform rotate-45" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Plan Go
            </span>
          </Link>
          <h1 className="text-4xl font-bold mb-4 text-gray-800">자주 묻는 질문</h1>
          <p className="text-xl text-gray-600">Plan Go 이용에 대한 궁금한 점을 해결해드립니다</p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="질문을 검색해보세요..."
              className="pl-10 h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredFAQ.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">{category.category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.questions.map((faq, index) => {
                  const globalIndex = categoryIndex * 100 + index
                  const isOpen = openItems.includes(globalIndex)

                  return (
                    <div key={index} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-800">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      {isOpen && <div className="p-4 pt-0 text-gray-600 leading-relaxed">{faq.answer}</div>}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <div className="max-w-2xl mx-auto mt-16">
          <Card className="text-center shadow-xl border-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardContent className="p-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">원하는 답변을 찾지 못하셨나요?</h3>
              <p className="mb-6 text-blue-100">고객센터를 통해 직접 문의하시면 빠르게 도움을 드리겠습니다.</p>
              <Link href="/support/contact">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">고객센터 문의하기</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
