"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Star, ChevronLeft, ChevronRight } from "lucide-react"

const experts = [
    {
        id: 1,
        name: "Dr. Amelia Chen",
        specialty: "Business Strategy",
        description:
            "Experienced in digital transformation and business strategy. Dr. Chen has helped numerous companies optimize their operations and achieve sustainable growth.",
        image: "/placeholder.svg?height=120&width=120",
        rating: 4.9,
        reviews: 127,
        price: "$150/hour",
    },
    {
        id: 2,
        name: "Mr. Ethan Carter",
        specialty: "Cybersecurity",
        description:
            "Mr. Carter specializes in cybersecurity and data protection, providing robust solutions to safeguard businesses against cyber threats and ensure data privacy.",
        image: "/placeholder.svg?height=120&width=120",
        rating: 4.8,
        reviews: 89,
        price: "$120/hour",
    },
    {
        id: 3,
        name: "Ms. Olivia Bennett",
        specialty: "Marketing & Branding",
        description:
            "Expert in marketing and branding, crafting compelling brand narratives and implementing effective marketing strategies to enhance brand visibility and customer engagement.",
        image: "/placeholder.svg?height=120&width=120",
        rating: 4.9,
        reviews: 156,
        price: "$100/hour",
    },
    {
        id: 4,
        name: "Mr. Noah Davis",
        specialty: "Financial Planning",
        description:
            "Mr. Davis is a seasoned consultant in financial planning and investment management, helping clients achieve financial guidance to help clients achieve their financial goals.",
        image: "/placeholder.svg?height=120&width=120",
        rating: 4.7,
        reviews: 203,
        price: "$180/hour",
    },
    {
        id: 5,
        name: "Ms. Sophia Evans",
        specialty: "Human Resources",
        description:
            "Ms. Evans is a specialist in human resources and talent management, focusing on optimizing organizational structure, enhancing employee engagement, and developing effective HR strategies.",
        image: "/placeholder.svg?height=120&width=120",
        rating: 4.8,
        reviews: 94,
        price: "$110/hour",
    },
]

export default function ExpertsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedPrice, setSelectedPrice] = useState("")
    const [selectedRating, setSelectedRating] = useState("")

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-8">
                            <Link href="/" className="text-xl font-bold text-gray-900">
                                ExpertConnect
                            </Link>
                            <nav className="hidden md:flex space-x-6">
                                <Link href="/" className="text-gray-600 hover:text-gray-900">
                                    Home
                                </Link>
                                <Link href="/experts" className="text-teal-600 font-medium">
                                    Experts
                                </Link>
                                <Link href="/services" className="text-gray-600 hover:text-gray-900">
                                    Services
                                </Link>
                                <Link href="/resources" className="text-gray-600 hover:text-gray-900">
                                    Resources
                                </Link>
                            </nav>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    type="text"
                                    placeholder="Search"
                                    className="pl-10 w-64"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button className="bg-teal-600 hover:bg-teal-700">Book a call</Button>
                            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Find the right expert for you</h1>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="business">Business Strategy</SelectItem>
                            <SelectItem value="tech">Technology</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="hr">Human Resources</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Price" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0-100">$0-100</SelectItem>
                            <SelectItem value="100-150">$100-150</SelectItem>
                            <SelectItem value="150-200">$150-200</SelectItem>
                            <SelectItem value="200+">$200+</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={selectedRating} onValueChange={setSelectedRating}>
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Rating" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                            <SelectItem value="4.0+">4.0+ Stars</SelectItem>
                            <SelectItem value="3.5+">3.5+ Stars</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Availability" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="today">Available Today</SelectItem>
                            <SelectItem value="week">This Week</SelectItem>
                            <SelectItem value="month">This Month</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Experts List */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Experts</h2>

                    {experts.map((expert) => (
                        <Card key={expert.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-6">
                                    <Image
                                        src={expert.image || "/placeholder.svg"}
                                        alt={expert.name}
                                        width={120}
                                        height={120}
                                        className="rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <Badge variant="secondary" className="mb-2 bg-teal-100 text-teal-800">
                                                    {expert.specialty}
                                                </Badge>
                                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                    <Link href={`/experts/${expert.id}`} className="hover:text-teal-600">
                                                        {expert.name}
                                                    </Link>
                                                </h3>
                                                <p className="text-gray-600 mb-4 leading-relaxed">{expert.description}</p>
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <div className="flex items-center">
                                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                                        <span className="font-medium">{expert.rating}</span>
                                                        <span className="ml-1">({expert.reviews} reviews)</span>
                                                    </div>
                                                    <span>{expert.price}</span>
                                                </div>
                                            </div>
                                            <Button className="bg-teal-600 hover:bg-teal-700">Book</Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center space-x-2 mt-12">
                    <Button variant="outline" size="sm">
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-teal-600 text-white">
                        1
                    </Button>
                    <Button variant="outline" size="sm">
                        2
                    </Button>
                    <Button variant="outline" size="sm">
                        3
                    </Button>
                    <Button variant="outline" size="sm">
                        4
                    </Button>
                    <Button variant="outline" size="sm">
                        5
                    </Button>
                    <Button variant="outline" size="sm">
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
