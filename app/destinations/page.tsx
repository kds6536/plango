"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Users, Clock } from "lucide-react"
import Link from "next/link"
import { LanguageWrapper, useTranslations } from "@/components/language-wrapper"

function DestinationsContent() {
  const t = useTranslations()

  const destinations = [
    {
      id: 1,
      name: t.destinations.cities.tokyo,
      country: t.destinations.countries.japan,
      rating: 4.8,
      reviews: 1234,
      duration: "3-5일",
      travelers: "2-4명",
      tags: [t.destinations.tags.culture, t.destinations.tags.food, t.destinations.tags.shopping],
      image: "/placeholder.svg?height=200&width=300",
      description: t.destinations.descriptions.tokyo,
    },
    {
      id: 2,
      name: t.destinations.cities.paris,
      country: t.destinations.countries.france,
      rating: 4.9,
      reviews: 2156,
      duration: "4-7일",
      travelers: "2명",
      tags: [t.destinations.tags.romantic, t.destinations.tags.art, t.destinations.tags.history],
      image: "/placeholder.svg?height=200&width=300",
      description: t.destinations.descriptions.paris,
    },
    {
      id: 3,
      name: t.destinations.cities.jeju,
      country: t.destinations.countries.korea,
      rating: 4.7,
      reviews: 892,
      duration: "2-4일",
      travelers: "2-6명",
      tags: [t.destinations.tags.nature, t.destinations.tags.healing, t.destinations.tags.beach],
      image: "/placeholder.svg?height=200&width=300",
      description: t.destinations.descriptions.jeju,
    },
    {
      id: 4,
      name: t.destinations.cities.newYork,
      country: t.destinations.countries.usa,
      rating: 4.6,
      reviews: 3421,
      duration: "4-6일",
      travelers: "1-4명",
      tags: [t.destinations.tags.city, t.destinations.tags.culture, t.destinations.tags.shopping],
      image: "/placeholder.svg?height=200&width=300",
      description: t.destinations.descriptions.newYork,
    },
    {
      id: 5,
      name: t.destinations.cities.bangkok,
      country: t.destinations.countries.thailand,
      rating: 4.5,
      reviews: 1876,
      duration: "3-5일",
      travelers: "2-4명",
      tags: [t.destinations.tags.food, t.destinations.tags.culture, t.destinations.tags.affordable],
      image: "/placeholder.svg?height=200&width=300",
      description: t.destinations.descriptions.bangkok,
    },
    {
      id: 6,
      name: t.destinations.cities.rome,
      country: t.destinations.countries.italy,
      rating: 4.8,
      reviews: 1654,
      duration: "3-5일",
      travelers: "2-4명",
      tags: [t.destinations.tags.history, t.destinations.tags.art, t.destinations.tags.food],
      image: "/placeholder.svg?height=200&width=300",
      description: t.destinations.descriptions.rome,
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-green-600">
            {t.logo}
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              {t.nav.home}
            </Link>
            <Link href="/destinations" className="text-green-600 font-medium">
              {t.nav.destinations}
            </Link>
            <Link href="/create-itinerary" className="text-muted-foreground hover:text-foreground">
              {t.nav.createItinerary}
            </Link>
            <Link href="/profile" className="text-muted-foreground hover:text-foreground">
              {t.nav.profile}
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">{t.destinations.title}</h1>
          <p className="text-muted-foreground text-lg mb-8">{t.destinations.subtitle}</p>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input placeholder={t.destinations.searchPlaceholder} className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder={t.destinations.regionSelect} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia">{t.destinations.regions.asia}</SelectItem>
                  <SelectItem value="europe">{t.destinations.regions.europe}</SelectItem>
                  <SelectItem value="america">{t.destinations.regions.america}</SelectItem>
                  <SelectItem value="oceania">{t.destinations.regions.oceania}</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder={t.destinations.styleSelect} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="culture">{t.destinations.tags.culture}</SelectItem>
                  <SelectItem value="nature">{t.destinations.tags.nature}</SelectItem>
                  <SelectItem value="food">{t.destinations.tags.food}</SelectItem>
                  <SelectItem value="romantic">{t.destinations.tags.romantic}</SelectItem>
                  <SelectItem value="adventure">{t.destinations.tags.adventure}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="aspect-video bg-gradient-to-r from-blue-400 to-purple-400 relative">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-background text-foreground">{destination.country}</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                    <span className="text-sm text-muted-foreground">({destination.reviews})</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{destination.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{t.destinations.recommendedDuration}: {destination.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{t.destinations.recommendedPeople}: {destination.travelers}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">{t.destinations.createItinerary}</Button>
                  <Button variant="outline" className="flex-1">
                    {t.destinations.viewDetails}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3">
            {t.destinations.loadMore}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function DestinationsPage() {
  return (
    <LanguageWrapper>
      <DestinationsContent />
    </LanguageWrapper>
  )
}
