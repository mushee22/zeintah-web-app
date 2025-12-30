import Chapter from '@/components/pages/chapter'
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { isAuthenticated } = await getSession();

  if (!isAuthenticated) redirect('/sign-in');

  if (!slug) {
    return redirect("404")
  }

  return (
    <Chapter courseID={slug} />
  )
}
