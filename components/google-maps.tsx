"use client"

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

// Google Maps 타입 정의
declare global {
  namespace google {
    namespace maps {
      class Map {
        constructor(element: HTMLElement, options?: MapOptions)
        fitBounds(bounds: LatLngBounds): void
      }
      
      class Marker {
        constructor(options?: MarkerOptions)
        setMap(map: Map | null): void
        getPosition(): LatLng
        addListener(event: string, handler: Function): void
      }
      
      class DirectionsService {
        route(request: DirectionsRequest, callback: (result: DirectionsResult | null, status: DirectionsStatus) => void): void
      }
      
      class DirectionsRenderer {
        constructor(options?: DirectionsRendererOptions)
        setMap(map: Map | null): void
        setDirections(result: DirectionsResult): void
      }
      
      class InfoWindow {
        constructor(options?: InfoWindowOptions)
        open(map: Map, anchor?: Marker): void
      }
      
      class LatLngBounds {
        extend(point: LatLng): void
      }
      
      class LatLng {
        constructor(lat: number, lng: number)
      }
      
      class Size {
        constructor(width: number, height: number)
      }
      
      class Point {
        constructor(x: number, y: number)
      }
      
      enum MapTypeId {
        ROADMAP = 'roadmap'
      }
      
      enum TravelMode {
        DRIVING = 'DRIVING'
      }
      
      interface MapOptions {
        center?: LatLng
        zoom?: number
        mapTypeId?: MapTypeId
        mapTypeControl?: boolean
        streetViewControl?: boolean
        fullscreenControl?: boolean
        zoomControl?: boolean
        styles?: any[]
      }
      
      interface MarkerOptions {
        position?: LatLng
        map?: Map
        title?: string
        label?: MarkerLabel
        icon?: Icon
      }
      
      interface MarkerLabel {
        text?: string
        color?: string
        fontWeight?: string
      }
      
      interface Icon {
        url?: string
        scaledSize?: Size
        anchor?: Point
      }
      
      interface InfoWindowOptions {
        content?: string
      }
      
      interface DirectionsRendererOptions {
        map?: Map
        suppressMarkers?: boolean
      }
      
      interface DirectionsRequest {
        origin?: LatLng | string
        destination?: LatLng | string
        waypoints?: DirectionsWaypoint[]
        optimizeWaypoints?: boolean
        travelMode?: TravelMode
      }
      
      interface DirectionsWaypoint {
        location?: LatLng
        stopover?: boolean
      }
      
      interface DirectionsResult {
        routes: DirectionsRoute[]
      }
      
      interface DirectionsRoute {
        legs: DirectionsLeg[]
      }
      
      interface DirectionsLeg {
        steps: DirectionsStep[]
      }
      
      interface DirectionsStep {
        instructions: string
      }
      
      type DirectionsStatus = 'OK' | 'NOT_FOUND' | 'ZERO_RESULTS' | 'MAX_WAYPOINTS_EXCEEDED' | 'MAX_ROUTE_LENGTH_EXCEEDED' | 'INVALID_REQUEST' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'UNKNOWN_ERROR'
    }
  }
}

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

interface GoogleMapsProps {
  places: Place[]
  className?: string
}

export default function GoogleMaps({ places, className = "h-96" }: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null)
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null)

  useEffect(() => {
    const initMap = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // 1. 변수에 할당하여 명확하게 만듭니다.
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

        // 2. 이 변수의 타입과 값을 콘솔에 직접 출력합니다.
        console.log("--- VERCEL ENV CHECK (google-maps.tsx) ---");
        console.log("Type of API Key:", typeof apiKey);
        console.log("Value of API Key:", apiKey);
        console.log("Length of API Key:", apiKey ? apiKey.length : 'N/A');
        console.log("First 10 chars:", apiKey ? apiKey.substring(0, 10) : 'N/A');
        console.log("Last 10 chars:", apiKey ? apiKey.substring(apiKey.length - 10) : 'N/A');
        console.log("----------------------------------------");

        const loader = new Loader({
          apiKey: apiKey || 'demo-key',
          version: 'weekly',
          libraries: ['places', 'geometry']
        })

        const google = await loader.load()
        
        if (!mapRef.current) return

        // 기본 중심점 설정 (서울)
        const defaultCenter = { lat: 37.5665, lng: 126.9780 }
        
        // 장소들의 위치 정보가 있으면 첫 번째 장소를 중심으로 설정
        const center = places.length > 0 && places[0].location 
          ? places[0].location 
          : defaultCenter

        const mapInstance = new google.maps.Map(mapRef.current, {
          center,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        })

        setMap(mapInstance)
        setDirectionsService(new google.maps.DirectionsService())
        setDirectionsRenderer(new google.maps.DirectionsRenderer({
          map: mapInstance,
          suppressMarkers: true // 우리가 직접 마커를 관리할 것이므로
        }))

      } catch (err) {
        console.error('Google Maps 로딩 실패:', err)
        setError('지도를 불러오는데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    initMap()
  }, [])

  // 장소들에 마커 추가 및 경로 그리기
  useEffect(() => {
    if (!map || !directionsService || !directionsRenderer || places.length === 0) return

    // 기존 마커들 제거
    markers.forEach(marker => marker.setMap(null))
    const newMarkers: google.maps.Marker[] = []

    // 각 장소에 마커 추가
    places.forEach((place, index) => {
      // 실제 위치 정보가 없으면 더미 위치 사용
      const position = place.location || {
        lat: 37.5665 + (index * 0.01),
        lng: 126.9780 + (index * 0.01)
      }

      const marker = new google.maps.Marker({
        position,
        map,
        title: place.name,
        label: {
          text: `${index + 1}`,
          color: 'white',
          fontWeight: 'bold'
        },
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#4285F4" stroke="#ffffff" stroke-width="2"/>
              <text x="20" y="25" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${index + 1}</text>
            </svg>
          `)}`,
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 20)
        }
      })

      // 정보창 추가
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin: 0 0 5px 0; font-size: 14px; font-weight: bold;">${place.name}</h3>
            ${place.address ? `<p style="margin: 0 0 5px 0; font-size: 12px; color: #666;">${place.address}</p>` : ''}
            ${place.rating ? `<p style="margin: 0; font-size: 12px; color: #f39c12;">⭐ ${place.rating}</p>` : ''}
          </div>
        `
      })

      marker.addListener('click', () => {
        infoWindow.open(map, marker)
      })

      newMarkers.push(marker)
    })

    setMarkers(newMarkers)

    // 경로 그리기 (2개 이상의 장소가 있을 때)
    if (places.length >= 2) {
      const waypoints = places.slice(1, -1).map(place => ({
        location: place.location || { lat: 37.5665, lng: 126.9780 },
        stopover: true
      }))

      const request: google.maps.DirectionsRequest = {
        origin: places[0].location || { lat: 37.5665, lng: 126.9780 },
        destination: places[places.length - 1].location || { lat: 37.5665, lng: 126.9780 },
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      }

      directionsService.route(request, (result, status) => {
        if (status === 'OK' && result) {
          directionsRenderer.setDirections(result)
        }
      })
    }

    // 모든 마커가 보이도록 지도 범위 조정
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds()
      newMarkers.forEach(marker => {
        bounds.extend(marker.getPosition()!)
      })
      map.fitBounds(bounds)
    }

  }, [map, places, directionsService, directionsRenderer])

  if (isLoading) {
    return (
      <div className={`${className} bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">지도를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${className} bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">🗺️</div>
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <p className="text-sm text-gray-500 mt-2">Google Maps API 키를 확인해주세요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className} rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700`}>
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
} 