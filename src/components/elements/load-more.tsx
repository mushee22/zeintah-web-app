import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function LoadMore({
  fetchNextPage,
  hasNextPage,
}: {
  fetchNextPage: () => void;
  hasNextPage: boolean;
}) {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!hasNextPage) return null;

  return <p ref={ref}>Loading......</p>;
}
