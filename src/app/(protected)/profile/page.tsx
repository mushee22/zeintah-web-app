import PageContent from "@/components/pages/profile";
import { redirect } from "next/navigation";

export default async function Page() {
  redirect("/404");

  return <PageContent />;
}
