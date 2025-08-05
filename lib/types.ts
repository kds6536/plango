// Plango v6.0 - Single Source of Truth 타입 정의

export interface Destination {
  country: string
  city: string
  start_date: string
  end_date: string
}

export interface ItineraryRequest {
  destinations: Destination[]
  total_duration: number
  travelers_count: number
  budget_range: string
  travel_style: string[]
  special_requests: string
  language_code: string
}

export interface PlaceData {
  place_id: string
  name: string
  category: string
  lat: number
  lng: number
  rating?: number
  address?: string
  description?: string
}

export interface RecommendationResponse {
  places: PlaceData[]
}

export interface ActivityItem {
  time: string
  activity: string
  location: string
  description: string
  duration: string
  cost?: string
  tips?: string
}

export interface DayPlan {
  day: number
  theme: string
  activities: ActivityItem[]
  meals: Record<string, string>
  transportation: string[]
  estimated_cost: string
}

export interface TravelPlan {
  title: string
  concept: string
  daily_plans: DayPlan[]
  places: PlaceData[]
}

export interface OptimizeResponse {
  optimized_plan: TravelPlan
  total_distance?: string
  total_duration?: string
  optimization_details?: Record<string, any>
}

export interface GenerateResponse {
  plan_a: TravelPlan
  plan_b: TravelPlan
  request_id: string
  generated_at: string
} 