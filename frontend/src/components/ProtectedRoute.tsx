"use client"

import { useAuth } from "@/app/auth_wrapper"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import LoadingSpinner from "./LoadingSpinner"

interface ProtectedRouteProps {
    children: React.ReactNode
    fallback?: React.ReactNode
    redirectTo?: string
}

export default function ProtectedRoute({
    children,
    fallback,
    redirectTo = "/login"
}: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            // Store current path for redirect after login
            const currentPath = window.location.pathname + window.location.search
            if (currentPath !== redirectTo) {
                document.cookie = `redirectTo=${currentPath}; path=/; max-age=300; secure=${window.location.protocol === 'https:'}; samesite=lax`
            }
            router.push(redirectTo)
        }
    }, [isAuthenticated, isLoading, router, redirectTo])

    // Show loading while checking authentication
    if (isLoading) {
        return (
            fallback || (
                <div className="min-h-screen flex items-center justify-center">
                    <LoadingSpinner size="lg" text="Checking authentication..." />
                </div>
            )
        )
    }

    // Don't render anything if not authenticated (will redirect)
    if (!isAuthenticated) {
        return null
    }

    // Render children if authenticated
    return <>{children}</>
} 