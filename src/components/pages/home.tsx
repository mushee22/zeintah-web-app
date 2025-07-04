'use client'
import Container from '../elements/container'
import AboutSection from '../sections/home/about'
import CourseListingSection from '../sections/home/course-listing'
import HeaderSection from '../sections/home/header'
import HeroSection from '../sections/home/hero'
import OurSpacesSection from '../sections/home/our-spaces'
import WhyExpensiveSections from '../sections/home/why-it-is-ecpensive'

export default function Home() {

  // const { token  } = useSession();

  

  return (
    <Container className='pb-24 max-w-5xl mx-auto'>
        <HeaderSection/>
        <HeroSection/>
        <AboutSection/>
        <CourseListingSection/>
        <WhyExpensiveSections/>
        <OurSpacesSection/>
    </Container>
  )
}
