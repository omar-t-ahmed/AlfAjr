'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { ReactNode } from 'react'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY as string;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST as string;

if (typeof window !== 'undefined' && POSTHOG_KEY && POSTHOG_HOST) {
    posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: 'identified_only',
    })
}

interface CSPostHogProviderProps {
    children: ReactNode;
}

export function CSPostHogProvider({ children }: CSPostHogProviderProps) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}