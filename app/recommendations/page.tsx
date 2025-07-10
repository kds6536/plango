"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// Modal 컴포넌트가 없다면 아래처럼 간단히 직접 구현하거나, 기존 UI 라이브러리 사용
function Modal({ open, onClose, children }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}

const CATEGORY_ORDER = ["볼거리", "즐길거리", "먹거리", "숙소"];

export default function RecommendationsPage() {
  const router = useRouter();
  const [placesByCategory, setPlacesByCategory] = useState<any>({});
  const [selectedPlaces, setSelectedPlaces] = useState<{ [category: string]: Set<string> }>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState<any>(null);

  // 다국어: 언어코드 가져오기(예: localStorage, context 등)
  const userLang = typeof window !== "undefined" ? (localStorage.getItem("lang") || "ko") : "ko";

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

  // 자세히 보기 모달 열기
  const openModal = (details: any) => {
    setModalDetails(details);
    setModalOpen(true);
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
                    <img src={place.photos?.[0] || place.photoUrl || "/placeholder.jpg"} alt={place.name} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <div className="font-bold">{place.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">{place.short_description || place.editorialSummary || place.address || "설명 없음"}</div>
                      <Button size="sm" variant="outline" onClick={(e) => { e.preventDefault(); openModal(place.full_details || place); }}>
                        자세히 보기
                      </Button>
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
      {/* 자세히 보기 모달 */}
      {modalOpen && modalDetails && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div>
            <h2 className="text-2xl font-bold mb-4">{modalDetails.name}</h2>
            <img src={modalDetails.photos?.[0] || "/placeholder.jpg"} alt={modalDetails.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <div className="mb-2">{modalDetails.address}</div>
            <div className="mb-2">평점: {modalDetails.rating} ({modalDetails.user_rating_count}명)</div>
            <div className="mb-2">{modalDetails.short_description}</div>
            <div className="mb-2">{modalDetails.website_uri && <a href={modalDetails.website_uri} target="_blank" rel="noopener noreferrer">공식 웹사이트</a>}</div>
            <div className="mb-2">
              {modalDetails.reviews && modalDetails.reviews.map((r: any, i: number) => (
                <div key={i} className="text-sm text-gray-600 mb-1">"{r}"</div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}