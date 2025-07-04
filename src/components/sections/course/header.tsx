import Logo from "@/assets/images/logo.svg"
import PageHeader from "@/components/elements/page-header"
import { ProgressSecondary } from "@/components/ui/progress"
import { USER_COURSE_PROGRESS_URL } from "@/constants/urls"
import { fetcher } from "@/lib/fetch"
import { CourseProgress, Response } from "@/type"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

export default function Header() {

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
        <section className="px-2">
            <Image
                src={Logo}
                alt="Company Logo"
                className="md:hidden"

                priority
            />
            <div className="mt-9 pb-4 border-b border-foreground/10">
                <PageHeader
                    pageTitle='Learn'
                />
                <div className='flex items-center gap-x-2 mt-3 md:max-w-[520px]'>
                    <p className='uppercase font-medium text-[10px] bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text'>Progress</p>
                    <ProgressSecondary
                        value={completedPercentage}
                        max={100}
                        className='flex-1 h-1 '
                    />
                    <p className='uppercase font-medium text-[10px]'>{completedPercentage}%</p>
                </div>
            </div>
        </section>
    )
}
