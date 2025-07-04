'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  subTitle?: string;
  pageTitle: string;
  endIcon?: React.ReactNode;
  isBackButton?: boolean;
}

export default function PageHeader({ subTitle = '', pageTitle, endIcon, isBackButton = false }: Props) {
  return (
    <div className='flex items-center gap-x-3.5'>
      {
        isBackButton && <BackButton/>
      }
      <div className='flex-1 flex flex-col'>
        {
          subTitle &&
          <p className='text-xs sm:text-sm font-medium text-foreground/50'>{subTitle}</p>
        }
        <h2 className='text-base sm:text-2xl font-bold'>{pageTitle}</h2>
      </div>
      {
        endIcon && endIcon
      }
    </div>
  )
}


export const BackButton = ({className = ''}: {className?: string}) => {
   const router = useRouter();
  
  return (
    <button 
     style={{
      background: 'linear-gradient(119.22deg, rgba(255, 255, 255, 0.05) 8.5%, rgba(255, 255, 255, 0.02) 91.29%)'

     }}
     onClick={router.back} 
     className={cn('backdrop-blur-3xl size-9 md:size-9 rounded-full flex items-center justify-center', className)}>
      <ChevronLeft className='text-foreground size-[50%]'/>
    </button>
  )
}