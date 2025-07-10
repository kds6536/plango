"use client"

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus } from "lucide-react";

const COUNTRY_LIST = ["한국", "일본", "미국", "프랑스", "영국", "이탈리아", "스페인", "호주", "캐나다", "태국"];

export default function CreateItineraryPage() {
  const router = useRouter();
  const [country, setCountry] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const cityInputRef = useRef<HTMLInputElement>(null);

  // 도시 자동 추가 (Enter/Blur)
  const handleCityInputAdd = () => {
    const value = cityInput.trim();
    if (value && !cities.includes(value)) {
      setCities([...cities, value]);
      setCityInput("");
    }
  };

  // +버튼 클릭
  const handleAddCity = () => {
    handleCityInputAdd();
    if (cityInputRef.current) cityInputRef.current.focus();
  };

  // X버튼으로 도시 삭제
  const handleRemoveCity = (idx: number) => {
    setCities(cities.filter((_, i) => i !== idx));
  };

  // 유효성 검사
  const isFormValid = country && cities.length > 0;

  // API 호출 및 추천 결과 페이지로 이동
  const handleGenerateItinerary = async () => {
    if (!isFormValid) {
      alert("국가와 도시를 모두 입력해주세요!");
      return;
    }
    // 예시: 추천 API 호출 및 결과 localStorage 저장
    // 실제로는 백엔드와 연동 필요
    const dummyResult = {
      country,
      cities,
      // ...추가 입력값
    };
    localStorage.setItem("itineraryInput", JSON.stringify(dummyResult));
    router.push("/recommendations");
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          여행 일정 만들기
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          국가와 도시를 입력하면 AI가 맞춤 여행 일정을 추천해드립니다.
        </p>
      </div>
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        {/* 국가 선택 */}
        <div className="mb-6">
          <Label htmlFor="country" className="text-lg font-semibold">국가 선택</Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger id="country">
              <SelectValue placeholder="국가를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_LIST.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* 도시 입력 + Chip UI */}
        <div className="mb-6">
          <Label htmlFor="city" className="text-lg font-semibold">도시 입력</Label>
          <div className="flex items-center gap-2">
            <Input
              id="city"
              ref={cityInputRef}
              placeholder="예: 도쿄, 파리, 뉴욕..."
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleCityInputAdd(); }}
              onBlur={handleCityInputAdd}
              className="flex-grow"
            />
            <Button onClick={handleAddCity} size="icon" variant="outline"><Plus className="h-4 w-4" /></Button>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {cities.map((city, idx) => (
              <div key={idx} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">
                <span>{city}</span>
                <button onClick={() => handleRemoveCity(idx)} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <Button
          disabled={!isFormValid}
          onClick={handleGenerateItinerary}
          className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-lg font-bold py-3 mt-6"
        >
          맞춤 여행 일정 생성하기
        </Button>
      </div>
    </div>
  );
}
