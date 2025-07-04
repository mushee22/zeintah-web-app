import FeatureCard from '@/components/elements/feature-card'
import SectionTitle from '@/components/elements/section-title'
import { ChevronDown } from 'lucide-react'
import React from 'react'

export default function About() {
  return (
    <section className='mt-11'>
      <SectionTitle sectionName='How are we' />
      <div className='max-md:space-y-5 mt-8 md:mx-auto'>
        <FeatureCard
          title='Learn trading'
          description='Master the basics and advanced strategies to predict market trends and trade profitably.'
          icon={
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 18.6667V24.5M18.6667 16.3333V24.5M23.3334 11.6667V24.5M25.6667 3.5L15.5797 13.587C15.5255 13.6413 15.4611 13.6844 15.3903 13.7138C15.3194 13.7432 15.2434 13.7584 15.1667 13.7584C15.09 13.7584 15.014 13.7432 14.9431 13.7138C14.8723 13.6844 14.8079 13.6413 14.7537 13.587L10.913 9.74633C10.8036 9.63698 10.6553 9.57554 10.5006 9.57554C10.3459 9.57554 10.1976 9.63698 10.0882 9.74633L2.33337 17.5M4.66671 21V24.5M9.33337 16.3333V24.5" stroke="#F0BB67" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
        <FeatureCard
          title='Financial Freedom'
          description='No schedules, no bosses—trade on your terms and earn independently.'
          icon={
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.83332 22.5H21.1667M12.489 1.81029C12.5393 1.71883 12.6133 1.64256 12.7032 1.58944C12.7931 1.53632 12.8956 1.5083 13 1.5083C13.1044 1.5083 13.2069 1.53632 13.2968 1.58944C13.3867 1.64256 13.4606 1.71883 13.511 1.81029L16.955 8.34829C17.0371 8.49968 17.1517 8.631 17.2906 8.73284C17.4295 8.83468 17.5893 8.9045 17.7584 8.93729C17.9274 8.97008 18.1017 8.96503 18.2686 8.92249C18.4355 8.87996 18.5909 8.801 18.7237 8.69129L23.7135 4.41662C23.8093 4.33871 23.9273 4.29321 24.0506 4.28665C24.1739 4.2801 24.2961 4.31284 24.3996 4.38016C24.5031 4.44747 24.5826 4.5459 24.6266 4.66126C24.6706 4.77662 24.6769 4.90297 24.6445 5.02212L21.3382 16.9758C21.2707 17.2204 21.1253 17.4363 20.924 17.5909C20.7227 17.7454 20.4766 17.8301 20.2228 17.8321H5.77832C5.52438 17.8303 5.27795 17.7458 5.07644 17.5912C4.87494 17.4367 4.72936 17.2206 4.66182 16.9758L1.35665 5.02329C1.32428 4.90414 1.33054 4.77779 1.37455 4.66242C1.41856 4.54706 1.49803 4.44864 1.60154 4.38132C1.70504 4.31401 1.82724 4.28127 1.95053 4.28782C2.07383 4.29437 2.19187 4.33988 2.28765 4.41779L7.27632 8.69245C7.40908 8.80217 7.5645 8.88113 7.73139 8.92366C7.89829 8.96619 8.07254 8.97125 8.24162 8.93846C8.4107 8.90566 8.57043 8.83584 8.70933 8.73401C8.84823 8.63217 8.96286 8.50084 9.04499 8.34945L12.489 1.81029Z" stroke="#F0BB67" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
        <FeatureCard
          title='Grow with Us'
          description='Gain the knowledge and tools to achieve financial success.'
          icon={
            <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.99999 23.6667V15.5L7.66665 13.1667M12.3333 14.3333L9.99999 16.6667M15.8333 7.33333V8.26667C17.1896 9.0451 18.2461 10.2553 18.8345 11.7041C19.4228 13.153 19.5091 14.7572 19.0795 16.2608C18.6499 17.7644 17.7292 19.0809 16.4642 20.0002C15.1992 20.9196 13.6628 21.3889 12.1 21.3333H7.66665C6.06709 21.2247 4.5431 20.612 3.31357 19.5831C2.08405 18.5541 1.21225 17.162 0.823407 15.6066C0.434562 14.0513 0.548676 12.4127 1.14936 10.9262C1.75004 9.43974 2.80638 8.18189 4.16665 7.33333C4.16665 5.78624 4.78124 4.30251 5.8752 3.20854C6.96916 2.11458 8.45289 1.5 9.99999 1.5C11.5471 1.5 13.0308 2.11458 14.1248 3.20854C15.2187 4.30251 15.8333 5.78624 15.8333 7.33333Z" stroke="#F0BB67" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
      </div>
      <div className='flex flex-col items-center mt-9'>
        <ChevronDown/>
        <ChevronDown className='text-primary'/>
      </div>
    </section>
  )
}
