"use client";

import PostCard, { PostCardSkeleton } from "@/components/elements/post-card";
import { GET_IDEAS_URL } from "@/constants/urls";
import { fetcher } from "@/lib/fetch";
import { Idea, Response } from "@/type";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import EmptyPosts from "@/components/elements/empty-posts";
import CreatePost from "@/components/elements/create-post";
import { useAuthContext } from "@/context/auth-context";

export default function IdeaList({ userId }: { userId?: number }) {


  const { user } = useAuthContext()

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

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  // Check if there are any posts
  const hasPosts = data?.pages.some(group => group.data && group.data.length > 0);

  return (
    <>
    <div className="space-y-1 grid grid-cols-1 gap-4 py-4">
      {isLoading ? (
        ideaSkeleton
      ) : !hasPosts ? (
        <EmptyPosts 
          title={userId ? "No posts yet" : "No posts found"}
          description={userId ? "This user hasn't shared any posts yet." : "No posts match your criteria."}
        />
      ) : (
        <>
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data?.map((idea) => (
                <PostCard
                  {...idea}
                  key={idea.id}
                  canEdit={idea?.student?.id == user?.id}
                />
              ))}
            </React.Fragment>
          ))}
          {hasNextPage && <p ref={ref}>Loading......</p>}
        </>
      )}
    </div>
    <CreatePost/>
    </>
  );
}

export const ideaSkeleton = [
  <PostCardSkeleton key={1} />,
  <PostCardSkeleton key={2} />,
  <PostCardSkeleton key={3} />,
  <PostCardSkeleton key={4} />,
  <PostCardSkeleton key={5} />,
];
