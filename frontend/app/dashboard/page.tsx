"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MessageCircle, Video, Star, Bell, Settings, Plus, Search } from "lucide-react"
import Link from "next/link"

const upcomingSessions = [
  {
    id: 1,
    expert: "Dr. Sarah Mitchell",
    field: "Business Strategy",
    date: "Today",
    time: "2:00 PM",
    duration: "1 hour",
    type: "video",
    status: "confirmed",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    expert: "James Rodriguez",
    field: "Corporate Law",
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "1 hour",
    type: "video",
    status: "confirmed",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    expert: "Dr. Emily Chen",
    field: "Mental Health",
    date: "Dec 28",
    time: "3:00 PM",
    duration: "45 min",
    type: "chat",
    status: "pending",
    image: "/placeholder.svg?height=40&width=40",
  },
]

const pastSessions = [
  {
    id: 4,
    expert: "Alex Thompson",
    field: "Software Architecture",
    date: "Dec 20, 2024",
    time: "11:00 AM",
    duration: "1 hour",
    type: "video",
    rating: 5,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    expert: "Maria Santos",
    field: "Digital Marketing",
    date: "Dec 18, 2024",
    time: "4:00 PM",
    duration: "1 hour",
    type: "video",
    rating: 4,
    image: "/placeholder.svg?height=40&width=40",
  },
]

const notifications = [
  {
    id: 1,
    type: "session_reminder",
    message: "Session with Dr. Sarah Mitchell starts in 2 hours",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "message",
    message: "New message from James Rodriguez",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    type: "booking_confirmed",
    message: "Your session with Dr. Emily Chen has been confirmed",
    time: "2 days ago",
    read: true,
  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming")

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
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, John!</h1>
          <p className="text-slate-600">Manage your expert consultations and upcoming sessions</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Sessions</p>
                  <p className="text-2xl font-bold text-slate-900">12</p>
                </div>
                <Calendar className="h-8 w-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">This Month</p>
                  <p className="text-2xl font-bold text-slate-900">3</p>
                </div>
                <Clock className="h-8 w-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-slate-900">4.8</p>
                </div>
                <Star className="h-8 w-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Unread Messages</p>
                  <p className="text-2xl font-bold text-slate-900">2</p>
                </div>
                <MessageCircle className="h-8 w-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/experts">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Book New Session
                    </Button>
                  </Link>
                  <Link href="/messages">
                    <Button variant="outline" className="w-full bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      View Messages
                    </Button>
                  </Link>
                  <Link href="/experts">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Search className="h-4 w-4 mr-2" />
                      Browse Experts
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Sessions */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Your Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past Sessions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="space-y-4 mt-6">
                    {upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center space-x-4 p-4 border border-slate-200 rounded-lg"
                      >
                        <Avatar>
                          <AvatarImage src={session.image || "/placeholder.svg"} />
                          <AvatarFallback>
                            {session.expert
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{session.expert}</h3>
                          <p className="text-sm text-slate-600">{session.field}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500">
                            <span>
                              {session.date} at {session.time}
                            </span>
                            <span>•</span>
                            <span>{session.duration}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              {session.type === "video" ? (
                                <Video className="h-3 w-3" />
                              ) : (
                                <MessageCircle className="h-3 w-3" />
                              )}
                              <span className="capitalize">{session.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={session.status === "confirmed" ? "default" : "secondary"}
                            className={session.status === "confirmed" ? "bg-green-100 text-green-700" : ""}
                          >
                            {session.status}
                          </Badge>
                          {session.status === "confirmed" && session.date === "Today" && (
                            <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                              Join Session
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="past" className="space-y-4 mt-6">
                    {pastSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center space-x-4 p-4 border border-slate-200 rounded-lg"
                      >
                        <Avatar>
                          <AvatarImage src={session.image || "/placeholder.svg"} />
                          <AvatarFallback>
                            {session.expert
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{session.expert}</h3>
                          <p className="text-sm text-slate-600">{session.field}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500">
                            <span>
                              {session.date} at {session.time}
                            </span>
                            <span>•</span>
                            <span>{session.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(session.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <Button variant="outline" size="sm">
                            Book Again
                          </Button>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Notifications</span>
                  <Badge variant="secondary">{notifications.filter((n) => !n.read).length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg ${notification.read ? "bg-slate-50" : "bg-teal-50"}`}
                  >
                    <p className="text-sm text-slate-900">{notification.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent" size="sm">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Recommended Experts */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>DK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">David Kim</h4>
                    <p className="text-xs text-slate-600">Investment Strategy</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">4.9 (78)</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>

                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>LW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">Lisa Wang</h4>
                    <p className="text-xs text-slate-600">IP Law</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">4.8 (92)</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="text-slate-900">Completed session with Alex Thompson</p>
                  <p className="text-xs text-slate-500">2 days ago</p>
                </div>
                <div className="text-sm">
                  <p className="text-slate-900">Rated session with Maria Santos</p>
                  <p className="text-xs text-slate-500">4 days ago</p>
                </div>
                <div className="text-sm">
                  <p className="text-slate-900">Booked session with Dr. Emily Chen</p>
                  <p className="text-xs text-slate-500">1 week ago</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
