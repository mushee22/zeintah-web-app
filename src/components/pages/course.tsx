import MobileBg from "@/assets/images/chapter-listing-mobile-bg.png"
import Bg from "@/assets/images/desktop-learn-bg.png"
import Image from 'next/image'
import Container from '../elements/container'
import ChapterListingSection from '../sections/course/chapter-listing'

export default function Course() {
    return (
        <Container className='md:py-0 h-full overflow-hidden'>
            <ChapterListingSection />
            <Image
                src={Bg}
                alt='Background image'
                className="max-lg:hidden fixed inset-0 -z-10"
                style={{
                    top: '100px'
                }}
            />
            <Image
                src={MobileBg}
                alt='Background image'
                className="md:hidden fixed inset-0 top-0 -z-10 object-cover  w-full"
                
            />
        </Container>
    )
}
