import axios, { AxiosResponse } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
}

export interface SiteStats {
  totalVisitors: number;
  totalSubscribers: number;
  totalEvents: number;
  totalPaidTransactions: number;
  visitorTrend: Array<{
    date: string;
    visitors: number;
  }>;
  subscriptionData: Array<{
    plan: string;
    users: number;
  }>;
}

export interface ContentData {
  heroTitle: string;
  heroDescription: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  popularTrips: Array<{
    title: string;
    description: string;
    imageUrl: string;
  }>;
}

export const apiService = {
  // 인증
  auth: {
    login: async (email: string, password: string) => {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    },
  },

  // API 키 관리
  apiKeys: {
    list: async (page = 1, pageSize = 10) => {
      const response = await api.get<ApiKey[]>('/api-keys', {
        params: { page, pageSize },
      });
      return response.data;
    },
    create: async (name: string) => {
      const response = await api.post<ApiKey>('/api-keys', { name });
      return response.data;
    },
    delete: async (id: string) => {
      await api.delete(`/api-keys/${id}`);
    },
  },

  // 사이트 통계
  stats: {
    getStats: async (startDate: string, endDate: string) => {
      const response = await api.get<SiteStats>('/stats', {
        params: { startDate, endDate },
      });
      return response.data;
    },
  },

  // 콘텐츠 관리
  content: {
    get: async () => {
      const response = await api.get<ContentData>('/content');
      return response.data;
    },
    update: async (data: ContentData) => {
      const response = await api.put<ContentData>('/content', data);
      return response.data;
    },
  },
}; 