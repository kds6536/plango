"use client"
export const dynamic = "force-dynamic";

import { useTranslations } from "@/components/language-wrapper"

export default function PlansPage() {
  const t = useTranslations()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t.plans.title}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">
          {t.plans.aiRecommendCustomPlan}
        </p>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">{t.plans.destination}</label>
            <input
              type="text"
              className="border rounded-md px-3 py-2"
              placeholder={t.plans.enterCityOrCountry}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">{t.plans.tripDuration}</label>
            <div className="flex gap-4">
              <input
                type="date"
                className="border rounded-md px-3 py-2 flex-1"
              />
              <input
                type="date"
                className="border rounded-md px-3 py-2 flex-1"
              />
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full">
            {t.plans.createButton}
          </button>
        </div>
      </div>
    </div>
  );
} 