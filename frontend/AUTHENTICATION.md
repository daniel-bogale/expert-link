# Authentication System

This document describes the comprehensive authentication system implemented in the ExpertConnect frontend application.

## Overview

The authentication system provides:
- **State management** for user authentication
- **Dual route protection** (client-side and server-side middleware)
- **Token-based authentication** with secure storage
- **Automatic redirects** for authenticated/unauthenticated users
- **Comprehensive route configuration** for easy maintenance
- **Smart redirect handling** after login
- **Public access** to home page and authentication pages

## Route Access Rules

### ✅ **Always Accessible (No Authentication Required)**
- **Home Page** (`/`) - Landing page accessible to everyone
- **Login Page** (`/login`) - Accessible to unauthenticated users
- **Register Page** (`/register`) - Accessible to unauthenticated users
- **Public Pages** (`/about`, `/contact`, `/pricing`, etc.) - Marketing pages

### 🔄 **Conditional Access**
- **Auth Pages** - Redirect authenticated users to dashboard
- **Protected Pages** - Require authentication, redirect to login if not authenticated

### 🔒 **Protected Routes (Authentication Required)**
- `/dashboard` - User dashboard
- `/profile` - User profile
- `/settings` - User settings
- `/experts` - Expert search
- `/bookings` - User bookings
- `/messages` - User messages
- `/payments` - Payment management

## Components

### 1. AuthProvider (`src/app/auth_wrapper.tsx`)

The main authentication context provider that manages:
- User state and authentication status
- Loading states during auth checks
- Login/logout functions with cookie management
- Automatic redirect handling after login
- Token storage in both localStorage and cookies

**Usage:**
```tsx
import { useAuth } from "@/app/auth_wrapper"

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  // ...
}
```

### 2. ProtectedRoute (`src/components/ProtectedRoute.tsx`)

A client-side route protection component that:
- Checks authentication status with loading states
- Redirects unauthenticated users to login
- Stores intended destination for post-login redirect
- Only renders children if authenticated

**Usage:**
```tsx
import ProtectedRoute from "@/components/ProtectedRoute"

function ProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content is only visible to authenticated users</div>
    </ProtectedRoute>
  )
}
```

### 3. LoadingSpinner (`src/components/LoadingSpinner.tsx`)

A reusable loading component with different sizes and optional text.

**Usage:**
```tsx
import LoadingSpinner from "@/components/LoadingSpinner"

<LoadingSpinner size="lg" text="Loading..." />
```

### 4. Providers (`src/components/Providers.tsx`)

Client-side wrapper for all providers to avoid server component issues.

## Hooks

### useAuthRedirect (`src/hooks/useAuthRedirect.ts`)

A custom hook for handling authentication redirects:

**Options:**
- `redirectTo`: Where to redirect unauthenticated users (default: "/login")
- `requireAuth`: Whether authentication is required (default: true)
- `redirectIfAuthenticated`: Redirect authenticated users (default: false)

**Usage:**
```tsx
import { useAuthRedirect } from "@/hooks/useAuthRedirect"

// Redirect unauthenticated users to login
useAuthRedirect()

// Redirect authenticated users to dashboard
useAuthRedirect({ redirectIfAuthenticated: true })

// Custom redirect path
useAuthRedirect({ redirectTo: "/custom-login" })
```

## Utilities

### Auth Utils (`src/lib/auth-utils.ts`)

Comprehensive utility functions for authentication:

- `getAuthHeaders()`: Get headers with authentication token
- `authenticatedFetch()`: Fetch wrapper with automatic token handling
- `isTokenValid()`: Check if token exists
- `getStoredUser()`: Get user from localStorage
- `getRedirectUrl()`: Get redirect URL from cookies
- `clearRedirectCookie()`: Clear redirect cookie
- `setTokenCookie()`: Set token in cookie for middleware access
- `removeTokenCookie()`: Remove token from cookie

**Usage:**
```tsx
import { authenticatedFetch, getAuthHeaders } from "@/lib/auth-utils"

// Make authenticated API call
const response = await authenticatedFetch("/api/protected-endpoint")

// Get headers for custom requests
const headers = getAuthHeaders()
```

## Route Configuration

### Routes Config (`src/config/routes.ts`)

Centralized route configuration for consistent middleware behavior:

- **Public Routes**: Accessible to everyone (home, about, contact, etc.)
- **Auth Routes**: Login/register pages (accessible to unauthenticated users)
- **Protected Routes**: Require authentication (dashboard, profile, etc.)
- **API Routes**: Handled separately by middleware

**Helper Functions:**
- `isProtectedRoute(pathname)`: Check if route requires auth
- `isAuthRoute(pathname)`: Check if route is auth-related
- `isPublicRoute(pathname)`: Check if route is public
- `shouldSkipMiddleware(pathname)`: Check if middleware should skip

