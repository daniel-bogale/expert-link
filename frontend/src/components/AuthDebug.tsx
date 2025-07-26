"use client"

import { useAuth } from "@/app/auth_wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, RefreshCw, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function AuthDebug() {
    const { user, isAuthenticated, isLoading, clearAuthData } = useAuth()
    const [showDebug, setShowDebug] = useState(false)

    const clearLocalStorage = () => {
        localStorage.clear()
        clearAuthData()
        window.location.reload()
    }

    const checkLocalStorage = () => {
        const token = localStorage.getItem("token")
        const userData = localStorage.getItem("user")

        console.log("=== LocalStorage Debug ===")
        console.log("Token:", token)
        console.log("User:", userData)
        console.log("Token type:", typeof token)
        console.log("User type:", typeof userData)

        if (userData) {
            try {
                const parsed = JSON.parse(userData)
                console.log("Parsed user:", parsed)
            } catch (e) {
                console.error("Failed to parse user data:", e)
            }
        }
    }

    if (!showDebug) {
        return (
            <div className="fixed bottom-4 right-4 z-50">
                <Button
                    onClick={() => setShowDebug(true)}
                    size="sm"
                    variant="outline"
                    className="bg-white/90 backdrop-blur-sm"
                >
                    <Eye className="w-4 h-4 mr-2" />
                    Debug Auth
                </Button>
            </div>
        )
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 w-80">
            <Card className="bg-white/95 backdrop-blur-sm border-2">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Auth Debug</CardTitle>
                        <Button
                            onClick={() => setShowDebug(false)}
                            size="sm"
                            variant="ghost"
                        >
                            <EyeOff className="w-4 h-4" />
                        </Button>
                    </div>
                    <CardDescription className="text-xs">
                        Debug authentication state and localStorage
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                            <span>Loading:</span>
                            <span className={isLoading ? "text-yellow-600" : "text-green-600"}>
                                {isLoading ? "Yes" : "No"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Authenticated:</span>
                            <span className={isAuthenticated ? "text-green-600" : "text-red-600"}>
                                {isAuthenticated ? "Yes" : "No"}
                            </span>
                        </div>
                        {user && (
                            <div className="flex justify-between">
                                <span>User:</span>
                                <span className="text-blue-600 truncate ml-2">
                                    {user.email}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex space-x-2">
                        <Button
                            onClick={checkLocalStorage}
                            size="sm"
                            variant="outline"
                            className="flex-1"
                        >
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Check Storage
                        </Button>
                        <Button
                            onClick={clearLocalStorage}
                            size="sm"
                            variant="destructive"
                            className="flex-1"
                        >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Clear All
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 