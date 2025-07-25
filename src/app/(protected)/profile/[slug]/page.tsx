import PageContent from "@/components/pages/profile";
import React from "react";

export default async function Page({ params } : {params: Promise<{ slug: number }>}) {
  const { slug } = await params;

  return (
    <PageContent userId={slug} />
  );
}
