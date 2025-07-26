"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Search, Star, Award, BookOpen, Users, ThumbsUp, MessageSquare } from "lucide-react"

const expertData = {
    name: "Dr. Amelia Harper",
    title: "Senior Consultant at Innovate Solutions",
    specialty: "Expert in Digital Transformation",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.8,
    totalReviews: 125,
    about:
        "Dr. Harper is a seasoned digital transformation consultant with over 15 years of experience. She specializes in helping businesses leverage technology to drive growth and efficiency. Her expertise spans across various industries, including finance, healthcare, and retail. Dr. Harper holds a PhD in Information Systems and is a certified Project Management Professional (PMP).",
    certifications: [
        {
            name: "Certified Project Management Professional (PMP)",
            icon: Award,
        },
        {
            name: "PhD in Information Systems",
            icon: BookOpen,
        },
        {
            name: "Certified Digital Transformation Specialist",
            icon: Users,
        },
    ],
    reviews: [
        {
            id: 1,
            name: "Ethan Carter",
            timeAgo: "2 months ago",
            rating: 5,
            comment:
                "Dr. Harper provided invaluable insights into our digital transformation strategy. Her expertise and guidance were instrumental in aligning our technology initiatives with our business goals. Highly recommend!",
            likes: 15,
            replies: 4,
        },
        {
            id: 2,
            name: "Sophia Bennett",
            timeAgo: "3 months ago",
            rating: 4,
            comment:
                "Dr. Harper is knowledgeable and professional. She helped us identify key areas for improvement in our digital processes. While the session was insightful, I felt it could have been more tailored to our specific industry challenges.",
            likes: 8,
            replies: 1,
        },
    ],
    ratingBreakdown: {
        5: 70,
        4: 20,
        3: 5,
        2: 3,
        1: 2,
    },
}

export default function ExpertProfilePage() {
    const [searchQuery, setSearchQuery] = useState("")

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
                            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Expert Header */}
                <Card className="mb-8">
                    <CardContent className="p-8">
                        <div className="flex items-start space-x-6">
                            <Image
                                src={expertData.image || "/placeholder.svg"}
                                alt={expertData.name}
                                width={120}
                                height={120}
                                className="rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{expertData.name}</h1>
                                <p className="text-lg text-gray-600 mb-1">{expertData.title}</p>
                                <p className="text-teal-600 font-medium mb-4">{expertData.specialty}</p>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                                        <span className="font-semibold text-lg">{expertData.rating}</span>
                                        <span className="text-gray-500 ml-1">({expertData.totalReviews} reviews)</span>
                                    </div>
                                </div>
                            </div>
                            <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                                Book Session
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="about" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="about">About</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        <TabsTrigger value="availability">Availability</TabsTrigger>
                    </TabsList>

                    <TabsContent value="about" className="space-y-6">
                        {/* About Section */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                                <p className="text-gray-700 leading-relaxed">{expertData.about}</p>
                            </CardContent>
                        </Card>

                        {/* Certifications */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Certifications</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {expertData.certifications.map((cert, index) => (
                                        <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                                                <cert.icon className="w-5 h-5 text-teal-600" />
                                            </div>
                                            <span className="font-medium text-gray-900">{cert.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reviews" className="space-y-6">
                        {/* Reviews Overview */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Rating Summary */}
                                    <div>
                                        <div className="text-center mb-6">
                                            <div className="text-5xl font-bold text-gray-900 mb-2">{expertData.rating}</div>
                                            <div className="flex justify-center mb-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-5 h-5 ${star <= Math.floor(expertData.rating)
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : "text-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-gray-600">{expertData.totalReviews} reviews</p>
                                        </div>
                                    </div>

                                    {/* Rating Breakdown */}
                                    <div className="space-y-3">
                                        {[5, 4, 3, 2, 1].map((rating) => (
                                            <div key={rating} className="flex items-center space-x-3">
                                                <span className="text-sm font-medium w-2">{rating}</span>
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <Progress
                                                    value={expertData.ratingBreakdown[rating as keyof typeof expertData.ratingBreakdown]}
                                                    className="flex-1 h-2"
                                                />
                                                <span className="text-sm text-gray-500 w-8">
                                                    {expertData.ratingBreakdown[rating as keyof typeof expertData.ratingBreakdown]}%
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Individual Reviews */}
                        <div className="space-y-4">
                            {expertData.reviews.map((review) => (
                                <Card key={review.id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                                    <span className="text-gray-500 text-sm">{review.timeAgo}</span>
                                                </div>
                                                <div className="flex items-center mb-3">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`w-4 h-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-gray-700 mb-4">{review.comment}</p>
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <button className="flex items-center space-x-1 hover:text-gray-700">
                                                        <ThumbsUp className="w-4 h-4" />
                                                        <span>{review.likes}</span>
                                                    </button>
                                                    <button className="flex items-center space-x-1 hover:text-gray-700">
                                                        <MessageSquare className="w-4 h-4" />
                                                        <span>{review.replies}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="availability">
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Availability</h2>
                                <p className="text-gray-600">Calendar integration coming soon...</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
