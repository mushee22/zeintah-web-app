import BannerBg from "@/assets/images/home/home-hero-card-bg.png"
import BannerLogo from "@/assets/images/home/home-logo-icon.png"
import { merri } from '@/lib/font'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Hero() {
    return (
        <div className='px-11    mt-4 relative'>
            <Image
                src={BannerBg}
                alt='background'
                fill
                className='block md:hidden'
            />
            <div className='flex flex-col items-center -translate-y-[10%]'>
                <div className=''>
                    <Image
                        src={BannerLogo}
                        alt='banner logo'
                    />
                </div>
                <div className='text-center flex flex-col gap-y-4 justify-end  z-10'>
                    <h1 className={cn(merri.className, 'uppercase text-transparent tracking-normal leading-[30px] bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold text-[22px]')}>THE JOURNEY TO YOUR <br /> FINANCIAL FREEDOM</h1>
                    <h2 className='uppercase text-xs font-medium tracking-wide text-primary-200'>One pattern is enough for living</h2>
                </div>
            </div>

        </div>
    )
}
