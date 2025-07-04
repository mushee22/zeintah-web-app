import VideoCard from '@/components/elements/video-card';
import useGetChapterById from '@/hook/use-get-chapter-by-id';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';



export default function RelatedVideoSection({ slug, videoId }: { slug?: string, videoId?: string  }) {


    const {subChapter } = useGetChapterById(slug ?? '')


    return (
        <section className='mt-6 lg:w-[320px]'>
            <div className='flex justify-between px-2 text-sm font-normal'>
                <span className=''>Next Video</span>
                {/* // <span>{completedChapters}/{subChapter?.length}</span> */}
            </div>
            <div className='flex flex-col gap-y-4 mt-4'>
                {
                   subChapter?.map((subChapter) => (
                        videoId == `${subChapter.id}` ?
                        <React.Fragment key={subChapter.id}/>
                        :
                        <Link className={cn('inline-block')} href={`/course/chapter/${slug}/video/${subChapter.id}`} key={subChapter.id}>
                            <VideoCard
                                duration={subChapter.duration}
                                progress={0}
                                title={subChapter.title}
                                isCompleted={subChapter.is_completed}
                                thumbnail={subChapter.thumbnail ?? ''}
                                className={cn(videoId == `${subChapter.id}`? 'bg-gradient-to-r' : '')}
                            />
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}
