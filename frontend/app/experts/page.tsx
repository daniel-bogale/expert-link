"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, Clock, Filter, Search } from "lucide-react"
import Link from "next/link"

const experts = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    field: "Business Strategy",
    category: "Business",
    bio: "Former McKinsey consultant with 15+ years helping startups scale",
    hourlyRate: 150,
    rating: 4.9,
    reviewCount: 127,
    languages: ["English", "Spanish"],
    availability: "Available today",
    image: "/placeholder.svg?height=100&width=100",
    verified: true,
    responseTime: "< 1 hour",
  },
  {
    id: 2,
    name: "James Rodriguez",
    field: "Corporate Law",
    category: "Legal",
    bio: "Corporate attorney specializing in startup legal frameworks",
    hourlyRate: 200,
    rating: 4.8,
    reviewCount: 89,
    languages: ["English", "Portuguese"],
    availability: "Available tomorrow",
    image: "/placeholder.svg?height=100&width=100",
    verified: true,
    responseTime: "< 2 hours",
  },
  {
    id: 3,
    name: "Dr. Emily Chen",
    field: "Mental Health",
    category: "Health",
    bio: "Licensed psychologist with expertise in workplace wellness",
    hourlyRate: 120,
    rating: 5.0,
    reviewCount: 203,
    languages: ["English", "Mandarin"],
    availability: "Available now",
    image: "/placeholder.svg?height=100&width=100",
    verified: true,
    responseTime: "< 30 min",
  },
  {
    id: 4,
    name: "Alex Thompson",
    field: "Software Architecture",
    category: "Technology",
    bio: "Senior architect at major tech companies, specializing in scalable systems",
    hourlyRate: 180,
    rating: 4.9,
    reviewCount: 156,
    languages: ["English"],
    availability: "Available today",
    image: "/placeholder.svg?height=100&width=100",
    verified: true,
    responseTime: "< 1 hour",
  },
  {
    id: 5,
    name: "Maria Santos",
    field: "Digital Marketing",
    category: "Marketing",
    bio: "Growth marketing expert who scaled 50+ companies to 7-figures",
    hourlyRate: 140,
    rating: 4.8,
    reviewCount: 94,
    languages: ["English", "Spanish", "French"],
    availability: "Available tomorrow",
    image: "/placeholder.svg?height=100&width=100",
    verified: true,
    responseTime: "< 2 hours",
  },
  {
    id: 6,
    name: "David Kim",
    field: "Investment Strategy",
    category: "Finance",
    bio: "Former Goldman Sachs VP, now helping individuals with investment planning",
    hourlyRate: 220,
    rating: 4.9,
    reviewCount: 78,
    languages: ["English", "Korean"],
    availability: "Available today",
    image: "/placeholder.svg?height=100&width=100",
    verified: true,
    responseTime: "< 1 hour",
  },
]

const categories = ["All", "Business", "Legal", "Health", "Technology", "Marketing", "Finance"]
const sortOptions = ["Rating", "Price: Low to High", "Price: High to Low", "Availability"]

export default function ExpertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [sortBy, setSortBy] = useState("Rating")
  const [showFilters, setShowFilters] = useState(false)

  const filteredExperts = experts.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.bio.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || expert.category === selectedCategory
    const matchesPrice = expert.hourlyRate >= priceRange[0] && expert.hourlyRate <= priceRange[1]

    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-slate-900">ExpertConnect</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-teal-600 hover:bg-teal-700">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search experts by name, field, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          <div className={`grid grid-cols-1 lg:grid-cols-4 gap-4 ${showFilters ? "block" : "hidden lg:grid"}`}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}/hour
              </label>
              <Slider value={priceRange} onValueChange={setPriceRange} max={300} min={0} step={10} className="mt-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Sort by</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="w-full bg-transparent">
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            {filteredExperts.length} Expert{filteredExperts.length !== 1 ? "s" : ""} Found
          </h1>
        </div>

        {/* Expert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert) => (
            <Card key={expert.id} className="hover:shadow-lg transition-shadow bg-white">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={expert.image || "/placeholder.svg"}
                    alt={expert.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{expert.name}</h3>
                      {expert.verified && (
                        <Badge variant="secondary" className="bg-teal-100 text-teal-700 text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-teal-600 font-medium">{expert.field}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{expert.rating}</span>
                      <span className="text-sm text-slate-500">({expert.reviewCount})</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{expert.bio}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Rate:</span>
                    <span className="font-semibold text-slate-900">${expert.hourlyRate}/hour</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Response:</span>
                    <span className="text-slate-700">{expert.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Languages:</span>
                    <span className="text-slate-700">{expert.languages.join(", ")}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span className="text-green-600">{expert.availability}</span>
                  </div>
                </div>

                <Link href={`/experts/${expert.id}`}>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">View Profile & Book</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No experts found</h3>
            <p className="text-slate-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
