import { buildApiUrl } from "@/config/env"

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    ...(token && token !== "undefined" && token !== "null" && { Authorization: `Bearer ${token}` }),
  }
}

export const authenticatedFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const url = buildApiUrl(endpoint)
  const headers = getAuthHeaders()

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  })

  if (response.status === 401) {
    // Token is invalid, clear auth and redirect to login
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/login"
    throw new Error("Authentication failed")
  }

  return response
}

export const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token")
  return !!(token && token !== "undefined" && token !== "null")
}

export const getStoredUser = () => {
  const userStr = localStorage.getItem("user")
  if (userStr && userStr !== "undefined" && userStr !== "null") {
    try {
      const parsedUser = JSON.parse(userStr)
      if (parsedUser && typeof parsedUser === "object") {
        return parsedUser
      }
    } catch {
      // Clear invalid data
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    }
  }
  return null
}

// Get redirect URL from cookies
export const getRedirectUrl = (): string | null => {
  const cookies = document.cookie.split(';')
  const redirectCookie = cookies.find(cookie => cookie.trim().startsWith('redirectTo='))
  if (redirectCookie) {
    return redirectCookie.split('=')[1]
  }
  return null
}

// Clear redirect cookie
export const clearRedirectCookie = () => {
  document.cookie = "redirectTo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}

// Set token in cookie for middleware access
export const setTokenCookie = (token: string) => {
  document.cookie = `token=${token}; path=/; max-age=86400; secure=${window.location.protocol === 'https:'}; samesite=lax`
}

// Remove token from cookie
export const removeTokenCookie = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}

// Clear all authentication data
export const clearAuthData = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  removeTokenCookie()
  clearRedirectCookie()
} 