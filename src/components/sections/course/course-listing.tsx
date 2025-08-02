"use client";
import CourseCard from "@/components/elements/course-card";
import { GET_COURSES_URL } from "@/constants/urls";
import { fetcher, getImageURL } from "@/lib/fetch";
import { Course, Response } from "@/type";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export default function CourseListingSection() {
  const { data } = useQuery<Response<Course[]>>({
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
        {data?.data?.map((course) =>
          course.is_student_purchased ? (
            <Link href={`/course/${course.id}`} key={course.id}>
              <CourseCard
                image={getImageURL(course.thumbnail)}
                title={course.title}
                price={course.price}
                isLocked={!course?.is_student_purchased}
              />
            </Link>
          ) : (
            <CourseCard
              image={getImageURL(course.thumbnail)}
              title={course.title}
              price={course.price}
              key={course.id}
              isLocked={!course?.is_student_purchased}
            />
          )
        )}
      </div>
    </div>
  );
}
