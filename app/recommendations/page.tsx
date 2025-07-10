"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const CATEGORY_ORDER = ["볼거리", "즐길거리", "먹거리", "숙소"];

export default function RecommendationsPage() {
  const router = useRouter();
  const [placesByCategory, setPlacesByCategory] = useState<any>({});
  const [selectedPlaces, setSelectedPlaces] = useState<{ [category: string]: Set<string> }>({});

  useEffect(() => {
    // 로컬스토리지에서 추천 결과 데이터 읽기
    const data = localStorage.getItem("recommendationResults");
    if (data) setPlacesByCategory(JSON.parse(data));
  }, []);

  const handlePlaceSelect = (category: string, placeId: string) => {
    setSelectedPlaces((prev) => {
      const prevSet = prev[category] || new Set();
      const newSet = new Set(prevSet);
      if (newSet.has(placeId)) {
        newSet.delete(placeId);
      } else {
        newSet.add(placeId);
      }
      return { ...prev, [category]: newSet };
    });
  };

  const handleCreateFinal = () => {
    const selected = Object.entries(selectedPlaces).flatMap(([category, set]) => Array.from(set || []));
    if (selected.length === 0) {
      alert("최소 1개 이상의 장소를 선택해주세요!");
      return;
    }
    localStorage.setItem("selectedPlaceIds", JSON.stringify(selected));
    router.push("/itinerary-results");
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <h2 className="text-2xl font-bold mb-6 text-center">카테고리별 추천 장소 선택</h2>
      <div className="grid grid-cols-2 gap-8">
        {CATEGORY_ORDER.map((category) => (
          <div key={category} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">{category}</h3>
            <div className="flex flex-col gap-4">
              {placesByCategory[category] && placesByCategory[category].length > 0 ? (
                placesByCategory[category].map((place: any) => (
                  <label key={place.place_id} className="flex items-center gap-4 p-3 rounded-lg border hover:shadow cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPlaces[category]?.has(place.place_id) || false}
                      onChange={() => handlePlaceSelect(category, place.place_id)}
                      className="accent-blue-600 w-5 h-5"
                    />
                    <img src={place.photoUrl || "/placeholder.jpg"} alt={place.displayName} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <div className="font-bold">{place.displayName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">{place.editorialSummary || place.address || "설명 없음"}</div>
                    </div>
                  </label>
                ))
              ) : (
                <div className="text-gray-400">추천 결과가 없습니다.</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Button
          size="lg"
          className="w-full max-w-md bg-teal-600 hover:bg-teal-700 text-lg font-bold"
          onClick={handleCreateFinal}
        >
          최종 일정 생성하기
        </Button>
      </div>
    </div>
  );
} 