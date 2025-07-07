"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plane, Mail, Phone, Clock, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-24 w-32 h-32 bg-rose-400 rounded-full blur-3xl"></div>
        <div className="absolute top-48 right-20 w-40 h-40 bg-pink-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-1/4 w-36 h-36 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 right-24 w-28 h-28 bg-indigo-400 rounded-full blur-2xl"></div>
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
          <h1 className="text-4xl font-bold mb-4 text-gray-800">고객센터</h1>
          <p className="text-xl text-gray-600">궁금한 점이나 문제가 있으시면 언제든지 연락해주세요</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
                문의하기
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름 *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="홍길동"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일 *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>문의 유형 *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="문의 유형을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">기술적 문제</SelectItem>
                      <SelectItem value="billing">결제/환불</SelectItem>
                      <SelectItem value="account">계정 관련</SelectItem>
                      <SelectItem value="feature">기능 문의</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">제목 *</Label>
                  <Input
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="문의 제목을 입력하세요"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">문의 내용 *</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="문의 내용을 자세히 작성해주세요"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
                >
                  문의 보내기
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">연락처 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">이메일</h3>
                    <p className="text-gray-600">support@plango.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">전화</h3>
                    <p className="text-gray-600">1588-1234</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">운영시간</h3>
                    <p className="text-gray-600">평일 09:00 - 18:00</p>
                    <p className="text-gray-600 text-sm">(주말 및 공휴일 휴무)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">빠른 답변을 위한 팁</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• 문제 상황을 구체적으로 설명해주세요</li>
                  <li>• 사용 중인 브라우저와 기기 정보를 알려주세요</li>
                  <li>• 스크린샷이 있다면 함께 첨부해주세요</li>
                  <li>• 계정 관련 문의 시 가입 이메일을 명시해주세요</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
