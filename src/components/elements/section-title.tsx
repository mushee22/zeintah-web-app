import { cn } from '@/lib/utils'
import React from 'react'

export default function SectionTitle({ sectionName, className }: { sectionName: string, className?: string }) {
    return (
        <div className={cn('flex items-center gap-x-4', className)}>
            <div className='h-[1px] flex-1 bg-gradient-to-r to-[#43321A] from-[#43321A00]'></div>
            <span className='text-sm font-medium uppercase'>{sectionName}</span>
            <div className='h-[1px] flex-1 bg-gradient-to-r from-[#43321A] to-[#43321A00]'></div>
        </div>
    )
}
