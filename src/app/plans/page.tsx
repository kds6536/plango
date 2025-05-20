export default function PlansPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">여행 계획 만들기</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">
          AI가 추천하는 맞춤형 여행 계획을 만들어보세요.
        </p>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">여행지</label>
            <input
              type="text"
              className="border rounded-md px-3 py-2"
              placeholder="여행하고 싶은 도시나 국가를 입력하세요"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">여행 기간</label>
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
            계획 생성하기
          </button>
        </div>
      </div>
    </div>
  );
} 