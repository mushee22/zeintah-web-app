'use client'
import { queryClient } from '@/lib/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

export default function QueryClientContextProvider({ children }: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient} >
            {children}
        </QueryClientProvider>
    )
}
