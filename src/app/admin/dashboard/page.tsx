"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { BarChart3, Users, FileText, LogOut, Key, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const sidebarItems = [
    { id: "dashboard", label: "대시보드", icon: BarChart3 },
    { id: "api", label: "API 설정", icon: Key },
    { id: "stats", label: "사이트 통계", icon: TrendingUp },
    { id: "content", label: "콘텐츠 관리", icon: FileText },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-2xl font-bold text-green-400">
            Plan Go Admin
          </Link>
        </div>

        <nav className="mt-8">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-800 transition-colors ${
                  activeSection === item.id ? "bg-gray-800 border-r-4 border-green-400" : ""
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            )
          })}

          <Link
            href="/admin/login"
            className="w-full flex items-center px-6 py-3 text-left hover:bg-gray-800 transition-colors mt-8 border-t border-gray-700"
          >
            <LogOut className="w-5 h-5 mr-3" />
            로그아웃
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {activeSection === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-8">관리자 대시보드</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* API 키 관리 */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Key className="w-5 h-5 mr-2" />
                    API 키 관리
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>현재 사용 중인 API</Label>
                    <div className="p-3 bg-green-50 rounded border">
                      <span className="font-medium">OpenAI API</span>
                      <span className="text-sm text-gray-600 ml-2">sk_live_********</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newApiKey">새 API 키 입력</Label>
                    <Input id="newApiKey" placeholder="새로운 API 키를 입력하세요" />
                  </div>

                  <Button className="bg-green-600 hover:bg-green-700">저장</Button>
                </CardContent>
              </Card>

              {/* 사이트 통계 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    사이트 통계
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">123,456</div>
                    <div className="text-sm text-gray-600">총 방문객 수</div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">7,890</div>
                    <div className="text-sm text-gray-600">총 가입자 수</div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">2,345</div>
                    <div className="text-sm text-gray-600">생성된 일정 수</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 차트 영역 */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>주간 방문객 추이</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                      <p>차트 데이터 로딩 중...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>월별 가입자 수</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-2" />
                      <p>차트 데이터 로딩 중...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 홈페이지 콘텐츠 수정 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  홈페이지 콘텐츠 수정
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="heroTitle">히어로 제목 수정</Label>
                    <Textarea
                      id="heroTitle"
                      placeholder="Plan Go와 함께 완벽한 여행을 계획하세요"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heroDesc">히어로 설명 수정</Label>
                    <Textarea
                      id="heroDesc"
                      placeholder="AI가 추천하는 맞춤형 여행 일정으로 특별한 경험을 만들어보세요"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>서비스 특징 수정</Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input placeholder="맞춤형 일정" />
                    <Input placeholder="빠른 생성" />
                    <Input placeholder="신뢰할 수 있는 정보" />
                  </div>
                </div>

                <Button className="bg-green-600 hover:bg-green-700">변경사항 저장</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "api" && (
          <div>
            <h1 className="text-3xl font-bold mb-8">API 설정</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">API 설정 페이지 내용이 여기에 표시됩니다.</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "stats" && (
          <div>
            <h1 className="text-3xl font-bold mb-8">사이트 통계</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">상세 통계 페이지 내용이 여기에 표시됩니다.</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "content" && (
          <div>
            <h1 className="text-3xl font-bold mb-8">콘텐츠 관리</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">콘텐츠 관리 페이지 내용이 여기에 표시됩니다.</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
