import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Users, Clock } from "lucide-react"
import Link from "next/link"

export default function DestinationsPage() {
  const destinations = [
    {
      id: 1,
      name: "도쿄",
      country: "일본",
      rating: 4.8,
      reviews: 1234,
      duration: "3-5일",
      travelers: "2-4명",
      tags: ["문화", "음식", "쇼핑"],
      image: "/placeholder.svg?height=200&width=300",
      description: "전통과 현대가 조화를 이루는 매력적인 도시",
    },
    {
      id: 2,
      name: "파리",
      country: "프랑스",
      rating: 4.9,
      reviews: 2156,
      duration: "4-7일",
      travelers: "2명",
      tags: ["로맨틱", "예술", "역사"],
      image: "/placeholder.svg?height=200&width=300",
      description: "사랑과 예술의 도시, 로맨틱한 여행지",
    },
    {
      id: 3,
      name: "제주도",
      country: "한국",
      rating: 4.7,
      reviews: 892,
      duration: "2-4일",
      travelers: "2-6명",
      tags: ["자연", "힐링", "해변"],
      image: "/placeholder.svg?height=200&width=300",
      description: "아름다운 자연과 힐링이 있는 섬",
    },
    {
      id: 4,
      name: "뉴욕",
      country: "미국",
      rating: 4.6,
      reviews: 3421,
      duration: "4-6일",
      travelers: "1-4명",
      tags: ["도시", "문화", "쇼핑"],
      image: "/placeholder.svg?height=200&width=300",
      description: "꿈의 도시, 무한한 가능성의 땅",
    },
    {
      id: 5,
      name: "방콕",
      country: "태국",
      rating: 4.5,
      reviews: 1876,
      duration: "3-5일",
      travelers: "2-4명",
      tags: ["음식", "문화", "저렴"],
      image: "/placeholder.svg?height=200&width=300",
      description: "맛있는 음식과 저렴한 물가의 동남아 여행지",
    },
    {
      id: 6,
      name: "로마",
      country: "이탈리아",
      rating: 4.8,
      reviews: 1654,
      duration: "3-5일",
      travelers: "2-4명",
      tags: ["역사", "예술", "음식"],
      image: "/placeholder.svg?height=200&width=300",
      description: "영원한 도시, 역사와 예술의 보고",
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
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              홈
            </Link>
            <Link href="/destinations" className="text-green-600 font-medium">
              인기 여행지
            </Link>
            <Link href="/create-itinerary" className="text-gray-600 hover:text-gray-900">
              여행 계획
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-gray-900">
              내 계정
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">인기 여행지</h1>
          <p className="text-gray-600 text-lg mb-8">전 세계 여행자들이 사랑하는 최고의 여행 목적지를 발견하세요</p>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input placeholder="도시나 국가를 검색하세요..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="지역 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia">아시아</SelectItem>
                  <SelectItem value="europe">유럽</SelectItem>
                  <SelectItem value="america">아메리카</SelectItem>
                  <SelectItem value="oceania">오세아니아</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="여행 스타일" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="culture">문화</SelectItem>
                  <SelectItem value="nature">자연</SelectItem>
                  <SelectItem value="food">음식</SelectItem>
                  <SelectItem value="romantic">로맨틱</SelectItem>
                  <SelectItem value="adventure">모험</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="aspect-video bg-gradient-to-r from-blue-400 to-purple-400 relative">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white text-gray-800">{destination.country}</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                    <span className="text-sm text-gray-500">({destination.reviews})</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{destination.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>추천 기간: {destination.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>추천 인원: {destination.travelers}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">일정 만들기</Button>
                  <Button variant="outline" className="flex-1">
                    자세히 보기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            더 많은 여행지 보기
          </Button>
        </div>
      </div>
    </div>
  )
}
