import { ProgressSecondary } from "@/components/ui/progress"
import { USER_COURSE_PROGRESS_URL } from "@/constants/urls"
import { fetcher } from "@/lib/fetch"
import { CourseProgress, Response } from "@/type"
import { useQuery } from "@tanstack/react-query"

export default function OverallProgress() {

    const { data } = useQuery<Response<CourseProgress>>({
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

    const completedPercentage = data?.data?.completed_subchapters ? (data?.data?.completed_subchapters / data?.data?.total_subchapters) * 100 : 0

    return (
        <div className='p-5 bg-[#162739E5] backdrop-blur-lg rounded-[20px]'>
            <p className=' font-bold text-xl'>
                Over all progress
            </p>
            <div className="flex items-center gap-x-1">
                <ProgressSecondary
                    value={completedPercentage}
                    max={100}
                    className='flex-1 h-1'
                />
                <p className='uppercase font-medium text-[10px]'>{completedPercentage}%</p>
            </div>
        </div>
    )
}
