import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-white mb-4 inline-block">
            Plan Go
          </Link>
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-blue-400 mr-2" />
            <span className="text-blue-400 font-medium">관리자 전용</span>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">관리자 로그인</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminId" className="text-white">
                  관리자 아이디
                </Label>
                <Input
                  id="adminId"
                  type="text"
                  placeholder="관리자 아이디를 입력하세요"
                  required
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  비밀번호
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  required
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
            </div>

            <Link href="/admin/dashboard">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">로그인</Button>
            </Link>

            <div className="text-center text-sm text-white/70">⚠️ 이 페이지는 관리자만 접근할 수 있습니다</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
