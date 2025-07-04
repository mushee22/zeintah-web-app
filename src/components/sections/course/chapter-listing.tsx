'use client'
import ChapterCard, { LearnContentCardSkeleton } from '@/components/elements/chapter-card'
import Player from '@/components/elements/player'
import { UserDetails } from '@/components/elements/profile-update-sheet'
import VideoCard from '@/components/elements/video-card'
import { GET_CHPATERS_LIST_URL } from '@/constants/urls'
import { fetcher } from '@/lib/fetch'
import { cn } from '@/lib/utils'
import { Chapter, Response, SubChapter } from '@/type'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import ChapterListingMobileView from './chapter-listing-mobile-view'
import OverallProgress from './overall-progress'

export default function ChapterListingSection() {

    const [selectedChapter, setSelectedChapter] = React.useState<Chapter | null>(null);
    const [selectedSubChapter, setSelectedSubChapter] = React.useState<SubChapter | null>(null);

    const { data, isLoading } = useQuery<Response<Chapter[]>>({
        queryKey: ['chapters'],
        queryFn: async () => {
            const res = await fetcher(GET_CHPATERS_LIST_URL, {
                method: 'GET',
            })
            return res
        },
        enabled: true,
    })

    useEffect(() => {
        if (data?.data?.length) {
            setSelectedChapter(data.data[0])
            if (data.data[0].subchapters.length) {
                setSelectedSubChapter(data.data[0]?.subchapters[0])
            }
        }
    }, [data])

    const handleOnSelectChapter = (id: number) => {
        const chapter = data?.data?.find((chapter) => chapter.id == id)
        if (chapter) {
            setSelectedChapter(chapter)
            if (chapter.subchapters?.length) {
                setSelectedSubChapter(chapter.subchapters?.[0])
            }
        }
    }

    const handleOnSelectSubChapter = (id: number) => {
        const subChapter = selectedChapter?.subchapters?.find((subChapter) => subChapter.id == id)
        if (subChapter) {
            setSelectedSubChapter(subChapter)
        }
    }


    return (
        <section className='px-2 text-sm font-normal lg:h-screen '>
            <ChapterListingMobileView
                chapters={data?.data ?? []}
                fetching={isLoading}
            />
            <div className=' hidden lg:flex flex-col h-full pb-5 '>
                <h2 className='text-base sm:text-2xl font-bold pt-10 pb-5'>Learn</h2>
                <div className='flex-1 flex gap-x-5'>
                    <div className='grid flex-1 grid-cols-2 py-5 h-full border rounded-xl border-foreground/10'
                        style={{
                            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),linear-gradient(88.23deg, rgba(242, 237, 77, 0.06) -45.08%, rgba(159, 212, 177, 0.06) 41.76%, rgba(15, 48, 76, 0.06) 130.35%)',
                            backdropFilter: 'blur(20px)'
                        }}
                    >
                        <div className='px-5'>
                            {
                                data?.data?.map((chapter) => (
                                    <div key={chapter.id} onClick={() => { handleOnSelectChapter(chapter.id) }}>
                                        <ChapterCard
                                            duration={chapter?.total_duration}
                                            numberOfLessons={chapter?.total_subchapters}
                                            title={chapter?.title}
                                            description={chapter?.description}
                                            thumbnail={chapter?.thumbnail}
                                            isCompleted={chapter?.completed_subchapters === chapter?.total_subchapters}
                                            numberOfCompletedLessons={chapter?.completed_subchapters ?? 0}
                                            className={cn(selectedChapter?.id == chapter.id ? 'bg-gradient-to-r px-2 from-foreground/5 to-foreground/10' : '')}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                        <div className='px-5 border-l border-foreground/25'>
                            {

                                selectedChapter?.subchapters?.map((subChapter) => (
                                    <div key={subChapter.id} onClick={() => { handleOnSelectSubChapter(subChapter.id) }}>
                                        <VideoCard
                                            duration={subChapter.duration}
                                            progress={0}
                                            title={subChapter.title}
                                            isCompleted={subChapter.is_completed}
                                            thumbnail={subChapter.thumbnail ?? ''}
                                            className={cn(selectedSubChapter?.id == subChapter.id ? 'bg-gradient-to-r px-2 from-foreground/5 to-foreground/10' : '')}
                                        />
                                    </div>
                                ))

                            }
                        </div>
                    </div>
                    <div className='w-[320px] gap-y-3 flex flex-col'>
                        {
                            selectedSubChapter &&
                            <div className='border p-5 flex-1 rounded-xl border-[#9FD4B1]'
                                style={{
                                    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),linear-gradient(88.23deg, rgba(242, 237, 77, 0.06) -45.08%, rgba(159, 212, 177, 0.06) 41.76%, rgba(15, 48, 76, 0.06) 130.35%)',
                                    backdropFilter: 'blur(20px)'
                                }}
                            >
                                <Player
                                    url={selectedSubChapter?.video ?? ''}
                                    light={selectedSubChapter?.thumbnail ?? ''}
                                    videoId={selectedSubChapter?.id}
                                    watchedDuration={selectedSubChapter?.progress?.watched_duration}
                                    isCompleted={selectedSubChapter.progress?.is_completed}
                                />
                                <div className='space-y-2  pb-4'>
                                    <div className='flex items-center justify-between'>
                                        <p className='font-bold text-xl'>{selectedSubChapter.title}</p>
                                    </div>
                                    <p className='text-xs font-light text-muted whitespace-pre-wrap'>
                                        {selectedSubChapter?.description.trim()}
                                    </p>
                                </div>
                            </div>
                        }
                        <div className='space-y-3'>
                            <OverallProgress />
                            <UserDetails />
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}


export function LearContentListSkeletonView() {
    return (
        <>
            <LearnContentCardSkeleton />
            <LearnContentCardSkeleton />
            <LearnContentCardSkeleton />
            <LearnContentCardSkeleton />
            <LearnContentCardSkeleton />
            <LearnContentCardSkeleton />
        </>
    )
}