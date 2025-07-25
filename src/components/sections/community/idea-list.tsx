"use client";

import PostCard from "@/components/elements/post-card";
import { GET_IDEAS_URL } from "@/constants/urls";
import { fetcher } from "@/lib/fetch";
import { Idea, Response } from "@/type";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { ideaSkeleton } from "../profile/idea-list";
import EmptyPosts from "@/components/elements/empty-posts";
import LoadMore from "@/components/elements/load-more";

export default function IdeaList({ userId }:{ userId?: string }) {

  const fetchIdeas = async ({ pageParam }: { pageParam: unknown }) => {
    const res: Response<Idea[]> = await fetcher(
      GET_IDEAS_URL + `?page=${pageParam}${userId ? `&user_id=${userId}` : ""}`,
      {
        method: "GET",
      }
    );
    return res;
  };

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery<
    Response<Idea[]>
  >({
    queryKey: ["ideas"],
    queryFn: fetchIdeas,
    initialPageParam: 1,
    getNextPageParam: (res: Response<Idea[]>) => {
      if (res.meta?.has_next) return res.meta.current_page + 1;
      return undefined;
    },
  });

  

  // Check if there are any posts
  const hasPosts = data?.pages.some(group => group.data && group.data.length > 0);

  return (
    <div className="space-y-1 grid grid-cols-1 gap-4 py-4">
      {isLoading ? (
        ideaSkeleton
      ) : !hasPosts ? (
        <EmptyPosts />
      ) : (
        <>
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data?.map((idea) => (
                <PostCard {...idea} key={idea.id} />
              ))}
            </React.Fragment>
          ))}
          <LoadMore fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
        </>
      )}
    </div>
  );
}
