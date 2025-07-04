import { merri } from '@/lib/font';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    title: string;
    description: string;
    icon: React.ReactNode
}

export default function FeatureCard({ title, description, icon }: Props) {
    return (
        <div className='flex items-center gap-x-4'>
            <div className='w-16 h-16 rounded-xl overflow-hidden relative'
             style={{
                background: "linear-gradient(307.51deg, rgba(67, 50, 26, 0) -39.47%, #43321A 129.81%)"
             }}
            >
                <div className='absolute rounded-xl  w-[62.5px] h-[62.5px] flex items-center justify-center bg-background'>
                    {icon}
                </div>
            </div>
            <div className='flex-1 space-y-2'>
                <p className={cn('uppercase text-xs font-normal text-primary', merri.className)}>{title}</p>
                <p className='text-xs font-light'>{description}</p>
            </div>
        </div>
    )
}



