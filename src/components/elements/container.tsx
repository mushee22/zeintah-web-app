import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    className?: string
}

export default function Container({ children, className = '' }: Props) {
    return (
        <section className={cn('container px-2 md:px-5 max-w-7xl mx-auto py-3 md:py-10 pb-[86px]', className)}>
            {children}
        </section>
    )
}
