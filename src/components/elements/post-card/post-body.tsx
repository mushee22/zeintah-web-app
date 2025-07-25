import { timeAgo } from "@/lib/utils";
import React from "react";
import { PostBodyProps } from "./types";

export default function PostBody({
  title,
  description,
  created_date,
}: PostBodyProps) {
  return (
    <div className="py-4 space-y-1 font-normal px-4 pt-4">
      {title && <p className="text-sm leading-5">{title}</p>}
      {description && <p className="text-sm leading-5 whitespace-pre-wrap">{description}</p>}
      <p className="text-xs opacity-60 leading-none">{timeAgo(created_date)}</p>
    </div>
  );
} 