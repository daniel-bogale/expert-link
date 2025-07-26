"use client"

import { useAuth } from "../auth_wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, User, Lock, Unlock } from "lucide-react"

export default function RouteTestPage() {
    const { isAuthenticated, user } = useAuth()

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Route Access Test
                    </h1>
                    <p className="text-gray-600">
                        Test different routes and their access patterns
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Current Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Shield className="w-5 h-5" />
                                <span>Current Status</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    {isAuthenticated ? (
                                        <User className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <User className="w-5 h-5 text-gray-400" />
                                    )}
                                    <span>Authentication: {isAuthenticated ? "Yes" : "No"}</span>
                                </div>

                                {user && (
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm"><strong>User:</strong> {user.email}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Route Tests */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Route Access Tests</CardTitle>
                            <CardDescription>
                                Test different route types
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Public Route:</span>
                                    <Link href="/">
                                        <Button size="sm" variant="outline">Home</Button>
                                    </Link>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Auth Route:</span>
                                    <Link href="/register">
                                        <Button size="sm" variant="outline">Register</Button>
                                    </Link>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Protected Route:</span>
                                    <Link href="/dashboard">
                                        <Button size="sm" variant="outline">Dashboard</Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Expected Behavior */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Expected Behavior</CardTitle>
                            <CardDescription>
                                What should happen when you click each route
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                                    <h4 className="font-medium text-green-800 mb-2 flex items-center">
                                        <Unlock className="w-4 h-4 mr-2" />
                                        Public Routes
                                    </h4>
                                    <p className="text-sm text-green-700">
                                        Always accessible: Home, About, Contact, etc.
                                    </p>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                                    <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
                                        <User className="w-4 h-4 mr-2" />
                                        Auth Routes
                                    </h4>
                                    <p className="text-sm text-yellow-700">
                                        Accessible to unauthenticated users. Authenticated users redirected to dashboard.
                                    </p>
                                </div>

                                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                                    <h4 className="font-medium text-red-800 mb-2 flex items-center">
                                        <Lock className="w-4 h-4 mr-2" />
                                        Protected Routes
                                    </h4>
                                    <p className="text-sm text-red-700">
                                        Require authentication. Unauthenticated users redirected to login.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 