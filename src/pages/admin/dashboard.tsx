import AdminLayout from '@/components/layout/AdminLayout';
import StatCard from '@/components/common/StatCard';
import GraphPlaceholder from '@/components/common/GraphPlaceholder';

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
        
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="총 방문객 수"
            value="12,345"
            trend="+12%"
            trendUp={true}
          />
          <StatCard
            label="총 가입자 수"
            value="678"
            trend="+5%"
            trendUp={true}
          />
          <StatCard
            label="일정 생성 수"
            value="1,234"
            trend="+8%"
            trendUp={true}
          />
          <StatCard
            label="유료 결제 건수"
            value="89"
            trend="-2%"
            trendUp={false}
          />
        </div>

        {/* 그래프 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">주간 방문객 추이</h2>
            <GraphPlaceholder height={300} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">월별 가입자 수</h2>
            <GraphPlaceholder height={300} />
          </div>
        </div>

        {/* 주요 관리 기능 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">API 설정</h2>
            <p className="text-gray-600 mb-4">
              Google Places API, SerpAPI 등의 API 키를 관리합니다.
            </p>
            <a
              href="/admin/api-settings"
              className="inline-block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              API 설정으로 이동
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">콘텐츠 관리</h2>
            <p className="text-gray-600 mb-4">
              홈페이지의 주요 텍스트와 이미지를 관리합니다.
            </p>
            <a
              href="/admin/content-manage"
              className="inline-block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              콘텐츠 관리로 이동
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 