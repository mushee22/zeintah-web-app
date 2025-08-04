import { getImageURL } from "@/lib/fetch";
import Image from "next/image";
import React from "react";
import { PostCommentProps } from "./types";
import { getInitials } from "./utils";

export default function PostComment({
  comment,
  user,
  isCurrentUserComment,
  onDelete,
}: PostCommentProps) {

    

  const initials = getInitials(user?.user?.first_name, user?.user?.last_name);

  return (
    <div className="gap-x-2">
      <div className="flex items-center gap-x-2 pb-1">
        <div className="aspect-square w-6 bg-gray-100 overflow-hidden flex items-center justify-center rounded-full relative">
          {user.profile_image ? (
            <Image
              src={getImageURL(user.profile_image)}
              alt={user.user?.first_name ?? "User"}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-blue-500">{initials}</span>
          )}
        </div>
        <div>
          <p className="flex-1 text-xs font-bold">
            {user.user?.first_name} {user.user?.last_name}
          </p>
          {/* <p className="text-xs opacity-60">Learner</p> */}
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="w-6"></div>
        <div>
          <div className="flex-1 text-sm">{comment}</div>
          {isCurrentUserComment && (
            <div className="flex items-center gap-x-2">
              {/* <p className="text-xs text-white/40 cursor-pointer">Edit</p> */}
              <p className="text-xs text-white/40 cursor-pointer" onClick={onDelete}>Delete</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
