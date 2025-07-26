import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/auth_wrapper"

interface UseAuthRedirectOptions {
  redirectTo?: string
  requireAuth?: boolean
  redirectIfAuthenticated?: boolean
}

export function useAuthRedirect({
  redirectTo = "/login",
  requireAuth = true,
  redirectIfAuthenticated = false
}: UseAuthRedirectOptions = {}) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo)
    }

    if (redirectIfAuthenticated && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router, redirectTo, requireAuth, redirectIfAuthenticated])

  return { isAuthenticated, isLoading }
} 