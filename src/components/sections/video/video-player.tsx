
import PageHeader from "@/components/elements/page-header"
import { GET_SUBCHAPTER_DETAILS_URL } from "@/constants/urls"
import { fetcher } from "@/lib/fetch"
import { Response, SubChapter } from "@/type"
import { useQuery } from "@tanstack/react-query"
import dynamic from "next/dynamic"

const Player = dynamic(() => import("@/components/elements/player"), { ssr: false })

interface Props {
  slug?: string
}

export default function VideoPlayerSection({ slug }: Props) {

  const { data, } = useQuery<Response<SubChapter>>({
    queryKey: ['sub-chapter', slug],
    queryFn: async () => {
      const res = await fetcher(GET_SUBCHAPTER_DETAILS_URL.replace(":id", slug ?? ''), {
        method: 'GET',
      })
      return res
    },
    enabled: true,
  })

  return (
    <section  className="flex-1 lg:pl-10">
      <PageHeader
        isBackButton
        pageTitle={data?.data?.chapter_name ?? 'Video Player'}
      />
      <div className='space-y-3 mt-4 flex-1 lg:max-w-[60vw]'>
        <Player
          url={data?.data?.video ?? ''}
          light={data?.data?.thumbnail ?? ''}
          videoId={data?.data?.id}
          watchedDuration={data?.data?.progress?.watched_duration}
          isCompleted={data?.data?.progress?.is_completed}
        />
        <div className='space-y-2  pb-4 border-b border-foreground/10'>
          <div className='flex items-center justify-between'>
            <p className='font-bold text-xl'>{data?.data?.title}</p>
            {/* <span className='text-xs font-light text-foreground/50'>
          {data?.data?.duration && secondsToMinutes(data?.data?.duration)?.durationText} min
          </span> */}
          </div>
          <p className='text-xs font-light text-muted whitespace-pre-wrap'>
            {data?.data?.description.trim()}
          </p>
        </div>
      </div>
    </section>
  )
}
