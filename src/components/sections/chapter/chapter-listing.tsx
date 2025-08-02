"use client";
import { LearnContentCardSkeleton } from "@/components/elements/chapter-card";
import { GET_CHPATERS_LIST_URL } from "@/constants/urls";
import { fetcher } from "@/lib/fetch";
import { Chapter, Response } from "@/type";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ChapterListingMobileView from "./chapter-listing-mobile-view";

export default function ChapterListingSection({
  courseID,
}: {
  courseID: string;
}) {
  const { data, isLoading } = useQuery<Response<Chapter[]>>({
    queryKey: ["chapters", courseID],
    queryFn: async () => {
      if (!courseID) return { data: [] };
      const URL = GET_CHPATERS_LIST_URL + `?package_id=${courseID}`;
      const res = await fetcher(URL, {
        method: "GET",
      });
      return res;
    },
    enabled: !!courseID,
  });

  return (
    <section className="px-2 text-sm font-normal lg:h-screen ">
      <ChapterListingMobileView
        chapters={data?.data ?? []}
        fetching={isLoading}
      />
    </section>
  );
}

export function LearContentListSkeletonView() {
  return (
    <>
      <LearnContentCardSkeleton />
      <LearnContentCardSkeleton />
      <LearnContentCardSkeleton />
      <LearnContentCardSkeleton />
      <LearnContentCardSkeleton />
      <LearnContentCardSkeleton />
    </>
  );
}
