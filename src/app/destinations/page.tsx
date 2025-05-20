export default function DestinationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">인기 여행지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 도쿄 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">도쿄, 일본</h2>
            <p className="text-gray-600 mb-4">
              현대와 전통이 공존하는 매력적인 도시
            </p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors w-full">
              자세히 보기
            </button>
          </div>
        </div>

        {/* 파리 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">파리, 프랑스</h2>
            <p className="text-gray-600 mb-4">
              예술과 로맨스의 도시
            </p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors w-full">
              자세히 보기
            </button>
          </div>
        </div>

        {/* 뉴욕 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">뉴욕, 미국</h2>
            <p className="text-gray-600 mb-4">
              끝없는 가능성의 도시
            </p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors w-full">
              자세히 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 