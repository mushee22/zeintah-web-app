import Logo from "@/assets/images/zeintah-logo.svg";
import { getImageURL } from "@/lib/fetch";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PostHeaderProps } from "./types";
import { getInitials } from "./utils";

export default function PostHeader({ student, action }: PostHeaderProps) {
  const { user, profile_image, id } = student;
  const initials = getInitials(user?.first_name, user?.last_name);

  return (
    <div className="flex items-center gap-x-3 p-4">
      <div className="aspect-square w-10 bg-gray-100 rounded-full relative">
        {user?.email ? (
          profile_image ? (
            <Image
              src={getImageURL(profile_image)}
              alt={user?.first_name}
              fill
              className="object-cover"
            />
          ) : (
            <span>{initials}</span>
          )
        ) : (
          <Image src={Logo} alt="Logo" fill className="object-cover" />
        )}
      </div>
      <div className="flex items-center flex-1">
        {user?.email ? (
          <Link href={`/profile/${id}`} className="inline-block flex-1">
            <div className="space-y-[2px]">
              <h3 className="text-sm font-normal">
                {user?.first_name} {user?.last_name ?? ""}
              </h3>
              <p className="text-xs font-normal opacity-60">Learner</p>
            </div>
          </Link>
        ) : (
          <div className="space-y-[2px] flex-1">
            <h3 className="text-sm font-normal">Zeitnah</h3>
            <p className="text-xs font-normal opacity-60">Author</p>
          </div>
        )}
        <div>{action}</div>
      </div>
    </div>
  );
} 