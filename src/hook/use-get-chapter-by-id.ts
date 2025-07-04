import { GET_CHAPTER_DETAILS_URL } from '@/constants/urls'
import { fetcher } from '@/lib/fetch'
import { Response, SubChapter } from '@/type'
import { useQuery } from '@tanstack/react-query'

export async function getChapterById({ queryKey }: { queryKey: readonly unknown[] }) {
    const id = queryKey[1]
    console.log(id)
    const res = await fetcher(GET_CHAPTER_DETAILS_URL.replace(":id", `${id}`), {
        method: 'GET',
    })
    return res
}

interface ChapterDetails { 
    chapter_title: string
    chapter_description: string;
    subchapters: SubChapter[];
}

export default function useGetChapterById(id: string) {

    const { data, isLoading } = useQuery<Response<ChapterDetails>>({
        queryKey: ['chapters', id],
        queryFn: getChapterById,
        enabled: true,
    })

    const completedChapters = data?.data?.subchapters?.filter((chapter) => chapter.is_completed).length ?? 0

    const numberOfVideos = data?.data?.subchapters?.length ?? 0
    const totalDuration = data?.data?.subchapters?.reduce((acc, chapter) => acc + (chapter.duration ?? 0), 0) ?? 0

    return {
        subChapter: data?.data?.subchapters ?? [],
        completedChapters: completedChapters,
        title: data?.data?.chapter_title ?? '',
        description: data?.data?.chapter_description ?? '', 
        numberOfVideos: numberOfVideos,
        totalDuration: totalDuration,
        isLoading
    }
}
