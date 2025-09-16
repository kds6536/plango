"use client"

import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CityAutocompleteProps {
  id: string
  label: string
  placeholder: string
  value: string
  country: string
  onCitySelect: (cityData: {
    name: string
    formatted_address: string
    place_id: string
    lat: number
    lng: number
  }) => void
  onChange: (value: string) => void
  className?: string
}

declare global {
  interface Window {
    google: any
  }
}

export default function CityAutocomplete({
  id,
  label,
  placeholder,
  value,
  country,
  onCitySelect,
  onChange,
  className
}: CityAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<any>(null)
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false)

  // Google Maps API 로드 확인
  useEffect(() => {
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsGoogleLoaded(true)
      } else {
        // Google Maps API가 아직 로드되지 않았으면 잠시 후 다시 확인
        setTimeout(checkGoogleMaps, 100)
      }
    }
    
    checkGoogleMaps()
  }, [])

  // Autocomplete 초기화
  useEffect(() => {
    if (!isGoogleLoaded || !inputRef.current) return

    // 국가 코드 매핑
    const countryCodeMap: { [key: string]: string } = {
      '대한민국': 'kr',
      '한국': 'kr',
      'South Korea': 'kr',
      'Korea': 'kr',
      '일본': 'jp',
      'Japan': 'jp',
      '중국': 'cn',
      'China': 'cn',
      '미국': 'us',
      'United States': 'us',
      'USA': 'us'
    }

    const countryCode = countryCodeMap[country] || 'kr'

    // Autocomplete 옵션 설정
    const options = {
      types: ['(cities)'], // 도시만 검색
      componentRestrictions: { country: countryCode }, // 선택된 국가로 제한
      fields: ['name', 'formatted_address', 'place_id', 'geometry'] // 필요한 필드만 요청
    }

    // Autocomplete 인스턴스 생성
    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    )

    // 장소 선택 이벤트 리스너
    const handlePlaceChanged = () => {
      const place = autocompleteRef.current.getPlace()
      
      if (place.geometry && place.geometry.location) {
        const cityData = {
          name: place.name || place.formatted_address?.split(',')[0] || '',
          formatted_address: place.formatted_address || '',
          place_id: place.place_id || '',
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
        
        console.log('🏙️ [CITY_SELECTED] 선택된 도시:', cityData)
        onCitySelect(cityData)
      }
    }

    autocompleteRef.current.addListener('place_changed', handlePlaceChanged)

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [isGoogleLoaded, country, onCitySelect])

  // 국가 변경 시 Autocomplete 옵션 업데이트
  useEffect(() => {
    if (!autocompleteRef.current || !country) return

    const countryCodeMap: { [key: string]: string } = {
      '대한민국': 'kr',
      '한국': 'kr',
      'South Korea': 'kr',
      'Korea': 'kr',
      '일본': 'jp',
      'Japan': 'jp',
      '중국': 'cn',
      'China': 'cn',
      '미국': 'us',
      'United States': 'us',
      'USA': 'us'
    }

    const countryCode = countryCodeMap[country] || 'kr'
    
    autocompleteRef.current.setComponentRestrictions({ country: countryCode })
  }, [country])

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </Label>
      <Input
        ref={inputRef}
        id={id}
        type="text"
        placeholder={isGoogleLoaded ? placeholder : "Google Maps 로딩 중..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        disabled={!isGoogleLoaded}
      />
      {!isGoogleLoaded && (
        <p className="text-xs text-gray-500">
          Google Places API를 로딩하고 있습니다...
        </p>
      )}
    </div>
  )
}