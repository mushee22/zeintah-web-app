import React, { useState } from "react";
import { Heart, MessageSquare } from "lucide-react";
import ShareDropdown from "../share-dropdown";
import { PostFooterProps } from "./types";
import SocialAction from "./social-action";
import PostCommentList from "./post-comment-list";
import { useAuthContext } from "@/context/auth-context";
import useLikeIdea from "@/hook/use-like-idea";

export default function PostFooter({
  postId,
  title,
  description,
  isUserLiked,
  likeCount,
  commentsCount,
}: PostFooterProps) {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();

  const { isLiked, totalLikes, likeToggle } = useLikeIdea(
    postId,
    isUserLiked,
    likeCount
  );

  return (
    <div>
      <div className="px-4 flex pb-4">
        <div className="flex-1 flex items-center gap-x-4">
          <SocialAction
            icon={isLiked ? <Heart className="text-red-500" /> : <Heart />}
            type="like"
            count={totalLikes}
            onClick={likeToggle}
          />
          <SocialAction
            icon={<MessageSquare />}
            type="comment"
            count={commentsCount}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="flex items-center gap-3">
          {postId && (
            <ShareDropdown
              title={title ?? ""}
              description={description ?? ""}
              hashtags={["zeitnah", "share", "post"]}
              url={`${process.env.NEXT_PUBLIC_WEB_URL}community/${postId}`}
            >
              <svg
                width={20}
                height={21}
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.3244 4.21777L11.425 5.11715L15.3519 9.04215H6.875C4.46563 9.04215 2.5 11.0078 2.5 13.4171C2.5 15.8265 4.46563 17.7921 6.875 17.7921V16.5421C5.14188 16.5421 3.75 15.1503 3.75 13.4171C3.75 11.684 5.14188 10.2921 6.875 10.2921H15.3519L11.4256 14.2178L12.3244 15.1165L17.3244 10.1165L17.7537 9.66715L17.3244 9.21777L12.3244 4.21777Z"
                  fill="white"
                  fillOpacity="0.9"
                />
              </svg>
            </ShareDropdown>
          )}
        </div>
      </div>
      {postId && (
        <PostCommentList open={open} postId={postId} currentUserId={user?.id} />
      )}
    </div>
  );
}
