import CourseProgressCard from "@/components/elements/course-progress-card";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <CourseProgressCard />
    </>
  );
}
