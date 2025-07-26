"use client"

import { useAuth } from "../auth_wrapper"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, CheckCircle, XCircle } from "lucide-react"

export default function TestProtectionPage() {
    const { isAuthenticated, user } = useAuth()

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Middleware Protection Test
                        </h1>
                        <p className="text-gray-600">
                            This page tests the authentication middleware and route protection
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Authentication Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Shield className="w-5 h-5" />
                                    <span>Authentication Status</span>
                                </CardTitle>
                                <CardDescription>
                                    Current authentication state
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        {isAuthenticated ? (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-500" />
                                        )}
                                        <span className="font-medium">
                                            Status: {isAuthenticated ? "Authenticated" : "Not Authenticated"}
                                        </span>
                                    </div>

                                    {user && (
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="font-medium mb-2">User Information:</h4>
                                            <div className="space-y-1 text-sm">
                                                <div><strong>Email:</strong> {user.email}</div>
                                                <div><strong>Username:</strong> {user.username || "Not set"}</div>
                                                <div><strong>ID:</strong> {user.id || "Not available"}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Route Protection Test */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Shield className="w-5 h-5" />
                                    <span>Route Protection</span>
                                </CardTitle>
                                <CardDescription>
                                    Test different route access scenarios
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                                        <h4 className="font-medium text-green-800 mb-2">✅ Protected Route Access</h4>
                                        <p className="text-sm text-green-700">
                                            You can access this page because you are authenticated.
                                        </p>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                                        <h4 className="font-medium text-blue-800 mb-2">ℹ️ Middleware Behavior</h4>
                                        <p className="text-sm text-blue-700">
                                            The middleware checked your authentication status and allowed access to this protected route.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Test Instructions */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>How to Test the Middleware</CardTitle>
                                <CardDescription>
                                    Follow these steps to verify the authentication system
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                                            <h4 className="font-medium text-yellow-800 mb-2">Test 1: Unauthenticated Access</h4>
                                            <ol className="text-sm text-yellow-700 space-y-1">
                                                <li>1. Logout from the application</li>
                                                <li>2. Try to access this page directly</li>
                                                <li>3. You should be redirected to /login</li>
                                            </ol>
                                        </div>

                                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                                            <h4 className="font-medium text-green-800 mb-2">Test 2: Authenticated Access</h4>
                                            <ol className="text-sm text-green-700 space-y-1">
                                                <li>1. Login to the application</li>
                                                <li>2. Access this page</li>
                                                <li>3. You should see this content</li>
                                            </ol>
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                                        <h4 className="font-medium text-purple-800 mb-2">Test 3: Auth Route Protection</h4>
                                        <ol className="text-sm text-purple-700 space-y-1">
                                            <li>1. While authenticated, try to access /login</li>
                                            <li>2. You should be redirected to /dashboard</li>
                                            <li>3. Same applies to /register</li>
                                        </ol>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
} 