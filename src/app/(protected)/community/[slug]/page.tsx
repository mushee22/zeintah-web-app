import PostDetailView from "@/components/pages/post-detail-view";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = await params;

  const { isAuthenticated } = await getSession();

  if (!isAuthenticated) redirect('/sign-in');

  return (
    <div>
      <PostDetailView postId={slug} />
    </div>
  );
}
