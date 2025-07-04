import { cn, secondsToMinutes } from "@/lib/utils";
import Image from "next/image";

interface Props {
    title: string;
    description?: string;
    isCompleted?: boolean;
    thumbnail?: string;
    duration: number;
    progress: number;
    className?: string;
}


export default function VideoCard({ title, thumbnail, isCompleted, duration, className }: Props) {

    const { durationText } = secondsToMinutes(duration)

    return (
        <div className={cn('flex gap-x-3 overflow-hidden items-center hover:bg-gradient-to-r from-foreground/5 to-foreground/10 backdrop-blur-3xl p-2 rounded-lg transition-all duration-200 ease-in-out', className)}>
            <div className=' aspect-[92/58] w-[92px] rounded-lg bg-[#D9D9D9] relative overflow-hidden'>
                {
                    thumbnail &&
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        sizes='84px'
                    />
                }
            </div>
            <div className='flex-1'>
                <div className='flex justify-between items-center'>
                    <h3>
                        <span className='text-sm font-semibold'>{title}</span>
                    </h3>
                    {
                        isCompleted ?
                            <CompletedBadge />
                            :
                            <></>
                    }
                </div>
                <span className='text-xs  font-light text-foreground/50'>{durationText} min</span>
            </div>
        </div>
    )
}


const CompletedBadge = () => {

    return (
        // <div className='bg-gradient-to-b p-1 from-foreground/5 to-foreground/10 backdrop-blur-3xl w-5 h-5 rounded-full flex items-center justify-center'>
        //     <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        //         <path d="M1.875 4.75L4.5 7.375L10.5 1.375" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        //     </svg>

        // </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="16" rx="8" fill="url(#paint0_linear_185_839)" />
            <g clipPath="url(#clip0_185_839)">
                <path d="M5.25 8.5L7 10.25L11 6.25" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <linearGradient id="paint0_linear_185_839" x1="2.08" y1="3.84" x2="12.8" y2="14.08" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#99CCA9" />
                    <stop offset="1" stopColor="#EEE852" />
                </linearGradient>
                <clipPath id="clip0_185_839">
                    <rect width="8" height="8" fill="white" transform="translate(4 4)" />
                </clipPath>
            </defs>
        </svg>

    )
}