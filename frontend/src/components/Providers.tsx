"use client"

import { AuthProvider } from "@/app/auth_wrapper"
import { Toaster } from "@/components/ui/sonner"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import AuthDebug from "./AuthDebug"

interface ProvidersProps {
    children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <AuthProvider>
            <NuqsAdapter>
                <Toaster />
                {children}
                {process.env.NODE_ENV === "development" && <AuthDebug />}
            </NuqsAdapter>
        </AuthProvider>
    )
} 