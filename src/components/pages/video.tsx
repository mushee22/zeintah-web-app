'use client'
import MobileBg from "@/assets/images/chapter-listing-mobile-bg.png"
import Image from 'next/image'
import Container from '../elements/container'
import RelatedVideoSection from '../sections/video/related-video-list'
import VideoPlayerSection from '../sections/video/video-player'

export default function VideoPageContent({ chapterId, videoId }: { chapterId?: string, videoId: string }) {

    return (
        <Container className='h-full'>
            <div className='flex flex-col lg:flex-row gap-x-6'>
                <VideoPlayerSection slug={videoId} />
                <RelatedVideoSection
                    slug={chapterId}
                    videoId={videoId}
                />
            </div>
            <Image
                src={MobileBg}
                alt='Background image'
                className="md:hidden fixed inset-0 top-0 -z-10 object-cover  w-full"

            />
        </Container>
    )
}
