"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// 간단한 모달 컴포넌트 (없으면 직접 구현)
function Modal({ open, onClose, children }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}

export default function ItineraryResultsPage() {
  const [finalItinerary, setFinalItinerary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState<any>(null);
  const router = useRouter();

  // 다국어: 언어코드 가져오기(예: localStorage, context 등)
  const userLang = typeof window !== "undefined" ? (localStorage.getItem("lang") || "ko") : "ko";

  useEffect(() => {
    // 예시: localStorage에서 선택된 place_id 목록 읽기
    const selected = localStorage.getItem("selectedPlaceIds");
    if (!selected) {
      setIsLoading(false);
      return;
    }
    // 실제로는 백엔드에 place_ids를 보내고, 결과를 받아야 함
    // 여기서는 더미 데이터로 대체
    setTimeout(() => {
      setFinalItinerary({
        days: [
          {
            date: "2024-07-01",
            items: [
              {
                time: "09:00",
                name: "Fort Canning Park",
                desc: "A well-known historical landmark, this grassy hilltop park hosts events such as concerts & plays.",
                photoUrl: "/placeholder.jpg",
                move: null,
                details: {
                  address: "51 Canning Rise, Singapore 179872",
                  rating: 4.6,
                  user_rating_count: 1234,
                  photos: ["/placeholder.jpg"],
                  reviews: ["Beautiful park!", "Great for a morning walk."],
                  website_uri: "https://www.nparks.gov.sg/fortcanning"
                }
              },
              {
                time: "12:00",
                name: "Seoul Bunsik 서울분식 @ Funan",
                desc: "179105, N Bridge Rd, 107호 Funan #02-02, mall",
                photoUrl: "/placeholder.jpg",
                move: { duration: "20분", type: "도보" },
                details: {
                  address: "179105, N Bridge Rd, 107호 Funan #02-02, mall",
                  rating: 4.2,
                  user_rating_count: 321,
                  photos: ["/placeholder.jpg"],
                  reviews: ["Tasty food!", "Authentic Korean street food."],
                  website_uri: ""
                }
              }
            ]
          }
        ]
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const openModal = (details: any) => {
    setModalDetails(details);
    setModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-500"></div>
        <h2 className="text-2xl font-bold mt-8">AI가 최적의 일정을 생성 중입니다...</h2>
      </div>
    );
  }

  if (!finalItinerary) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mt-8">일정 데이터를 불러올 수 없습니다.</h2>
        <Button onClick={() => router.replace("/create-itinerary")}>처음으로 돌아가기</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <h1 className="text-4xl font-extrabold mb-6 text-center">최종 맞춤 일정</h1>
      {finalItinerary.days.map((day: any, idx: number) => (
        <div key={idx} className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Day {idx + 1} ({day.date})</h2>
          <div className="space-y-6">
            {day.items.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-6 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <img src={item.photoUrl || '/placeholder.jpg'} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="font-bold text-lg">{item.time} - {item.name}</div>
                  <div className="text-gray-600 dark:text-gray-300">{item.desc}</div>
                  {item.move && (
                    <div className="text-sm text-blue-500 mt-1">→ 이동: {item.move.duration} ({item.move.type})</div>
                  )}
                  <Button size="sm" variant="outline" className="mt-2" onClick={() => openModal(item.details)}>
                    자세히 보기
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
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