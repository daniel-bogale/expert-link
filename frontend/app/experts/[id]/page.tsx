"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Clock, Shield, Award, MessageCircle, Video, ChevronLeft } from "lucide-react"
import Link from "next/link"

// Mock data for expert profile
const expert = {
  id: 1,
  name: "Dr. Sarah Mitchell",
  field: "Business Strategy",
  category: "Business",
  bio: "Former McKinsey consultant with 15+ years helping startups scale. I specialize in go-to-market strategies, product-market fit, and scaling operations. I've worked with over 200 companies ranging from early-stage startups to Fortune 500 enterprises.",
  hourlyRate: 150,
  rating: 4.9,
  reviewCount: 127,
  languages: ["English", "Spanish"],
  availability: "Available today",
  image: "/placeholder.svg?height=200&width=200",
  verified: true,
  responseTime: "< 1 hour",
  totalSessions: 450,
  yearsExperience: 15,
  certifications: ["MBA from Harvard Business School", "Certified Management Consultant", "Lean Six Sigma Black Belt"],
  expertise: [
    "Go-to-Market Strategy",
    "Product-Market Fit",
    "Scaling Operations",
    "Fundraising Strategy",
    "Team Building",
    "Market Analysis",
  ],
}

const reviews = [
  {
    id: 1,
    user: "Michael Chen",
    rating: 5,
    date: "2 days ago",
    comment:
      "Sarah provided incredible insights into our go-to-market strategy. Her experience really shows and she gave actionable advice that we implemented immediately.",
  },
  {
    id: 2,
    user: "Emily Rodriguez",
    rating: 5,
    date: "1 week ago",
    comment:
      "Excellent session! Sarah helped me understand the fundraising landscape and gave me a clear roadmap for our Series A. Highly recommend!",
  },
  {
    id: 3,
    user: "David Park",
    rating: 4,
    date: "2 weeks ago",
    comment:
      "Very knowledgeable and professional. Sarah's advice on scaling our operations was spot on. Will definitely book another session.",
  },
]

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"]

export default function ExpertProfile() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [sessionType, setSessionType] = useState("video")

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/experts" className="flex items-center space-x-2 text-slate-600 hover:text-slate-900">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Experts</span>
          </Link>
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-slate-900">ExpertConnect</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                  <img
                    src={expert.image || "/placeholder.svg"}
                    alt={expert.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-3 mb-2">
                      <h1 className="text-3xl font-bold text-slate-900">{expert.name}</h1>
                      <div className="flex items-center justify-center md:justify-start space-x-2 mt-2 md:mt-0">
                        {expert.verified && (
                          <Badge className="bg-teal-100 text-teal-700">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified Expert
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-xl text-teal-600 font-medium mb-2">{expert.field}</p>
                    <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{expert.rating}</span>
                        <span className="text-slate-500">({expert.reviewCount} reviews)</span>
                      </div>
                      <div className="text-slate-500">•</div>
                      <div className="text-slate-600">{expert.totalSessions} sessions</div>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                      {expert.languages.map((language, index) => (
                        <Badge key={index} variant="outline">
                          {language}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-slate-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Responds in {expert.responseTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="h-4 w-4" />
                        <span>{expert.yearsExperience} years experience</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Content */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="expertise">Expertise</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>About Dr. Sarah Mitchell</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">{expert.bio}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Certifications & Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {expert.certifications.map((cert, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-teal-600" />
                          <span className="text-slate-700">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-semibold text-slate-900">{review.user}</div>
                          <div className="text-sm text-slate-500">{review.date}</div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="expertise" className="space-y-4">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Areas of Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {expert.expertise.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                          <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                          <span className="text-slate-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Book a Session</span>
                  <span className="text-2xl font-bold text-teal-600">${expert.hourlyRate}/hr</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Session Type</label>
                  <Select value={sessionType} onValueChange={setSessionType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">
                        <div className="flex items-center space-x-2">
                          <Video className="h-4 w-4" />
                          <span>Video Call</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="chat">
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="h-4 w-4" />
                          <span>Chat Session</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>

                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Available Times</label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className={selectedTime === time ? "bg-teal-600 hover:bg-teal-700" : ""}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-600">Session (1 hour)</span>
                      <span className="font-semibold">${expert.hourlyRate}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-600">Platform fee</span>
                      <span className="font-semibold">$15</span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>${expert.hourlyRate + 15}</span>
                    </div>
                  </div>
                )}

                <Link
                  href={`/booking/${expert.id}?date=${selectedDate?.toISOString()}&time=${selectedTime}&type=${sessionType}`}
                >
                  <Button className="w-full bg-teal-600 hover:bg-teal-700" disabled={!selectedDate || !selectedTime}>
                    Book Session
                  </Button>
                </Link>

                <Button variant="outline" className="w-full bg-transparent">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Response Rate</span>
                  <span className="font-semibold">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">On-time Rate</span>
                  <span className="font-semibold">99%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Repeat Clients</span>
                  <span className="font-semibold">75%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
