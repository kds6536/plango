"use client"

import { useState } from 'react'

interface Place {
  place_id: string
  name: string
  rating?: number
  photos?: string[]
  address?: string
  category?: string
  description?: string
  tags?: string[]
  location?: {
    lat: number
    lng: number
  }
}

interface SimpleMapProps {
  places: Place[]
  className?: string
}

export default function SimpleMap({ places, className = "h-96" }: SimpleMapProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)

  // 기본 지도 이미지 (서울 중심)
  const mapImage = "https://maps.googleapis.com/maps/api/staticmap?center=37.5665,126.9780&zoom=10&size=600x400&maptype=roadmap&key=demo"

  // 마커 위치 계산 (상대적 위치)
  const getMarkerStyle = (place: Place, index: number) => {
    if (!place.location) {
      // 위치 정보가 없으면 기본 위치 사용
      return {
        left: `${20 + (index * 15)}%`,
        top: `${30 + (index * 10)}%`
      }
    }

    // 실제 좌표를 화면 좌표로 변환 (간단한 변환)
    const lat = place.location.lat
    const lng = place.location.lng
    
    // 서울 중심 기준으로 상대적 위치 계산
    const latDiff = lat - 37.5665
    const lngDiff = lng - 126.9780
    
    const left = 50 + (lngDiff * 1000) // 경도 차이를 픽셀 위치로 변환
    const top = 50 - (latDiff * 1000)  // 위도 차이를 픽셀 위치로 변환
    
    return {
      left: `${Math.max(5, Math.min(95, left))}%`,
      top: `${Math.max(5, Math.min(95, top))}%`
    }
  }

  return (
    <div className={`${className} relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800`}>
      {/* 지도 배경 */}
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-800 relative">
        {/* 지도 격자 패턴 */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        {/* 지도 제목 */}
        <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">🗺️ Travel Route Map</h3>
        </div>

        {/* 장소 마커들 */}
        {places.map((place, index) => {
          const markerStyle = getMarkerStyle(place, index)
          
          return (
            <div
              key={place.place_id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={markerStyle}
              onClick={() => setSelectedPlace(selectedPlace?.place_id === place.place_id ? null : place)}
            >
              {/* 마커 */}
              <div className="relative">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg border-2 border-white">
                  {index + 1}
                </div>
                
                {/* 마커 꼬리 */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500" />
                
                {/* 장소 이름 */}
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium shadow-sm whitespace-nowrap">
                  {place.name}
                </div>
              </div>
            </div>
          )
        })}

        {/* 선택된 장소 정보창 */}
        {selectedPlace && (
          <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {selectedPlace.name}
                </h4>
                {selectedPlace.address && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    📍 {selectedPlace.address}
                  </p>
                )}
                {selectedPlace.rating && (
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    ⭐ {selectedPlace.rating.toFixed(1)}
                  </p>
                )}
                {selectedPlace.category && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    #{selectedPlace.category}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedPlace(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* 경로 선 (연결선) */}
        {places.length >= 2 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
              </marker>
            </defs>
            <g>
              {places.slice(0, -1).map((place, index) => {
                const nextPlace = places[index + 1]
                const startStyle = getMarkerStyle(place, index)
                const endStyle = getMarkerStyle(nextPlace, index + 1)
                
                const startX = parseFloat(startStyle.left)
                const startY = parseFloat(startStyle.top)
                const endX = parseFloat(endStyle.left)
                const endY = parseFloat(endStyle.top)
                
                return (
                  <line
                    key={`route-${index}`}
                    x1={`${startX}%`}
                    y1={`${startY}%`}
                    x2={`${endX}%`}
                    y2={`${endY}%`}
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    markerEnd="url(#arrowhead)"
                  />
                )
              })}
            </g>
          </svg>
        )}

        {/* 범례 */}
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm text-xs">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-300">Selected Places</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
            <span className="text-gray-600 dark:text-gray-300">Route</span>
          </div>
        </div>
      </div>
    </div>
  )
} 