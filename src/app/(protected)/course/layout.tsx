import CourseProgressCard from "@/components/elements/course-progress-card";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

import { PropsWithChildren } from "react";

export default async function layout({ children }: PropsWithChildren) {
  const { isAuthenticated } = await getSession();

  if (!isAuthenticated) redirect('/sign-in');
  return (
    <>
      {children}
      <CourseProgressCard />
    </>
  );
}
