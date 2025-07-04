import OurSpaceImageOne from "@/assets/images/home/our-space-image-1.png"
import SectionTitle from '@/components/elements/section-title'

import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel"
import Image from 'next/image'

export default function OurSpacesSection() {
    return (
        <section className='mt-14'>
            <SectionTitle sectionName='Our space' />
            <Carousel
                opts={{
                    align: "start",
                    loop: true,

                }}
                className="w-full max-w-sm mt-8"
            >
                <CarouselContent

                >

                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                        <Image
                            src={OurSpaceImageOne}
                            alt=''
                        />
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                        <Image
                            src={OurSpaceImageOne}
                            alt=''
                        />
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                        <Image
                            src={OurSpaceImageOne}
                            alt=''
                        />
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
            <p className='font-light text-sm mt-5'>
                A modern and focused space for learning and growth.
                Our office is designed for collaboration, strategy, and success.
            </p>
        </section>
    )
}
