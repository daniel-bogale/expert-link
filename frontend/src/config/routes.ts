// Route configuration for middleware and navigation
export const ROUTES = {
  // Public routes - accessible to everyone
  PUBLIC: {
    HOME: "/",
    ABOUT: "/about",
    CONTACT: "/contact",
    PRICING: "/pricing",
    FAQ: "/faq",
    TERMS: "/terms",
    PRIVACY: "/privacy",
    ROUTE_TEST: "/route-test",
  },
  
  // Authentication routes - accessible to unauthenticated users, redirect authenticated users
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
  },
  
  // Protected routes - require authentication
  PROTECTED: {
    DASHBOARD: "/dashboard",
    PROFILE: "/profile",
    SETTINGS: "/settings",
    EXPERT_SEARCH: "/experts",
    BOOKINGS: "/bookings",
    MESSAGES: "/messages",
    PAYMENTS: "/payments",
    TEST_PROTECTION: "/test-protection",
  },
  
  // API routes - handled separately
  API: {
    AUTH: "/api/auth",
    USERS: "/api/users",
    EXPERTS: "/api/experts",
    BOOKINGS: "/api/bookings",
  }
} as const;

// Route patterns for middleware
export const ROUTE_PATTERNS = {
  // Static files and system routes to skip middleware
  SKIP_MIDDLEWARE: [
    '/_next',
    '/api',
    '/static',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
  ],
  
  // Protected route patterns - require authentication
  PROTECTED: [
    '/dashboard',
    '/profile',
    '/settings',
    '/experts',
    '/bookings',
    '/messages',
    '/payments',
    '/test-protection',
  ],
  
  // Auth route patterns - accessible to unauthenticated users
  AUTH: [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ],
  
  // Public route patterns - accessible to everyone
  PUBLIC: [
    '/',
    '/about',
    '/contact',
    '/pricing',
    '/faq',
    '/terms',
    '/privacy',
    '/route-test',
  ]
} as const;

// Helper functions
export const isProtectedRoute = (pathname: string): boolean => {
  return ROUTE_PATTERNS.PROTECTED.some(route => pathname.startsWith(route));
};

export const isAuthRoute = (pathname: string): boolean => {
  return ROUTE_PATTERNS.AUTH.some(route => pathname.startsWith(route));
};

export const isPublicRoute = (pathname: string): boolean => {
  return ROUTE_PATTERNS.PUBLIC.some(route => 
    pathname === route || pathname.startsWith(route)
  );
};

export const shouldSkipMiddleware = (pathname: string): boolean => {
  return ROUTE_PATTERNS.SKIP_MIDDLEWARE.some(route => 
    pathname.startsWith(route) || pathname.includes('.')
  );
};

// Debug helper function
export const getRouteType = (pathname: string): string => {
  if (shouldSkipMiddleware(pathname)) return 'SKIP_MIDDLEWARE';
  if (isProtectedRoute(pathname)) return 'PROTECTED';
  if (isAuthRoute(pathname)) return 'AUTH';
  if (isPublicRoute(pathname)) return 'PUBLIC';
  return 'UNKNOWN';
}; 