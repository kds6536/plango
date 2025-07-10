"use client"

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Minus } from "lucide-react";

const COUNTRY_LIST = ["한국", "일본", "미국", "프랑스", "영국", "이탈리아", "스페인", "호주", "캐나다", "태국"];
const AGE_RANGES = ["10대이하", "10대", "20대", "30대", "40대", "50대 이상"];
const GENDER_OPTIONS = { male: "남성", female: "여성", none: "선택 안함" };

export default function CreateItineraryPage() {
  const router = useRouter();
  const [country, setCountry] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const cityInputRef = useRef<HTMLInputElement>(null);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState("");
  const [ageRanges, setAgeRanges] = useState<string[]>([]);
  const [gender, setGender] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

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
  const isFormValid =
    country &&
    cities.length > 0 &&
    dateFrom &&
    dateTo &&
    travelers > 0 &&
    budget &&
    gender;

  // API 호출 및 추천 결과 페이지로 이동
  const handleGenerateItinerary = async () => {
    if (!isFormValid) {
      alert("모든 필수 정보를 입력해주세요!");
      return;
    }
    // 예시: 추천 API 호출 및 결과 localStorage 저장
    const dummyResult = {
      country,
      cities,
      dateFrom,
      dateTo,
      travelers,
      budget,
      ageRanges,
      gender,
      specialRequests,
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
          국가, 도시, 날짜, 인원, 예산 등 정보를 입력하면 AI가 맞춤 여행 일정을 추천해드립니다.
        </p>
      </div>
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        {/* 국가 입력을 <Input /> 텍스트 인풋으로 변경 */}
        {/* 도시 입력은 Chip UI 유지, 태그는 '국가 도시' 조합으로 표시 */}
        {/* 나머지 입력 항목(날짜, 인원, 예산 등)은 그대로 유지 */}
        <div className="mb-6">
          <Label htmlFor="country" className="text-lg font-semibold">국가 입력</Label>
          <Input
            id="country"
            placeholder="예: 한국, 일본, 미국..."
            value={country}
            onChange={e => setCountry(e.target.value)}
            className="mb-4"
          />
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
                <span>{country ? `${country} ${city}` : city}</span>
                <button onClick={() => handleRemoveCity(idx)} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* 날짜 선택 */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <Label htmlFor="dateFrom" className="text-lg font-semibold">여행 시작일</Label>
            <Input
              id="dateFrom"
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="dateTo" className="text-lg font-semibold">여행 종료일</Label>
            <Input
              id="dateTo"
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
            />
          </div>
        </div>
        {/* 인원수 */}
        <div className="mb-6">
          <Label htmlFor="travelers" className="text-lg font-semibold">인원수</Label>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => setTravelers(Math.max(1, travelers - 1))}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-bold w-12 text-center">{travelers} 명</span>
            <Button variant="outline" size="icon" onClick={() => setTravelers(travelers + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* 예산 */}
        <div className="mb-6">
          <Label htmlFor="budget" className="text-lg font-semibold">예산(원)</Label>
          <Input
            id="budget"
            type="number"
            placeholder="예: 1000000"
            value={budget}
            onChange={e => setBudget(e.target.value.replace(/[^0-9]/g, ""))}
          />
        </div>
        {/* 연령대 */}
        <div className="mb-6">
          <Label className="text-lg font-semibold">연령대 (복수 선택 가능)</Label>
          <div className="flex flex-wrap gap-2">
            {AGE_RANGES.map((age, index) => (
              <Button
                key={index}
                variant={ageRanges.includes(age) ? "default" : "outline"}
                onClick={() => {
                  if (ageRanges.includes(age)) {
                    setAgeRanges(ageRanges.filter((r) => r !== age));
                  } else {
                    setAgeRanges([...ageRanges, age]);
                  }
                }}
              >
                {age}
              </Button>
            ))}
          </div>
        </div>
        {/* 성별 */}
        <div className="mb-6">
          <Label htmlFor="gender" className="text-lg font-semibold">성별</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="성별을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">{GENDER_OPTIONS.male}</SelectItem>
              <SelectItem value="female">{GENDER_OPTIONS.female}</SelectItem>
              <SelectItem value="none">{GENDER_OPTIONS.none}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* 특별 요청사항 */}
        <div className="mb-6">
          <Label htmlFor="special-requests" className="text-lg font-semibold">특별 요청사항 (선택)</Label>
          <Textarea
            id="special-requests"
            placeholder="원하시는 여행 스타일, 특별한 요청사항, 관심사, 피하고 싶은 것들을 자유롭게 작성해주세요."
            value={specialRequests}
            onChange={e => setSpecialRequests(e.target.value)}
            rows={4}
          />
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