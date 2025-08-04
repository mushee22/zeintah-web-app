"use client";
import CourseCard, { CourseSkeleton } from "@/components/elements/course-card";
import { GET_COURSES_URL } from "@/constants/urls";
import { fetcher, getImageURL } from "@/lib/fetch";
import { secondsToHoursAndMinutes } from "@/lib/utils";
import { Course, Response } from "@/type";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export default function CourseListingSection() {
  const { data, isLoading } = useQuery<Response<Course[]>>({
    queryKey: ["chapters"],
    queryFn: async () => {
      const res = await fetcher(GET_COURSES_URL, {
        method: "GET",
      });
      return res;
    },
    enabled: true,
  });

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <CourseSkeleton key={index} />
          ))}
        {data?.data?.map((course) =>
          course.is_student_purchased ? (
            <Link href={`/course/${course.id}`} key={course.id}>
              <CourseCard
                image={getImageURL(course.thumbnail)}
                title={course.title}
                isLocked={!course?.is_student_purchased}
                totalDuration={
                  course.subchapter_duration ?
                  secondsToHoursAndMinutes(course.subchapter_duration)
                    .durationText
                  :
                  ""
                }
                videoCount={course.subchapter_count}
                completedVideos={course.total_completed_subchapters || 0}
              />
            </Link>
          ) : (
            <CourseCard
              image={getImageURL(course.thumbnail)}
              title={course.title}
              isLocked={!course?.is_student_purchased}
              totalDuration={
                secondsToHoursAndMinutes(course.subchapter_duration)
                  .durationText
              }
              videoCount={course.subchapter_count}
              key={course.id}
              completedVideos={course.total_completed_subchapters || 0}
            />
          )
        )}
      </div>
    </div>
  );
}
