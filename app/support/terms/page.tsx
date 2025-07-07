import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 left-16 w-40 h-40 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-32 w-32 h-32 bg-orange-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-48 left-1/3 w-36 h-36 bg-red-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-16 w-28 h-28 bg-pink-400 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-white transform rotate-45" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Plan Go
            </span>
          </Link>
          <h1 className="text-4xl font-bold mb-4 text-gray-800">이용약관</h1>
          <p className="text-xl text-gray-600">Plan Go 서비스 이용약관</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Plan Go 서비스 이용약관</CardTitle>
            <p className="text-gray-600">시행일: 2025년 1월 1일</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">제1조 (목적)</h2>
                <p className="text-gray-600 leading-relaxed">
                  이 약관은 Plan Go(이하 "회사")가 제공하는 AI 기반 여행 계획 서비스(이하 "서비스")의 이용과 관련하여
                  회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">제2조 (정의)</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>1. "서비스"란 회사가 제공하는 AI 기반 여행 계획 생성 및 관련 부가 서비스를 의미합니다.</p>
                  <p>2. "이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</p>
                  <p>
                    3. "회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며
                    회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">제3조 (약관의 효력 및 변경)</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>
                    1. 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.
                  </p>
                  <p>
                    2. 회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로
                    공지 또는 통지함으로써 효력을 발생합니다.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">제4조 (서비스의 제공)</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>1. 회사는 다음과 같은 서비스를 제공합니다:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>AI 기반 맞춤형 여행 일정 생성</li>
                    <li>여행지 정보 및 추천</li>
                    <li>여행 관련 커뮤니티 서비스</li>
                    <li>기타 회사가 정하는 서비스</li>
                  </ul>
                  <p>2. 회사는 서비스의 품질 향상을 위해 서비스의 내용을 변경할 수 있습니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">제5조 (서비스 이용료)</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>
                    1. 회사가 제공하는 서비스는 기본적으로 무료입니다. 단, 일부 유료 서비스의 경우 별도의 요금이 부과될
                    수 있습니다.
                  </p>
                  <p>2. 유료 서비스의 요금 및 결제 방법은 서비스 화면에 표시된 바에 따릅니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">제6조 (이용자의 의무)</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>1. 이용자는 다음 행위를 하여서는 안 됩니다:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>신청 또는 변경 시 허위내용의 등록</li>
                    <li>타인의 정보 도용</li>
                    <li>회사가 게시한 정보의 변경</li>
                    <li>회사가 금지한 정보(컴퓨터 프로그램 등)의 송신 또는 게시</li>
                    <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">제7조 (개인정보보호)</h2>
                <p className="text-gray-600 leading-relaxed">
                  회사는 이용자의 개인정보를 보호하기 위해 개인정보처리방침을 수립하고 이를 준수합니다. 자세한 내용은
                  개인정보처리방침을 참조하시기 바랍니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">제8조 (면책조항)</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>
                    1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스
                    제공에 관한 책임이 면제됩니다.
                  </p>
                  <p>2. 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">제9조 (준거법 및 관할법원)</h2>
                <p className="text-gray-600 leading-relaxed">
                  이 약관에 관한 분쟁은 대한민국 법을 준거법으로 하며, 부산지방법원을 관할법원으로 합니다.
                </p>
              </section>

              <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  본 약관은 2025년 1월 1일부터 시행됩니다. 문의사항이 있으시면 고객센터(support@plango.com)로
                  연락해주시기 바랍니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
