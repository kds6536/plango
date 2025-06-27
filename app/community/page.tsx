"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Search, TrendingUp, Users, Calendar } from "lucide-react"
import Link from "next/link"
import { useLanguageStore } from "@/lib/language-store"

// 다국어 번역
const translations = {
  ko: {
    title: "여행 커뮤니티",
    nav: {
      home: "홈",
      destinations: "인기 여행지",
      community: "커뮤니티",
      profile: "내 계정"
    },
    search: "게시글 검색...",
    trendingTopics: "인기 토픽",
    communityStats: "커뮤니티 현황",
    totalMembers: "총 회원수",
    todayPosts: "오늘 게시글",
    activeUsers: "활성 사용자",
    writePost: "글 작성하기",
    tabs: {
      popular: "인기글",
      recent: "최신글",
      questions: "질문",
      reviews: "후기"
    }
  },
  en: {
    title: "Travel Community",
    nav: {
      home: "Home",
      destinations: "Popular Destinations",
      community: "Community",
      profile: "My Account"
    },
    search: "Search posts...",
    trendingTopics: "Trending Topics",
    communityStats: "Community Stats",
    totalMembers: "Total Members",
    todayPosts: "Today's Posts",
    activeUsers: "Active Users",
    writePost: "Write Post",
    tabs: {
      popular: "Popular",
      recent: "Recent",
      questions: "Questions",
      reviews: "Reviews"
    }
  },
  ja: {
    title: "旅行コミュニティ",
    nav: {
      home: "ホーム",
      destinations: "人気の目的地",
      community: "コミュニティ",
      profile: "マイアカウント"
    },
    search: "投稿を検索...",
    trendingTopics: "トレンディングトピック",
    communityStats: "コミュニティ統計",
    totalMembers: "総メンバー数",
    todayPosts: "今日の投稿",
    activeUsers: "アクティブユーザー",
    writePost: "投稿作成",
    tabs: {
      popular: "人気",
      recent: "最新",
      questions: "質問",
      reviews: "レビュー"
    }
  },
  zh: {
    title: "旅行社区",
    nav: {
      home: "首页",
      destinations: "热门目的地",
      community: "社区",
      profile: "我的账户"
    },
    search: "搜索帖子...",
    trendingTopics: "热门话题",
    communityStats: "社区统计",
    totalMembers: "总会员数",
    todayPosts: "今日帖子",
    activeUsers: "活跃用户",
    writePost: "发布帖子",
    tabs: {
      popular: "热门",
      recent: "最新",
      questions: "问题",
      reviews: "评价"
    }
  },
  vi: {
    title: "Cộng Đồng Du Lịch",
    nav: {
      home: "Trang Chủ",
      destinations: "Điểm Đến Phổ Biến",
      community: "Cộng Đồng",
      profile: "Tài Khoản"
    },
    search: "Tìm kiếm bài viết...",
    trendingTopics: "Chủ Đề Thịnh Hành",
    communityStats: "Thống Kê Cộng Đồng",
    totalMembers: "Tổng Thành Viên",
    todayPosts: "Bài Viết Hôm Nay",
    activeUsers: "Người Dùng Hoạt Động",
    writePost: "Viết Bài",
    tabs: {
      popular: "Phổ Biến",
      recent: "Mới Nhất",
      questions: "Câu Hỏi",
      reviews: "Đánh Giá"
    }
  },
  id: {
    title: "Komunitas Travel",
    nav: {
      home: "Beranda",
      destinations: "Destinasi Populer",
      community: "Komunitas",
      profile: "Akun Saya"
    },
    search: "Cari postingan...",
    trendingTopics: "Topik Trending",
    communityStats: "Statistik Komunitas",
    totalMembers: "Total Anggota",
    todayPosts: "Postingan Hari Ini",
    activeUsers: "Pengguna Aktif",
    writePost: "Tulis Postingan",
    tabs: {
      popular: "Populer",
      recent: "Terbaru",
      questions: "Pertanyaan",
      reviews: "Ulasan"
    }
  }
}

