import React from "react";
import { SocialActionProps } from "./types";

export default function SocialAction({
  icon,
  type,
  count,
  onClick,
}: SocialActionProps) {

  const label = type === "like" ? count > 1 ? "Likes" : "Like" : count > 1 ? "Comments" : "Comment";

  return (
    <div
      role="button"
      className="flex cursor-pointer items-center gap-x-2"
      onClick={onClick}
    >
      {icon}
      <p className="text-sm font-normal flex items-center gap-x-1">
        {
          count > 0 && (
            <span className="">{count}</span>
          )
        }
        <span className="hidden md:block">{label}</span>
      </p>
    </div>
  );
} 