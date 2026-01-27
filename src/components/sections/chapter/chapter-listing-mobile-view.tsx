import ChapterCard from '@/components/elements/chapter-card';
import { Chapter } from '@/type';
import Link from 'next/link';
import { LearContentListSkeletonView } from './chapter-listing';
import Header from './header';


interface Props {
    fetching: boolean;
    chapters: Chapter[];
}

export default function ChapterListingMobileView({ fetching, chapters = [] }: Props) {
    return (
        <div className=''>
            <Header
                title={chapters[0]?.package_title ?? ""}
            />
            <h3 className='my-4'>Chapters</h3>
            <div className='space-y-4  md:grid grid-cols-2 gap-x-4 gap-y-4'>
                {fetching && <LearContentListSkeletonView />}

                {
                    Array.isArray(chapters) ? chapters?.map((chapter, index) => (
                        <Link className='block' key={index} href={`/course/chapter/${chapter?.id}`}>
                            <ChapterCard
                                duration={chapter?.total_duration}
                                numberOfLessons={chapter?.total_subchapters}
                                title={chapter?.title}
                                description={chapter?.description}
                                thumbnail={chapter?.thumbnail}
                                isCompleted={chapter?.completed_subchapters === chapter?.total_subchapters}
                                numberOfCompletedLessons={chapter?.completed_subchapters ?? 0}
                            />
                        </Link>
                    ))
                        :
                        null
                }
            </div>
        </div>
    )
}
