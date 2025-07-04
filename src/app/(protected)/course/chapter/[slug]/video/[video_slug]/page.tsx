import VideoPageContent from '@/components/pages/video';
import { redirect } from 'next/navigation';

export default async function Page({ params, }: { params: Promise<{ slug: string, video_slug: string }> }) {

  const { slug, video_slug } = await params;

  if (!slug || !video_slug) {
    return redirect("404")
  }

  return (
    <VideoPageContent
      chapterId={slug}
      videoId={video_slug}
    />
  )
}
