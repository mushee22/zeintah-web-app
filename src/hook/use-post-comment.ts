import { createComment, deleteComment, fetchComments } from '@/components/elements/post-card/api';
import { queryClient } from '@/lib/client';
import { Comment, Response } from '@/type';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export default function useComment(postId: number, isEnabled: boolean) {

    const [comment, setComment] = useState<string>("");

    const invalidateQueries = () => {
        queryClient.invalidateQueries({ queryKey: ["idea-comments", postId] });
        queryClient.invalidateQueries({ queryKey: ["ideas"] });
    }

    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery<
        Response<Comment[]>, Error>({
            queryKey: ["idea-comments", postId],
            queryFn: ({ pageParam }) =>
                fetchComments({ pageParam, queryKey: ["ideas", postId] }),
            initialPageParam: 1,
            getNextPageParam: (res: Response<Comment[]>) => {
                if (res.meta?.has_next) return res.meta.current_page + 1;
                return undefined;
            },
            enabled: isEnabled,
        });

    const { isPending: isCreatingComment, mutate: createCommentMutation } = useMutation({
        mutationKey: ["comment-create", postId],
        onSuccess: () => {
            invalidateQueries();
            setComment("");
        },
        mutationFn: () => {
            return createComment(postId, comment);
        },
    })

    const { isPending: isDeletingComment, mutate: deleteCommentMutation } = useMutation({
        mutationKey: ["comment-delete", postId],
        onSuccess: () => {
            invalidateQueries();
        },
        mutationFn: (commentId: number) => {
            return deleteComment(commentId);
        },
    })

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isCreatingComment,
        createCommentMutation,
        isDeletingComment,
        deleteCommentMutation,
        setComment,
        comment
    }
}