export default function CommunityPage() {
  const { language } = useLanguageStore()
  const t = translations[language as keyof typeof translations]
  
  const [activeTab, setActiveTab] = useState("popular")

  const posts = [
    {
      id: 1,
      author: "여행러버",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "도쿄 3박 4일 완벽 가이드 (실제 후기)",
      content:
        "최근 도쿄 여행을 다녀왔는데 정말 완벽했어요! 특히 Plan Go로 짠 일정이 너무 좋았습니다. 센소지 절부터 시작해서...",
      tags: ["도쿄", "일본", "3박4일"],
      likes: 124,
      comments: 23,
      shares: 8,
      timeAgo: "2시간 전",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      author: "파리지앵",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "파리 로맨틱 여행 꿀팁 대방출!",
      content: "연인과 함께 파리 여행을 계획하고 계신가요? 5년간 파리에 살면서 알게 된 로맨틱한 장소들을 공유합니다...",
      tags: ["파리", "로맨틱", "커플여행"],
      likes: 89,
      comments: 15,
      shares: 12,
      timeAgo: "5시간 전",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      author: "제주도민",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "제주도 숨은 맛집 BEST 10",
      content: "제주도에서 태어나고 자란 토박이가 추천하는 진짜 맛집들입니다. 관광객들이 잘 모르는 현지인 맛집까지...",
      tags: ["제주도", "맛집", "현지인추천"],
      likes: 156,
      comments: 34,
      shares: 19,
      timeAgo: "1일 전",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const trendingTopics = [
    { name: "도쿄여행", posts: 1234 },
    { name: "유럽배낭여행", posts: 892 },
    { name: "제주도맛집", posts: 567 },
    { name: "동남아여행", posts: 445 },
    { name: "겨울여행", posts: 334 },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-green-600">
            Plan Go
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              {t.nav.home}
            </Link>
            <Link href="/destinations" className="text-muted-foreground hover:text-foreground">
              {t.nav.destinations}
            </Link>
            <Link href="/community" className="text-green-600 font-medium">
              {t.nav.community}
            </Link>
            <Link href="/profile" className="text-muted-foreground hover:text-foreground">
              {t.nav.profile}
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder={t.search} className="pl-10" />
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  {t.trendingTopics}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium">#{topic.name}</span>
                    <span className="text-xs text-muted-foreground">{topic.posts}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {t.communityStats}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">{t.totalMembers}</span>
                  <span className="font-semibold">12,345명</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t.todayPosts}</span>
                  <span className="font-semibold">89개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t.activeUsers}</span>
                  <span className="font-semibold">1,234명</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">{t.title}</h1>
              <Button className="bg-green-600 hover:bg-green-700">{t.writePost}</Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="popular">{t.tabs.popular}</TabsTrigger>
                <TabsTrigger value="recent">{t.tabs.recent}</TabsTrigger>
                <TabsTrigger value="questions">{t.tabs.questions}</TabsTrigger>
                <TabsTrigger value="reviews">{t.tabs.reviews}</TabsTrigger>
              </TabsList>

              <TabsContent value="popular" className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={post.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold">{post.author}</span>
                            <span className="text-sm text-muted-foreground">{post.timeAgo}</span>
                          </div>
                          <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                          <p className="text-muted-foreground mb-3">{post.content}</p>

                          {post.image && <div className="aspect-video bg-gray-200 rounded-lg mb-4 max-w-md"></div>}

                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center space-x-6 text-muted-foreground">
                            <button className="flex items-center space-x-1 hover:text-red-500">
                              <Heart className="w-4 h-4" />
                              <span className="text-sm">{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-blue-500">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-sm">{post.comments}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-green-500">
                              <Share2 className="w-4 h-4" />
                              <span className="text-sm">{post.shares}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="recent" className="space-y-6">
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">최신 게시글</h3>
                  <p className="text-gray-600">최근에 작성된 게시글들을 확인하세요.</p>
                </div>
              </TabsContent>

              <TabsContent value="questions" className="space-y-6">
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">여행 질문</h3>
                  <p className="text-gray-600">여행에 대한 궁금한 점을 물어보세요.</p>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="text-center py-12">
                  <TrendingUp className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">여행 후기</h3>
                  <p className="text-gray-600">다른 여행자들의 생생한 후기를 읽어보세요.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
