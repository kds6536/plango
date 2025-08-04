"use client"

import { useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

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

interface ItineraryDay {
  day: number
  date: string
  places: Place[]
  totalTime: string
  theme: string
}

interface TravelInfo {
  destinations: Array<{
    country: string
    city: string
    startDate: string
    endDate: string
  }>
  total_duration: number
  travelers_count?: number
  budget_range?: string
  travel_style?: string
  special_requests?: string
  language_code?: string
}

interface PDFGeneratorProps {
  itinerary: ItineraryDay[]
  selectedPlaces: Place[]
  travelInfo: TravelInfo
  onGenerateStart?: () => void
  onGenerateComplete?: () => void
  onGenerateError?: (error: string) => void
}

export default function PDFGenerator({ 
  itinerary, 
  selectedPlaces, 
  travelInfo,
  onGenerateStart,
  onGenerateComplete,
  onGenerateError 
}: PDFGeneratorProps) {
  const pdfRef = useRef<HTMLDivElement>(null)

  const generatePDF = async () => {
    try {
      onGenerateStart?.()
      
      if (!pdfRef.current) {
        throw new Error('PDF content element not found')
      }

      // PDF 생성 준비
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 20
      const contentWidth = pageWidth - (margin * 2)
      
      let currentY = margin
      const lineHeight = 7
      const sectionGap = 15

      // 제목
      pdf.setFontSize(24)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(59, 130, 246) // blue-500
      pdf.text('🎉 Your Travel Itinerary', pageWidth / 2, currentY, { align: 'center' })
      currentY += lineHeight * 2

      // 여행 정보
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(0, 0, 0)
      pdf.text('Travel Information', margin, currentY)
      currentY += lineHeight

      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      
      // 목적지 정보
      const destinations = travelInfo.destinations || []
      if (destinations.length > 0) {
        const dest = destinations[0]
        pdf.text(`Destination: ${dest.city}, ${dest.country}`, margin, currentY)
        currentY += lineHeight
        pdf.text(`Duration: ${travelInfo.total_duration} days`, margin, currentY)
        currentY += lineHeight
        pdf.text(`Period: ${dest.startDate} - ${dest.endDate}`, margin, currentY)
        currentY += lineHeight
      }

      if (travelInfo.travelers_count) {
        pdf.text(`Travelers: ${travelInfo.travelers_count} people`, margin, currentY)
        currentY += lineHeight
      }

      if (travelInfo.budget_range) {
        pdf.text(`Budget: ${travelInfo.budget_range}`, margin, currentY)
        currentY += lineHeight
      }

      if (travelInfo.travel_style) {
        pdf.text(`Style: ${travelInfo.travel_style}`, margin, currentY)
        currentY += lineHeight
      }

      currentY += sectionGap

      // 선택된 장소 요약
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Selected Places', margin, currentY)
      currentY += lineHeight

      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      
      selectedPlaces.forEach((place, index) => {
        const placeText = `${index + 1}. ${place.name}`
        if (pdf.getTextWidth(placeText) > contentWidth) {
          // 긴 텍스트는 줄바꿈
          const words = placeText.split(' ')
          let line = ''
          for (const word of words) {
            const testLine = line + word + ' '
            if (pdf.getTextWidth(testLine) > contentWidth) {
              pdf.text(line, margin, currentY)
              currentY += lineHeight
              line = word + ' '
            } else {
              line = testLine
            }
          }
          if (line) {
            pdf.text(line, margin, currentY)
            currentY += lineHeight
          }
        } else {
          pdf.text(placeText, margin, currentY)
          currentY += lineHeight
        }

        if (place.address) {
          pdf.setFontSize(8)
          pdf.setTextColor(100, 100, 100)
          pdf.text(`   📍 ${place.address}`, margin, currentY)
          currentY += lineHeight
        }

        if (place.rating) {
          pdf.setTextColor(245, 158, 11) // yellow-500
          pdf.text(`   ⭐ ${place.rating.toFixed(1)}`, margin, currentY)
          currentY += lineHeight
        }

        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(10)
      })

      currentY += sectionGap

      // 일정 상세
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Daily Itinerary', margin, currentY)
      currentY += lineHeight

      itinerary.forEach((day, dayIndex) => {
        // 새 페이지 확인
        if (currentY > pageHeight - 60) {
          pdf.addPage()
          currentY = margin
        }

        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(59, 130, 246) // blue-500
        pdf.text(`Day ${day.day} - ${day.theme}`, margin, currentY)
        currentY += lineHeight

        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(100, 100, 100)
        pdf.text(day.date, margin, currentY)
        currentY += lineHeight

        pdf.setTextColor(0, 0, 0)
        day.places.forEach((place, placeIndex) => {
          const time = `${9 + placeIndex * 2}:00`
          const placeText = `${time} - ${place.name}`
          
          if (pdf.getTextWidth(placeText) > contentWidth) {
            // 긴 텍스트는 줄바꿈
            const words = placeText.split(' ')
            let line = ''
            for (const word of words) {
              const testLine = line + word + ' '
              if (pdf.getTextWidth(testLine) > contentWidth) {
                pdf.text(line, margin + 10, currentY)
                currentY += lineHeight
                line = word + ' '
              } else {
                line = testLine
              }
            }
            if (line) {
              pdf.text(line, margin + 10, currentY)
              currentY += lineHeight
            }
          } else {
            pdf.text(placeText, margin + 10, currentY)
            currentY += lineHeight
          }

          if (place.address) {
            pdf.setFontSize(8)
            pdf.setTextColor(100, 100, 100)
            pdf.text(`     📍 ${place.address}`, margin + 10, currentY)
            currentY += lineHeight
          }

          if (place.rating) {
            pdf.setTextColor(245, 158, 11) // yellow-500
            pdf.text(`     ⭐ ${place.rating.toFixed(1)}`, margin + 10, currentY)
            currentY += lineHeight
          }

          pdf.setTextColor(0, 0, 0)
          pdf.setFontSize(10)
        })

        currentY += lineHeight
      })

      // 푸터
      const totalPages = pdf.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        pdf.setFontSize(8)
        pdf.setTextColor(100, 100, 100)
        pdf.text(`Generated by PlanGo - Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' })
        pdf.text(new Date().toLocaleDateString(), pageWidth - margin, pageHeight - 10, { align: 'right' })
      }

      // PDF 다운로드
      const fileName = `travel-itinerary-${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)

      onGenerateComplete?.()

    } catch (error) {
      console.error('PDF 생성 실패:', error)
      onGenerateError?.(error instanceof Error ? error.message : 'PDF 생성 중 오류가 발생했습니다.')
    }
  }

  return (
    <div>
      {/* 숨겨진 PDF 내용 (참조용) */}
      <div ref={pdfRef} className="hidden">
        <div className="p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-500 mb-6">🎉 Your Travel Itinerary</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Travel Information</h2>
            <div className="space-y-2 text-sm">
              {travelInfo.destinations?.map((dest, index) => (
                <div key={index}>
                  <p>Destination: {dest.city}, {dest.country}</p>
                  <p>Duration: {travelInfo.total_duration} days</p>
                  <p>Period: {dest.startDate} - {dest.endDate}</p>
                </div>
              ))}
              {travelInfo.travelers_count && <p>Travelers: {travelInfo.travelers_count} people</p>}
              {travelInfo.budget_range && <p>Budget: {travelInfo.budget_range}</p>}
              {travelInfo.travel_style && <p>Style: {travelInfo.travel_style}</p>}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Selected Places</h2>
            <div className="space-y-2">
              {selectedPlaces.map((place, index) => (
                <div key={place.place_id} className="pl-4">
                  <p className="font-medium">{index + 1}. {place.name}</p>
                  {place.address && <p className="text-sm text-gray-600">📍 {place.address}</p>}
                  {place.rating && <p className="text-sm text-yellow-600">⭐ {place.rating.toFixed(1)}</p>}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Daily Itinerary</h2>
            <div className="space-y-6">
              {itinerary.map((day, dayIndex) => (
                <div key={dayIndex} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-blue-500">Day {day.day} - {day.theme}</h3>
                  <p className="text-sm text-gray-600 mb-2">{day.date}</p>
                  <div className="space-y-2">
                    {day.places.map((place, placeIndex) => (
                      <div key={place.place_id} className="pl-4">
                        <p className="font-medium">{9 + placeIndex * 2}:00 - {place.name}</p>
                        {place.address && <p className="text-sm text-gray-600">📍 {place.address}</p>}
                        {place.rating && <p className="text-sm text-yellow-600">⭐ {place.rating.toFixed(1)}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={generatePDF}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        📄 Generate PDF
      </button>
    </div>
  )
} 