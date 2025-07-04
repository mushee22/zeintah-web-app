'use client'

import { USER_COURSE_PROGRESS_URL } from '@/constants/urls';
import { fetcher } from '@/lib/fetch';
import { secondsToMinutes } from '@/lib/utils';
import { CourseProgress, Response } from '@/type';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function CourseProgressCard() {

    const pathname = usePathname();

    const { data, isLoading } = useQuery<Response<CourseProgress>>({
        queryKey: ['course-progress'],
        queryFn: async () => {
            const res = await fetcher(USER_COURSE_PROGRESS_URL, {
                method: 'GET',
                isGuest: false,
            })

            return res
        },
        enabled: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })

    // const completedPercentage = data?.data?.completed_subchapters ? (data?.data?.completed_subchapters / data?.data?.total_subchapters) * 100 : 0
    const lastViewedVideo = data?.data?.last_watched_sub_chapter
    const remainingTime = lastViewedVideo ? secondsToMinutes((lastViewedVideo.duration ?? 0) - (lastViewedVideo.progress?.watched_duration ?? 0)).durationText : '00:00'

    console.log(remainingTime)

    if(pathname.includes('video')) return <></> 
    
    if (isLoading) return <SkeletonView />
    
    if(!lastViewedVideo) return <></> 

    return (
        <>
            <div className='border fixed inset-x-0 lg:hidden mx-2 z-20 md:ml-auto  bottom-[90px] max-w-[600px]  border-foreground/10 rounded-4xl bg-[#162739E5]/90 px-4 py-2 space-y-2.5'>
                {
                    !data?.data ?
                        <></>
                        :
                        <>
                            
                            {
                                lastViewedVideo ?
                                    <div className=''>
                                        <div className='flex items-center gap-x-4'>
                                            <div className='flex-1 w-0'>
                                                <p className='text-foreground text-sm font-medium'>{lastViewedVideo.title}</p>
                                                <p className='text-foreground/50 text-sm font-medium flex-1 whitespace-nowrap line-clamp-1'>
                                                    {remainingTime} remaining
                                                </p>
                                            </div>
                                            <Link href={`/course/chapter/${lastViewedVideo.chapter}/video/${lastViewedVideo.id}`} className='text-primary font-medium text-sm'>
                                                {/* Resume */}
                                                <div className='size-8 rounded-full bg-black/35 flex flex-col justify-center items-center'>
                                                    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0 1.48413C0 0.534731 1.0503 -0.0386772 1.84891 0.474718L7.4298 4.06243C8.16459 4.5348 8.16459 5.6089 7.4298 6.08126L1.84891 9.66898C1.05029 10.1824 0 9.60896 0 8.65956V1.48413Z" fill="url(#paint0_linear_187_1193)" />
                                                        <defs>
                                                            <linearGradient id="paint0_linear_187_1193" x1="1.17" y1="2.06328" x2="8.60058" y2="7.58384" gradientUnits="userSpaceOnUse">
                                                                <stop stopColor="#99CCA9" />
                                                                <stop offset="1" stopColor="#EEE852" />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    :
                                    <></>
                            }
                        </>
                }
            </div>

        </>
    )
}


function SkeletonView() {
    return (
        <div className="border border-foreground/10 rounded-xl p-4 space-y-2.5">
            <div className="animate-pulse flex items-center gap-x-2">
                <div className='uppercase font-medium text-[10px] h-1 bg-white w-10 rounded-md'></div>
                <div className='uppercase font-medium text-[10px] h-1 bg-white  rounded-md flex-1'></div>
                <div className='uppercase font-medium text-[10px] h-1 bg-white w-5 rounded-md'></div>
            </div>
            <div className="animate-pulse flex items-center gap-x-4">
                <div className='uppercase font-medium text-[10px] h-[6px] bg-white  rounded-md flex-1'></div>
                <div className='uppercase font-medium text-[10px] h-[12px] bg-white w-10 rounded-md'></div>
            </div>
        </div>
    )
}
