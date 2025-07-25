"use client";

import { fetcher } from "@/lib/fetch";
import { Idea, Response } from "@/type";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostCard, { PostCardSkeleton } from "../elements/post-card";

export default function PostDetailView({ postId }: { postId: number }) {
  const { isLoading, data } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });

  return (
    <div className="max-w-screen-sm mx-auto py-10 px-4">
      {isLoading && <PostCardSkeleton />}
      {data?.data && <PostCard {...data.data} canEdit={false} />}
    </div>
  );
}

const getPost = async (postId: number) => {
  const res: Response<Idea> = await fetcher(`ideas/${postId}`);
  return res;
};
