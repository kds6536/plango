import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-100 to-fuchsia-100 py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-28 left-20 w-36 h-36 bg-violet-400 rounded-full blur-3xl"></div>
        <div className="absolute top-44 right-24 w-32 h-32 bg-purple-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-36 left-1/4 w-40 h-40 bg-fuchsia-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 right-20 w-28 h-28 bg-pink-400 rounded-full blur-2xl"></div>
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
          <h1 className="text-4xl font-bold mb-4 text-gray-800">개인정보 처리방침</h1>
          <p className="text-xl text-gray-600">Plan Go 개인정보 처리방침</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Plan Go 개인정보 처리방침</CardTitle>
            <p className="text-gray-600">시행일: 2025년 1월 1일</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">1. 개인정보의 처리목적</h2>
                <p className="text-gray-600 leading-relaxed">
                  Plan Go는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
                  용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를
                  받는 등 필요한 조치를 이행할 예정입니다.
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-600">
                  <li>회원 가입 및 관리</li>
                  <li>서비스 제공 및 맞춤형 여행 계획 생성</li>
                  <li>고객 상담 및 불만 처리</li>
                  <li>서비스 개선 및 신규 서비스 개발</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">2. 개인정보의 처리 및 보유기간</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>
                    Plan Go는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은
                    개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                  </p>
                  <p>각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>회원정보: 회원 탈퇴 시까지</li>
                    <li>서비스 이용기록: 3년</li>
                    <li>결제정보: 5년</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">3. 처리하는 개인정보의 항목</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>Plan Go는 다음의 개인정보 항목을 처리하고 있습니다:</p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">필수항목:</h4>
                      <ul className="list-disc list-inside ml-4">
                        <li>이름, 이메일주소, 비밀번호</li>
                        <li>서비스 이용기록, 접속 로그, 쿠키</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">선택항목:</h4>
                      <ul className="list-disc list-inside ml-4">
                        <li>전화번호, 생년월일</li>
                        <li>여행 선호도 정보</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">4. 개인정보의 제3자 제공</h2>
                <p className="text-gray-600 leading-relaxed">
                  Plan Go는 원칙적으로 정보주체의 개인정보를 수집·이용 목적으로 명시한 범위 내에서 처리하며, 정보주체의
                  사전 동의 없이는 본래의 목적 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다. 다만, 다음의
                  경우에는 예외로 합니다:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-600">
                  <li>정보주체가 사전에 동의한 경우</li>
                  <li>법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우</li>
                  <li>공공기관이 법령 등에서 정하는 소관 업무의 수행을 위하여 불가피한 경우</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">5. 개인정보처리의 위탁</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>Plan Go는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>결제처리: 토스페이먼츠, Stripe</li>
                    <li>클라우드 서비스: Amazon Web Services</li>
                    <li>고객상담: 자체 운영</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">6. 정보주체의 권리·의무 및 행사방법</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>정보주체는 Plan Go에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>개인정보 처리현황 통지요구</li>
                    <li>개인정보 열람요구</li>
                    <li>개인정보 정정·삭제요구</li>
                    <li>개인정보 처리정지요구</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">7. 개인정보의 안전성 확보조치</h2>
                <p className="text-gray-600 leading-relaxed">
                  Plan Go는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-600">
                  <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육</li>
                  <li>
                    기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화,
                    보안프로그램 설치
                  </li>
                  <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">8. 개인정보보호책임자</h2>
                <div className="text-gray-600 leading-relaxed">
                  <p>
                    Plan Go는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리
                    및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다:
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p>
                      <strong>개인정보보호책임자</strong>
                    </p>
                    <p>이메일: privacy@plango.com</p>
                    <p>전화: 1588-1234</p>
                  </div>
                </div>
              </section>

              <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  본 개인정보처리방침은 2025년 1월 1일부터 시행됩니다. 개인정보 처리방침의 변경이 있는 경우 웹사이트
                  공지사항을 통하여 공지할 것입니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
