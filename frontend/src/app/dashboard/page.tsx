"use client"

import { useAuth } from "../auth_wrapper"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, User, Shield, Calendar, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
    const { user, logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push("/login")
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
                {/* Header */}
                <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <Shield className="w-8 h-8 text-teal-600" />
                                <span className="text-xl font-bold text-gray-900">ExpertConnect Dashboard</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <User className="w-4 h-4" />
                                    <span>{user?.email}</span>
                                </div>
                                <Button
                                    onClick={handleLogout}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center space-x-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome back, {user?.username || user?.email}!
                        </h1>
                        <p className="text-gray-600">
                            This is your protected dashboard. Only authenticated users can see this page.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Connections</CardTitle>
                                <User className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1,234</div>
                                <p className="text-xs text-muted-foreground">
                                    +20.1% from last month
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">573</div>
                                <p className="text-xs text-muted-foreground">
                                    +201 since last hour
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+12.5%</div>
                                <p className="text-xs text-muted-foreground">
                                    +4.3% from last month
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Security Status</CardTitle>
                                <Shield className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">Secure</div>
                                <p className="text-xs text-muted-foreground">
                                    All systems operational
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>
                                    Your latest interactions and connections
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">New connection request</p>
                                            <p className="text-xs text-gray-500">2 minutes ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">Profile updated</p>
                                            <p className="text-xs text-gray-500">1 hour ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">Message sent</p>
                                            <p className="text-xs text-gray-500">3 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>
                                    Common tasks and shortcuts
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Button className="w-full justify-start" variant="outline">
                                        <User className="w-4 h-4 mr-2" />
                                        View Profile
                                    </Button>
                                    <Button className="w-full justify-start" variant="outline">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Schedule Meeting
                                    </Button>
                                    <Button className="w-full justify-start" variant="outline">
                                        <TrendingUp className="w-4 h-4 mr-2" />
                                        View Analytics
                                    </Button>
                                    <Button className="w-full justify-start" variant="outline">
                                        <Shield className="w-4 h-4 mr-2" />
                                        Security Settings
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Authentication Info */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Authentication Status</CardTitle>
                            <CardDescription>
                                Your current authentication information
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">Status:</span>
                                    <span className="text-sm text-green-600 font-medium">Authenticated</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">Email:</span>
                                    <span className="text-sm text-gray-600">{user?.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">Username:</span>
                                    <span className="text-sm text-gray-600">{user?.username || "Not set"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">User ID:</span>
                                    <span className="text-sm text-gray-600">{user?.id || "Not available"}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ProtectedRoute>
    )
} 