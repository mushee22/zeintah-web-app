'use client'

import PageHeader from '@/components/elements/page-header'
import VideoCard from '@/components/elements/video-card'
import useGetChapterById from '@/hook/use-get-chapter-by-id'
import { secondsToMinutes } from '@/lib/utils'
import Link from 'next/link'
import { LearContentListSkeletonView } from '../course/chapter-listing'


export default function VideoListingSection({ slug }: { slug?: string }) {

    const { subChapter, isLoading, title, description, numberOfVideos, totalDuration } = useGetChapterById(slug ?? '')

    return (
        <>
           <div>
             <PageHeader
                pageTitle={""}
                isBackButton
            />
            <div className='pt-9 px-2 pb-4 border-b border-foreground/10'>
                <h2 className='text-xl font-bold'>{title}</h2>
                <p className='text-xs font-normal text-muted pt-1'>{description}</p>
                <div className='flex gap-x-2 items-center pt-3'>
                    <span className='text-xs  font-light text-foreground'>{numberOfVideos} Videos</span>
                    <div className='w-[1px] bg-foreground/10 h-[8px]'></div>
                    <span className='text-xs  font-light text-foreground'>{secondsToMinutes(totalDuration).durationText} min</span>
                </div>
            </div>
           </div>
            <section className='mt-8'>
                <div className='flex flex-col md:grid grid-cols-2 gap-y-4 mt-4'>
                    {isLoading && <LearContentListSkeletonView />}
                    {
                        subChapter?.map((subChapter) => (
                            <Link className='inline-block' href={`/course/chapter/${slug}/video/${subChapter.id}`} key={subChapter.id}>
                                <VideoCard
                                    duration={subChapter.duration}
                                    progress={0}
                                    title={subChapter.title}
                                    isCompleted={subChapter.is_completed}
                                    thumbnail={subChapter.thumbnail ?? ''}
                                />
                            </Link>
                        ))
                    }
                </div>
            </section>
        </>
    )
}
