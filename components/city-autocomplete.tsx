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
  const [isPlaceSelected, setIsPlaceSelected] = useState(false) // 선택 완료 플래그

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
        // [핵심 수정] address_components에서 순수한 도시 이름만 추출
        let cityName = ''
        
        if (place.address_components) {
          console.log('🔍 [ADDRESS_COMPONENTS]', place.address_components)
          
          // 우선순위: locality > administrative_area_level_1 > administrative_area_level_2
          const cityComponent = 
            place.address_components.find((component: any) => component.types.includes('locality')) ||
            place.address_components.find((component: any) => component.types.includes('administrative_area_level_1')) ||
            place.address_components.find((component: any) => component.types.includes('administrative_area_level_2'))
          
          if (cityComponent) {
            cityName = cityComponent.long_name
            console.log('✅ [CITY_EXTRACTED] 추출된 도시명:', cityName)
          }
        }
        
        // 만약 위 방법으로도 찾지 못했다면, place.name 사용
        if (!cityName && place.name) {
          cityName = place.name
          console.log('🔄 [FALLBACK_NAME] place.name 사용:', cityName)
        }
        
        // 최후의 수단: formatted_address에서 첫 번째 부분 사용 (국가명 제거)
        if (!cityName && place.formatted_address) {
          const addressParts = place.formatted_address.split(',')
          cityName = addressParts[0].trim()
          console.log('🔄 [FALLBACK_ADDRESS] formatted_address 첫 부분 사용:', cityName)
        }
        
        // [추가 정제] 도시명에서 국가명과 중복 지역명 제거
        if (cityName) {
          // 1. 일반적인 국가명 패턴 제거
          const countryPatterns = [
            ', 대한민국', ', South Korea', ', Korea', ', 한국',
            ', 일본', ', Japan', ', 중국', ', China', ', 미국', ', United States', ', USA'
          ]
          
          for (const pattern of countryPatterns) {
            if (cityName.includes(pattern)) {
              cityName = cityName.replace(pattern, '').trim()
              console.log('🧹 [COUNTRY_REMOVED] 국가명 제거 후:', cityName)
              break
            }
          }
          
          // 2. 끝에 오는 국가명 패턴도 제거
          const endPatterns = ['대한민국', 'South Korea', 'Korea', '한국', '일본', 'Japan', '중국', 'China', '미국', 'United States', 'USA']
          for (const pattern of endPatterns) {
            if (cityName.endsWith(pattern)) {
              cityName = cityName.replace(new RegExp(pattern + '$'), '').trim()
              console.log('🧹 [END_COUNTRY_REMOVED] 끝 국가명 제거 후:', cityName)
              break
            }
          }
          
          // 3. 중복된 지역명 제거 (예: "대한민국 광주광역시 광주" → "광주광역시")
          const parts = cityName.split(' ').filter(part => part.trim() !== '')
          if (parts.length > 1) {
            // 마지막 부분이 앞의 부분에 포함되어 있으면 제거
            const lastPart = parts[parts.length - 1]
            const otherParts = parts.slice(0, -1)
            
            const isDuplicate = otherParts.some(part => 
              part.includes(lastPart) || lastPart.includes(part)
            )
            
            if (isDuplicate) {
              // 더 구체적인 이름을 선택 (길이가 더 긴 것)
              const longestPart = parts.reduce((longest, current) => 
                current.length > longest.length ? current : longest
              )
              cityName = longestPart
              console.log('🧹 [DUPLICATE_REMOVED] 중복 지역명 제거 후:', cityName)
            }
          }
        }
        
        const cityData = {
          name: cityName, // 국가 이름이 제외된 순수한 도시 이름
          formatted_address: place.formatted_address || '',
          place_id: place.place_id || '',
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
        
        console.log('🏙️ [CITY_SELECTED] 최종 선택된 도시 데이터:', cityData)
        
        // 입력 필드 값을 순수한 도시 이름으로 강제 업데이트
        if (inputRef.current) {
          inputRef.current.value = cityName
        }
        
        // 선택 완료 플래그 설정
        setIsPlaceSelected(true)
        
        // 상태 업데이트
        onChange(cityName)
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
  }, [isGoogleLoaded, country, onCitySelect, onChange])

  // value prop 변경 시 input field 동기화 (선택 완료된 경우에만)
  useEffect(() => {
    if (inputRef.current && isPlaceSelected && inputRef.current.value !== value) {
      inputRef.current.value = value
      console.log('🔄 [VALUE_SYNC] input field 값 동기화:', value)
    }
  }, [value, isPlaceSelected])

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
        placeholder={isGoogleLoaded ? `${placeholder} (목록에서 선택하세요)` : "Google Maps 로딩 중..."}
        defaultValue={value} // value 대신 defaultValue 사용 (uncontrolled)
        onChange={(e) => {
          // 사용자가 타이핑을 시작하면 선택 상태 해제
          if (isPlaceSelected) {
            setIsPlaceSelected(false)
            console.log('🔄 [TYPING_START] 사용자 타이핑 시작, 선택 상태 해제')
          }
        }}
        onFocus={() => {
          // 포커스 시 선택 상태 해제 (새로운 입력 준비)
          if (isPlaceSelected) {
            setIsPlaceSelected(false)
          }
        }}
        className={className}
        disabled={!isGoogleLoaded}
      />
      {!isGoogleLoaded && (
        <p className="text-xs text-gray-500">
          Google Places API를 로딩하고 있습니다...
        </p>
      )}
      {isGoogleLoaded && (
        <p className="text-xs text-blue-600">
          💡 정확한 지역 정보를 위해 드롭다운 목록에서 선택해주세요
        </p>
      )}
    </div>
  )
}