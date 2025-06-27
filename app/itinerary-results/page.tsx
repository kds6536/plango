"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Download, Printer, Save, RotateCcw, Plane } from "lucide-react"

export default function ItineraryResultsPage() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [showDetails1, setShowDetails1] = useState(false)
  const [showDetails2, setShowDetails2] = useState(false)

  const handleCheckboxChange = (itemId: string) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId)
    } else {
      newSelected.add(itemId)
    }
    setSelectedItems(newSelected)
  }

  const handleSaveSchedule = () => {
    alert("일정이 저장되었습니다! 💾")
  }

  const handleViewOtherSchedules = () => {
    alert("다른 일정을 불러오는 중입니다... 🔄")
  }

  const handleDownload = () => {
    alert("일정이 다운로드됩니다! 📱")
  }

  const handlePrint = () => {
    window.print()
  }

  const handleCreateCustomSchedule = () => {
    if (selectedItems.size === 0) {
      alert("최소 1개 이상의 항목을 선택해주세요!")
      return
    }
    alert(`선택된 ${selectedItems.size}개 항목으로 커스텀 일정이 생성됩니다! ✨`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-white transform rotate-45" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Plan Go
            </span>
          </Link>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎉 추천 여행 일정
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">AI가 생성한 완벽한 맞춤형 여행 일정을 확인하세요 ✨</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button onClick={handleSaveSchedule} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 shadow-lg">
            <Save className="w-4 h-4" />
            <span>📝 일정 저장하기</span>
          </Button>
          <Button onClick={handleViewOtherSchedules} variant="outline" className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
            <RotateCcw className="w-4 h-4" />
            <span>👁️ 다른 일정 보기</span>
          </Button>
          <Button onClick={handleDownload} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 shadow-lg">
            <Download className="w-4 h-4" />
            <span>💾 일정 다운로드</span>
          </Button>
          <Button onClick={handlePrint} variant="outline" className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
            <Printer className="w-4 h-4" />
            <span>🖨️ 바로 프린터</span>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Itinerary 1 */}
          <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardTitle className="text-3xl text-center">🌟 추천 일정 1</CardTitle>
              
              {/* 전체 여행 경로 */}
              <div className="mt-4 p-4 bg-white/20 rounded-lg">
                <h4 className="font-bold text-lg mb-3">📍 전체 여행 경로</h4>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold mb-1">
                      1
                    </div>
                    <span>경복궁</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-white/50 mx-2"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold mb-1">
                      2
                    </div>
                    <span>인사동</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-white/50 mx-2"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold mb-1">
                      3
                    </div>
                    <span>명동</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-white/50 mx-2"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold mb-1">
                      4
                    </div>
                    <span>남산타워</span>
                  </div>
                </div>
                <p className="text-center mt-3 text-sm">총 거리: 약 15km | 예상 소요시간: 1일</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400">여행 일정 선택</h3>
                <Button 
                  onClick={() => setShowDetails1(!showDetails1)} 
                  variant="outline" 
                  size="sm"
                >
                  {showDetails1 ? "간단히 보기" : "자세히 보기"}
                </Button>
              </div>

              {/* 볼거리 */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">볼거리 (명소)</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.has("1-palace")}
                      onChange={() => handleCheckboxChange("1-palace")}
                      className="mt-1 h-4 w-4"
                    />
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100">경복궁</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        조선왕조의 정궁으로 한국의 전통 건축미를 감상할 수 있습니다.
                      </p>
                      {showDetails1 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <p><strong>운영시간:</strong> 09:00 - 18:00</p>
                          <p><strong>입장료:</strong> 성인 3,000원</p>
                          <p><strong>추천시간:</strong> 2시간</p>
                          <p><strong>특별프로그램:</strong> 수문장 교대식 (매시 정각)</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.has("1-tower")}
                      onChange={() => handleCheckboxChange("1-tower")}
                      className="mt-1 h-4 w-4"
                    />
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100">남산타워</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        서울의 야경을 한눈에 볼 수 있는 최고의 전망대입니다.
                      </p>
                      {showDetails1 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <p><strong>운영시간:</strong> 10:00 - 23:00</p>
                          <p><strong>입장료:</strong> 성인 12,000원</p>
                          <p><strong>추천시간:</strong> 1.5시간</p>
                          <p><strong>특별체험:</strong> 사랑의 자물쇠, 케이블카</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 먹거리 */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">먹거리 (음식점 또는 음식)</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.has("1-food1")}
                      onChange={() => handleCheckboxChange("1-food1")}
                      className="mt-1 h-4 w-4"
                    />
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100">인사동 전통차집</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        전통 한과와 차를 즐길 수 있는 고즈넉한 찻집입니다.
                      </p>
                      {showDetails1 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <p><strong>추천메뉴:</strong> 대추차, 전통한과세트</p>
                          <p><strong>가격대:</strong> 15,000원 - 25,000원</p>
                          <p><strong>분위기:</strong> 전통 한옥, 조용한 분위기</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.has("1-food2")}
                      onChange={() => handleCheckboxChange("1-food2")}
                      className="mt-1 h-4 w-4"
                    />
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100">명동 칼국수</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        50년 전통의 손칼국수를 맛볼 수 있는 명동 맛집입니다.
                      </p>
                      {showDetails1 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <p><strong>추천메뉴:</strong> 멸치칼국수, 만두</p>
                          <p><strong>가격대:</strong> 8,000원 - 12,000원</p>
                          <p><strong>특징:</strong> 50년 전통, 현지인 맛집</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  일정 다운로드
                </Button>
                <Button variant="outline" className="flex-1">
                  <Printer className="w-4 h-4 mr-2" />
                  바로 프린트
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Itinerary 2 */}
          <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
              <CardTitle className="text-3xl text-center">🌟 추천 일정 2</CardTitle>

              {/* 전체 여행 경로 */}
              <div className="mt-4 p-4 bg-white/20 rounded-lg">
                <h4 className="font-bold text-lg mb-3">📍 전체 여행 경로</h4>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 font-bold mb-1">
                      1
                    </div>
                    <span>한강공원</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-white/50 mx-2"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 font-bold mb-1">
                      2
                    </div>
                    <span>홍대</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-white/50 mx-2"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 font-bold mb-1">
                      3
                    </div>
                    <span>이태원</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-white/50 mx-2"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 font-bold mb-1">
                      4
                    </div>
                    <span>동대문</span>
                  </div>
                </div>
                <p className="text-center mt-3 text-sm">총 거리: 약 20km | 예상 소요시간: 1일</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400">여행 일정 선택</h3>
                <Button 
                  onClick={() => setShowDetails2(!showDetails2)} 
                  variant="outline" 
                  size="sm"
                >
                  {showDetails2 ? "간단히 보기" : "자세히 보기"}
                </Button>
              </div>

              {/* 볼거리 */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">볼거리 (명소)</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.has("2-park")}
                      onChange={() => handleCheckboxChange("2-park")}
                      className="mt-1 h-4 w-4"
                    />
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100">한강공원</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        한강에서 자전거를 타며 여유로운 시간을 보낼 수 있습니다.
                      </p>
                      {showDetails2 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <p><strong>운영시간:</strong> 24시간</p>
                          <p><strong>추천활동:</strong> 자전거, 피크닉, 치킨&맥주</p>
                          <p><strong>자전거대여:</strong> 시간당 3,000원</p>
                          <p><strong>특별체험:</strong> 한강 유람선, 수상스키</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.has("2-dongdaemun")}
                      onChange={() => handleCheckboxChange("2-dongdaemun")}
                      className="mt-1 h-4 w-4"
                    />
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100">동대문 야시장</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        밤늦게까지 열리는 쇼핑과 야식의 천국입니다.
                      </p>
                      {showDetails2 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <p><strong>운영시간:</strong> 19:00 - 05:00</p>
                          <p><strong>추천쇼핑:</strong> 의류, 액세서리, 신발</p>
                          <p><strong>야식:</strong> 떡볶이, 순대, 호떡</p>
                          <p><strong>특징:</strong> 24시간 쇼핑몰, 도매가격</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 먹거리 */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">먹거리 (음식점 또는 음식)</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.has("2-food1")}
                      onChange={() => handleCheckboxChange("2-food1")}
                      className="mt-1 h-4 w-4"
                    />
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100">홍대 맛집 투어</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        젊음의 거리 홍대에서 다양한 퓨전 요리를 즐겨보세요.
                      </p>
                      {showDetails2 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <p><strong>추천메뉴:</strong> 파스타, 피자, 수제버거</p>
                          <p><strong>가격대:</strong> 15,000원 - 30,000원</p>
                          <p><strong>분위기:</strong> 젊고 활기찬, 인스타 핫플</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.has("2-food2")}
                      onChange={() => handleCheckboxChange("2-food2")}
                      className="mt-1 h-4 w-4"
                    />
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100">이태원 세계음식</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        세계 각국의 정통 요리를 한 곳에서 맛볼 수 있습니다.
                      </p>
                      {showDetails2 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <p><strong>추천메뉴:</strong> 인도카레, 터키케밥, 태국음식</p>
                          <p><strong>가격대:</strong> 12,000원 - 25,000원</p>
                          <p><strong>특징:</strong> 다국적 문화, 할랄음식 가능</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  일정 다운로드
                </Button>
                <Button variant="outline" className="flex-1">
                  <Printer className="w-4 h-4 mr-2" />
                  바로 프린트
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 혼합 일정 생성 버튼 */}
        {selectedItems.size > 0 && (
          <div className="text-center mt-8">
            <div className="mb-4">
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                선택된 항목: {selectedItems.size}개
              </span>
            </div>
            <Button 
              onClick={handleCreateCustomSchedule}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg shadow-xl"
            >
              ✨ 혼합 일정 재생성하기
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