## Middleware

### Enhanced Middleware (`middleware.ts`)

The Next.js middleware provides comprehensive server-side route protection:

**Features:**
- **Smart route categorization** using route configuration
- **Multiple token sources** (cookies, headers)
- **Redirect preservation** - stores intended destination
- **Static file handling** - skips middleware for assets
- **Comprehensive matcher** - handles all routes efficiently
- **Public access** - home page and auth pages accessible to everyone

**Route Protection Logic:**
1. **Public Routes** (`/`, `/about`, etc.): Allow access to everyone
2. **Auth Routes** (`/login`, `/register`): Allow unauthenticated access, redirect authenticated users
3. **Protected Routes** (`/dashboard`, `/profile`, etc.): Require authentication
4. **Static/API Routes**: Skip middleware processing

## Protected Routes

### Server-Side Protection (Middleware)
- `/dashboard/*` - Protected by middleware
- `/profile/*` - Protected by middleware
- `/settings/*` - Protected by middleware
- `/experts/*` - Protected by middleware
- `/bookings/*` - Protected by middleware
- `/messages/*` - Protected by middleware
- `/payments/*` - Protected by middleware
- `/test-protection` - Test page for middleware verification

### Client-Side Protection
- All protected routes also use `ProtectedRoute` component
- Automatic redirect handling with loading states

## Authentication Flow

### 1. Public Access
1. **Home Page** (`/`) - Always accessible
2. **Login Page** (`/login`) - Accessible to unauthenticated users
3. **Register Page** (`/register`) - Accessible to unauthenticated users
4. **Public Pages** - Marketing and informational pages

### 2. Login Process
1. User submits credentials
2. Backend validates and returns user + token
3. Frontend stores token in localStorage and cookie
4. Redirect URL is retrieved from cookie (if any)
5. User is redirected to intended destination or dashboard

### 3. Route Protection
1. **Server-side**: Middleware checks token in cookies/headers
2. **Client-side**: Components check authentication state
3. **Unauthenticated access**: Redirect to login with destination stored
4. **Authenticated access**: Allow access or redirect to dashboard

### 4. Logout Process
1. Token and user data cleared from localStorage
2. Token removed from cookies
3. User redirected to home page
4. All protected routes become inaccessible

### 5. Token Management
1. **Storage**: Tokens stored in both localStorage and cookies
2. **Validation**: Automatic token validation on API calls
3. **Expiry**: 401 responses trigger automatic logout
4. **Security**: Secure cookie settings in production

## Security Features

- **Token-based authentication** with JWT support
- **Dual storage** (localStorage + cookies) for reliability
- **Automatic token validation** and cleanup
- **Secure cookie settings** (httpOnly, secure, sameSite)
- **Comprehensive route protection** (server + client)
- **Smart redirect handling** with destination preservation
- **Static file protection** - middleware skips assets
- **Public access** - home and auth pages accessible to everyone

## Testing the System

### Test Page: `/test-protection`
A comprehensive test page to verify middleware functionality:

1. **Public Access Test:**
   - Access `/` (home page) - should work without authentication
   - Access `/register` - should work without authentication
   - Access `/login` - should work without authentication

2. **Protected Route Test:**
   - Try to access `/dashboard` without logging in
   - Should redirect to `/login`
   - Check browser cookies for `redirectTo`

3. **Authenticated Access Test:**
   - Login and access `/dashboard`
   - Should display dashboard content
   - Try to access `/login` or `/register`
   - Should redirect to `/dashboard`

4. **Redirect After Login Test:**
   - Try to access protected route while logged out
   - Login with valid credentials
   - Should redirect to originally intended page

### Manual Testing Steps
1. **Clear all data** (localStorage, cookies)
2. **Access public routes** - should work without authentication
3. **Try protected routes** - should redirect to login
4. **Login** - should redirect to dashboard
5. **Try auth routes** - should redirect to dashboard
6. **Logout** - should redirect to home
7. **Verify protection** - protected routes inaccessible

## Configuration

### Environment Variables
- `NODE_ENV`: Controls secure cookie settings
- Backend API URL configuration in `src/config/env.ts`

### Route Management
- Add new routes to `src/config/routes.ts`
- Update middleware patterns as needed
- Test with `/test-protection` page

## Best Practices

1. **Use `ProtectedRoute`** for client-side protection of sensitive pages
2. **Use `useAuthRedirect`** for custom redirect logic when needed
3. **Use `authenticatedFetch`** for API calls
4. **Test with `/test-protection`** after changes
5. **Update route configuration** when adding new routes
6. **Handle loading states** in components
7. **Use secure cookie settings** in production
8. **Keep public pages accessible** to everyone 