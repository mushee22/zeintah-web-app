import ChapterPageContent from '@/components/pages/chapter'
import { redirect } from 'next/navigation'

export default async function Page({ params, }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (!slug) {
    return redirect("404")
  }

  return (
    <ChapterPageContent slug={slug} />
  )
}
