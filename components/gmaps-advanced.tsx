"use client"

import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api"
import { useMemo } from "react"

interface Place {
  place_id: string
  name: string
  location?: { lat: number; lng: number }
}

interface ItineraryDay {
  day: number
  date: string
  places: Place[]
  totalTime: string
  theme: string
}

export default function GmapsAdvanced({
  itinerary,
  className = "h-96 w-full",
}: {
  itinerary: ItineraryDay[]
  className?: string
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places", "geometry"],
  })

  const allPlaces: Place[] = useMemo(
    () => itinerary.flatMap((d) => d.places).filter((p) => !!p.location),
    [itinerary]
  )

  const center = allPlaces[0]?.location || { lat: 37.5665, lng: 126.978 }

  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444"]

  if (loadError) {
    return <div className={`${className} flex items-center justify-center`}>지도를 불러오지 못했습니다.</div>
  }
  if (!isLoaded) {
    return (
      <div className={`${className} bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className={`${className} rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700`}>
      <GoogleMap
        center={center}
        zoom={12}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{ streetViewControl: false }}
      >
        {itinerary.map((day, di) => {
          const dayColor = colors[di % colors.length]
          const path = day.places
            .filter((p) => p.location)
            .map((p) => ({ lat: p.location!.lat, lng: p.location!.lng }))
          return (
            <>
              {day.places.map((p, idx) => {
                const svg = encodeURIComponent(
                  `<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'>
                    <circle cx='18' cy='18' r='14' fill='${dayColor}' stroke='white' stroke-width='2'/>
                    <text x='18' y='22' text-anchor='middle' font-size='12' font-weight='bold' fill='white'>${idx + 1}</text>
                  </svg>`
                )
                return (
                  <Marker
                    key={`${day.day}-${p.place_id}`}
                    position={p.location || center}
                    icon={`data:image/svg+xml;charset=UTF-8,${svg}`}
                    title={`${day.day}일차 · ${p.name}`}
                  />
                )
              })}
              {path.length >= 2 && (
                <Polyline
                  path={path}
                  options={{ strokeColor: dayColor, strokeOpacity: 0.9, strokeWeight: 3 }}
                />
              )}
            </>
          )
        })}
      </GoogleMap>
    </div>
  )
}


