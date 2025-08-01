import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect()
  })

const isProtectedRoute = createRouteMatcher([
    '/dashboard/(.*)',
    '/dashboard/settings(.*)',
    '/dashboard/history',
    '/dashboard/billing',
    '/dashboard/settings/[[...rest]]/page.tsx',
])

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/dashboard/settings(.*)', // Ensure it's accessible dynamically
  ],
};