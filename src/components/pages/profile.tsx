"use client";
import { useAuthContext } from "@/context/auth-context";
import Container from "../elements/container";
import UserDetails from "../sections/profile/user-details";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetch";
import { Response, Student } from "@/type";
import IdeaList from "../sections/profile/idea-list";

const getUser = async (userId?: number) => {
  const res: Response<Student> = await fetcher(
    "student-details/" + userId + "/",
    {
      method: "GET",
    }
  );
  return res;
};

export default function Profile({ userId }: { userId?: number }) {
  const { user } = useAuthContext();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", user?.user?.id],
    queryFn: async () => getUser(userId),
    enabled: !!userId,
  });

  const studentData = userData?.data;
  // const isAuthUser = user?.id === userId;

  return (
    <Container className="space-y-4 lg:flex max-w-6xl gap-x-2 mx-auto">
      <div className="max-md:sticky top-0 z-10">
        <div className="sticky top-0 bg-background z-10 py-5">
          {!isLoading ? (
            <UserDetails
              name={
                studentData?.user?.first_name +
                " " +
                (studentData?.user?.last_name ?? "")
              }
              role="Learner"
              bio={studentData?.student_bio ?? ""}
              email={studentData?.user?.email ?? ""}
              imageUrl={studentData?.profile_image ?? ""}
              id={studentData?.id}
            />
          ) : (
            <ProfileSkeletonView />
          )}
        </div>
      </div>
      {userId && (
        <div className="max-md:border-t flex-1 border-white/10 max-w-2xl mx-auto">
          <IdeaList userId={userId} />
        </div>
      )}
    </Container>
  );
}

function ProfileSkeletonView() {
  return (
    <div className="flex gap-x-3 items-center">
      <div className="animate-pulse bg-white w-20 h-[134px] rounded-md"></div>
      <div className="flex-1 space-y-2">
        <div className="w-ful  max-w-[300px] animate-pulse bg-white h-1.5 rounded-md"></div>
        <div className="w-ful  max-w-[210px] animate-pulse bg-white h-1.5 rounded-md"></div>
        <div className="w-ful  max-w-[250px] animate-pulse bg-white h-1.5 rounded-md"></div>
      </div>
    </div>
  );
}
