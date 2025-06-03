"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Download, Edit, Trash2, Settings } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("itineraries")

  const savedItineraries = [
    {
      id: 1,
      title: "도쿄 3박 4일",
      destination: "일본, 도쿄",
      dates: "2024.03.15 - 2024.03.18",
      status: "완료",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "파리 로맨틱 여행",
      destination: "프랑스, 파리",
      dates: "2024.05.20 - 2024.05.25",
      status: "예정",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "제주도 힐링 여행",
      destination: "한국, 제주도",
      dates: "2024.07.10 - 2024.07.13",
      status: "계획중",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-green-600">
            Plan Go
          </Link>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            설정
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback>홍길동</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-2">홍길동</h2>
                <p className="text-gray-600 mb-4">hong@example.com</p>
                <Badge variant="secondary" className="mb-4">
                  프리미엄 회원
                </Badge>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>총 여행 횟수:</span>
                    <span className="font-semibold">12회</span>
                  </div>
                  <div className="flex justify-between">
                    <span>저장된 일정:</span>
                    <span className="font-semibold">8개</span>
                  </div>
                  <div className="flex justify-between">
                    <span>방문한 국가:</span>
                    <span className="font-semibold">5개국</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="itineraries">내 여행 일정</TabsTrigger>
                <TabsTrigger value="favorites">즐겨찾기</TabsTrigger>
                <TabsTrigger value="settings">계정 설정</TabsTrigger>
              </TabsList>

              <TabsContent value="itineraries" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">저장된 여행 일정</h3>
                  <Link href="/create-itinerary">
                    <Button className="bg-green-600 hover:bg-green-700">새 일정 만들기</Button>
                  </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {savedItineraries.map((itinerary) => (
                    <Card key={itinerary.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gradient-to-r from-blue-400 to-purple-400"></div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-lg">{itinerary.title}</h4>
                          <Badge
                            variant={
                              itinerary.status === "완료"
                                ? "default"
                                : itinerary.status === "예정"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {itinerary.status}
                          </Badge>
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{itinerary.destination}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="text-sm">{itinerary.dates}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="w-4 h-4 mr-1" />
                            수정
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="w-4 h-4 mr-1" />
                            다운로드
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="favorites" className="space-y-6">
                <h3 className="text-2xl font-bold">즐겨찾기</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {["도쿄 스카이트리", "에펠탑", "제주 성산일출봉", "부산 해운대", "교토 금각사"].map(
                    (place, index) => (
                      <Card key={index} className="p-4">
                        <div className="aspect-square bg-gray-200 rounded mb-3"></div>
                        <h4 className="font-semibold">{place}</h4>
                        <p className="text-sm text-gray-600">즐겨찾기에 추가됨</p>
                      </Card>
                    ),
                  )}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>개인정보 수정</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">이름</Label>
                        <Input id="firstName" defaultValue="길동" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">성</Label>
                        <Input id="lastName" defaultValue="홍" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일</Label>
                      <Input id="email" type="email" defaultValue="hong@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">전화번호</Label>
                      <Input id="phone" defaultValue="010-1234-5678" />
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700">변경사항 저장</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>구독 관리</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="font-semibold">프리미엄 플랜</h4>
                        <p className="text-sm text-gray-600">다음 결제일: 2024.12.15</p>
                      </div>
                      <Badge>활성</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline">플랜 변경</Button>
                      <Button variant="outline">구독 취소</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
