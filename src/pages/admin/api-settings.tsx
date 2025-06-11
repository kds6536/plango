import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiService, ApiKey } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const apiKeySchema = z.object({
  name: z.string().min(1, 'API 키 이름을 입력해주세요'),
});

type ApiKeyForm = z.infer<typeof apiKeySchema>;

const PAGE_SIZE = 10;

export default function ApiSettingsPage() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ApiKeyForm>({
    resolver: zodResolver(apiKeySchema),
  });

  // API 키 목록 쿼리
  const { data: apiKeys = [], isLoading, error, isFetching } = useQuery<ApiKey[]>(
    ['apiKeys', page],
    () => apiService.apiKeys.list(page, PAGE_SIZE),
    { keepPreviousData: true }
  );

  // API 키 생성 뮤테이션
  const createMutation = useMutation(apiService.apiKeys.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(['apiKeys']);
      reset();
    },
  });

  // API 키 삭제 뮤테이션
  const deleteMutation = useMutation(apiService.apiKeys.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(['apiKeys']);
    },
  });

  const onSubmit = async (data: ApiKeyForm) => {
    createMutation.mutate(data.name);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('이 API 키를 삭제하시겠습니까?')) return;
    deleteMutation.mutate(id);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">API 설정</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {String(error)}
          </div>
        )}

        {/* API 키 생성 폼 */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">새 API 키 생성</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                API 키 이름
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={createMutation.isLoading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {createMutation.isLoading ? '생성 중...' : 'API 키 생성'}
              </button>
            </div>
            {createMutation.isError && (
              <div className="mt-2 text-sm text-red-600">API 키 생성 중 오류가 발생했습니다.</div>
            )}
            {createMutation.isSuccess && (
              <div className="mt-2 text-sm text-green-600">API 키가 생성되었습니다.</div>
            )}
          </form>
        </div>

        {/* API 키 목록 */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">API 키 목록</h2>
          {isLoading || isFetching ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        이름
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        API 키
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        생성일
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {apiKeys.map((key) => (
                      <tr key={key.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {key.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {key.key}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(key.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDelete(key.id)}
                            className="text-red-600 hover:text-red-900"
                            disabled={deleteMutation.isLoading}
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* 페이지네이션 */}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  이전
                </button>
                <span className="px-2">{page}</span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={apiKeys.length < PAGE_SIZE}
                  className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  다음
                </button>
              </div>
            </>
          )}
        </div>

        {/* 보안 주의사항 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-800">보안 주의사항</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>• API 키는 비밀번호처럼 안전하게 보관하세요.</p>
            <p>• API 키가 노출된 경우 즉시 삭제하고 새로운 키를 생성하세요.</p>
            <p>• 필요한 권한만 부여하는 것이 좋습니다.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 