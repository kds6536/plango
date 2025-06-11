import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiService, ContentData } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const contentSchema = z.object({
  heroTitle: z.string().min(1, '히어로 섹션 제목을 입력해주세요'),
  heroDescription: z.string().min(1, '히어로 섹션 설명을 입력해주세요'),
  features: z.array(z.object({
    title: z.string().min(1, '특징 제목을 입력해주세요'),
    description: z.string().min(1, '특징 설명을 입력해주세요'),
  })),
  popularTrips: z.array(z.object({
    title: z.string().min(1, '일정 제목을 입력해주세요'),
    description: z.string().min(1, '일정 설명을 입력해주세요'),
    imageUrl: z.string().min(1, '이미지 URL을 입력해주세요'),
  })),
});

type ContentForm = z.infer<typeof contentSchema>;

export default function ContentManagePage() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(['content'], apiService.content.get);
  const mutation = useMutation(apiService.content.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(['content']);
    },
  });

  const [saveMessage, setSaveMessage] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContentForm>({
    resolver: zodResolver(contentSchema),
  });

  // 데이터 로딩 시 폼 초기화
  React.useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = async (formData: ContentForm) => {
    setSaveMessage('');
    mutation.mutate(formData, {
      onSuccess: () => setSaveMessage('변경사항이 저장되었습니다.'),
      onError: () => setSaveMessage('저장 중 오류가 발생했습니다.'),
    });
  };

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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">홈페이지 콘텐츠 관리</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* 히어로 섹션 */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">히어로 섹션</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700">
                  제목
                </label>
                <input
                  type="text"
                  id="heroTitle"
                  {...register('heroTitle')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                {errors.heroTitle && (
                  <p className="mt-1 text-sm text-red-600">{errors.heroTitle.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="heroDescription" className="block text-sm font-medium text-gray-700">
                  설명
                </label>
                <textarea
                  id="heroDescription"
                  rows={3}
                  {...register('heroDescription')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                {errors.heroDescription && (
                  <p className="mt-1 text-sm text-red-600">{errors.heroDescription.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* 서비스 특징 */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">서비스 특징</h2>
            <div className="space-y-4">
              {[0, 1].map((index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`features.${index}.title`} className="block text-sm font-medium text-gray-700">
                      특징 {index + 1} 제목
                    </label>
                    <input
                      type="text"
                      id={`features.${index}.title`}
                      {...register(`features.${index}.title`)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                    {errors.features?.[index]?.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.features[index].title.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor={`features.${index}.description`} className="block text-sm font-medium text-gray-700">
                      특징 {index + 1} 설명
                    </label>
                    <input
                      type="text"
                      id={`features.${index}.description`}
                      {...register(`features.${index}.description`)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                    {errors.features?.[index]?.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.features[index].description.message}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 인기 여행 일정 */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">인기 여행 일정</h2>
            <div className="space-y-4">
              {[0].map((index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <label htmlFor={`popularTrips.${index}.title`} className="block text-sm font-medium text-gray-700">
                      일정 제목
                    </label>
                    <input
                      type="text"
                      id={`popularTrips.${index}.title`}
                      {...register(`popularTrips.${index}.title`)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                    {errors.popularTrips?.[index]?.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.popularTrips[index].title.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor={`popularTrips.${index}.description`} className="block text-sm font-medium text-gray-700">
                      일정 설명
                    </label>
                    <textarea
                      id={`popularTrips.${index}.description`}
                      rows={3}
                      {...register(`popularTrips.${index}.description`)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                    {errors.popularTrips?.[index]?.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.popularTrips[index].description.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor={`popularTrips.${index}.imageUrl`} className="block text-sm font-medium text-gray-700">
                      이미지 URL
                    </label>
                    <input
                      type="text"
                      id={`popularTrips.${index}.imageUrl`}
                      {...register(`popularTrips.${index}.imageUrl`)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                    {errors.popularTrips?.[index]?.imageUrl && (
                      <p className="mt-1 text-sm text-red-600">{errors.popularTrips[index].imageUrl.message}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 저장 버튼 */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              변경사항 저장
            </button>
          </div>

          {saveMessage && (
            <div className={`text-sm ${saveMessage.includes('오류') ? 'text-red-600' : 'text-green-600'}`}>
              {saveMessage}
            </div>
          )}
        </form>
      </div>
    </AdminLayout>
  );
} 