import React from "react";
import usePostAction from "@/hook/use-post-action";
import DeletePost from "../delete-post";
import UpdatePost from "../update-post";
import { PostCardProps } from "./types";
import PostHeader from "./post-header";
import PostImage from "./post-image";
import PostBody from "./post-body";
import PostFooter from "./post-footer";
import PostSettingsMenu from "./post-settings-menu";

export default function PostCard({
  id,
  title,
  thumbnail,
  description,
  student,
  created_date,
  width: image_width,
  height: image_height,
  canEdit = false,
  is_liked,
  like_count,
  comment_count,
  isAuthenticated,
}: PostCardProps) {
  const { editOpen, deleteConfirm, setEditOpen, setDeleteConfirm } =
    usePostAction();

  return (
    <div className="post-card-bg border border-white/10 rounded-xl">
      <PostHeader
        student={student}
        action={
          canEdit && (
            <PostSettingsMenu
              onEdit={() => setEditOpen(true)}
              onDelete={() => setDeleteConfirm(true)}
            />
          )
        }
      />
      <PostImage
        image={thumbnail}
        alt={title}
        image_height={image_height}
        image_width={image_width}
      />
      <PostBody
        created_date={created_date}
        description={description}
        title={title}
      />
      {
        isAuthenticated && (
          <PostFooter
            student={student}
            postId={id ?? 0}
            title={title}
            description={description}
            isUserLiked={is_liked}
            likeCount={like_count}
            commentsCount={comment_count}
          />
        )}
      {canEdit && isAuthenticated && (
        <>
          <UpdatePost
            initialValues={{
              title,
              description,
              thumbnail,
              id,
            }}
            open={editOpen}
            onClose={setEditOpen}
          />
          <DeletePost open={deleteConfirm} onClose={setDeleteConfirm} id={id} />
        </>
      )}
    </div>
  );
} 