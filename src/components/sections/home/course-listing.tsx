import React from 'react'
import CourseCard from '@/components/elements/course-card'
import SectionTitle from '@/components/elements/section-title'

import Technical from "@/assets/images/home/course-1.png"
import Advanced from "@/assets/images/home/course-2.png"

export default function CourseListingSection() {
    return (
        <section className='mt-11'>
            <SectionTitle sectionName='Our Courses' />
            <div className='mt-8 flex flex-col md:grid grid-cols-2 gap-x-6'>
                <CourseCard
                    title='TECHNICAL COURSE'
                    image={Technical}
                    price={80800}
                    subTitle='SIX MONTHS ACCESS'
                />
                 <CourseCard
                    title='ADVANCE TECHNICAL COURSE'
                    image={Advanced}
                    price={129999}
                    subTitle='ONE YEAR ACCESS'
                />
            </div>
        </section>
    )
}
