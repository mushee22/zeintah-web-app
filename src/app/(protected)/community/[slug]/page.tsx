import PostDetailView from "@/components/pages/post-detail-view";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <PostDetailView postId={slug} />
    </div>
  );
}
