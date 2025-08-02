import MobileBg from "@/assets/images/chapter-listing-mobile-bg.png"
import Bg from "@/assets/images/desktop-learn-bg.png"
import Image from 'next/image'
import Container from '../elements/container'
import CourseListingSection from "../sections/course/course-listing"
import Header from "../sections/course/header"

export default function CoursePageContent() {
    return (
        <Container className="h-full space-y-5 !pt-0 overflow-hidden max-w-6xl">
            <Header />
            <CourseListingSection />
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