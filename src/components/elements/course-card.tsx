import React from 'react'
import { Button } from '../ui/button'
import Image, { StaticImageData } from 'next/image';

import CourseMaskImage from "@/assets/images/home/course-card-mask.png";

interface Props {
    title: string;
    price: number;
    subTitle: string;
    image: StaticImageData | string;
}


export default function CourseCard({ title, price, subTitle, image }: Props) {
    return (
        <div className='px-5 pt-16 pb-8 rounded-xl overflow-hidden relative'>
            <Image
                src={CourseMaskImage}
                alt=''
                fill
                className='-z-[1] object-cover'
            />
            <div className='text-center'>
                <h3 className='text-transparent max-w-[230px] mx-auto bg-clip-text bg-gradient-to-r from-primary to-secondary text-[22px] font-bold uppercase'>{title}</h3>
                <p className='font-bold text-lg mt-2'>{formattedAmount.format(price)}</p>
                <p className='text-sm uppercase font-normal mt-4'>{subTitle}</p>
            </div>
            <div className='flex justify-center -z-10'>
                <Image
                    src={image}
                    alt=''
                    className='-z-10'
                />
            </div>
            <div className='w-full flex gap-x-3 -mt-[20px]'>
                <Button variant="outline" className='flex-1'>Quick Glimps</Button>
                <Button variant="default" className='flex-1'>Purchase</Button>
            </div>
        </div>
    )
}


const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0 // optional, removes decimal places
  })