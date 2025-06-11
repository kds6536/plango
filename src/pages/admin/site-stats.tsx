import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { apiService, SiteStats } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

// 샘플 데이터
const visitorData = [
  { date: '2024-02-14', visitors: 1200 },
  { date: '2024-02-15', visitors: 1500 },
  { date: '2024-02-16', visitors: 1800 },
  { date: '2024-02-17', visitors: 2100 },
  { date: '2024-02-18', visitors: 1900 },
  { date: '2024-02-19', visitors: 2200 },
  { date: '2024-02-20', visitors: 2400 },
];

const subscriptionData = [
  { plan: '무료', users: 500 },
  { plan: '베이직', users: 100 },
  { plan: '프리미엄', users: 25 },
];

export default function SiteStatsPage() {
  const [dateRange, setDateRange] = useState({
    start: '2024-02-14',
    end: '2024-02-20',
  });

  const { data: stats, isLoading, error } = useQuery<SiteStats>(
    ['siteStats', dateRange.start, dateRange.end],
    () => apiService.stats.getStats(dateRange.start, dateRange.end),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-red-600 text-center py-8">{String(error)}</div>
      </AdminLayout>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">사이트 통계</h1>

        {/* 기간 선택 */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                시작일
              </label>
              <input
                type="date"
                id="start-date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                종료일
              </label>
              <input
                type="date"
                id="end-date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* 방문자 추이 그래프 */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">주간 방문자 추이</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.visitorTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#0284c7"
                  strokeWidth={2}
                  name="방문자 수"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 요금제별 사용자 비율 */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">요금제별 사용자 비율</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.subscriptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="plan" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#0284c7" name="사용자 수" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 통계 요약 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">총 사용자 수</h3>
            <p className="mt-2 text-3xl font-bold text-primary-600">{stats.totalSubscribers}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">일정 생성 수</h3>
            <p className="mt-2 text-3xl font-bold text-primary-600">{stats.totalEvents}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">유료 결제 건수</h3>
            <p className="mt-2 text-3xl font-bold text-primary-600">{stats.totalPaidTransactions}</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 