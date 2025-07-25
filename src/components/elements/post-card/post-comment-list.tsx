import React from "react";
import { PostCommentListProps } from "./types";
import PostComment from "./post-comment";
import useComment from "@/hook/use-post-comment";
import CommentInput from "./comment-input";
import LoadMore from "../load-more";

export default function PostCommentList({
  open,
  postId,
  currentUserId,
}: PostCommentListProps) {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isCreatingComment,
    createCommentMutation,
    deleteCommentMutation,
    comment,
    setComment,
  } = useComment(postId, open);

  return (
    <div
      className="flex flex-col gap-y-2 px-4 pb-4"
      style={{ display: open ? "block" : "none" }}
    >
      <CommentInput
        value={comment}
        onInput={setComment}
        onSubmit={createCommentMutation}
        onSubmitLoading={isCreatingComment}
        mode="create"
        onCancel={() => setComment("")}
      />
      <div className="flex flex-col gap-y-2">
        {data?.pages.map((page) =>
          page?.data?.map((comment) => (
            <PostComment
              key={comment.id}
              comment={comment.comment ?? ""}
              user={comment.student}
              isCurrentUserComment={comment.student.id == currentUserId}
              onDelete={() => {
                deleteCommentMutation(comment.id);
              }}
            />
          ))
        )}
        <LoadMore fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
      </div>
    </div>
  );
}
