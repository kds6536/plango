export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">여행 커뮤니티</h1>
      <div className="space-y-6">
        {/* 게시글 작성 폼 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">새 게시글 작성</h2>
          <div className="space-y-4">
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              placeholder="제목을 입력하세요"
            />
            <textarea
              className="w-full border rounded-md px-3 py-2 h-32"
              placeholder="여행 경험을 공유해보세요"
            ></textarea>
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors w-full">
              게시하기
            </button>
          </div>
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-4">
          {/* 게시글 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">도쿄 여행 후기</h3>
            <p className="text-gray-600 mb-4">
              도쿄에서의 5박 6일 여행 경험을 공유합니다...
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>작성자: 여행자1</span>
              <span>2024-03-15</span>
            </div>
          </div>

          {/* 게시글 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">파리 맛집 추천</h3>
            <p className="text-gray-600 mb-4">
              파리에서 꼭 가봐야 할 맛집들을 소개합니다...
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>작성자: 여행자2</span>
              <span>2024-03-14</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 