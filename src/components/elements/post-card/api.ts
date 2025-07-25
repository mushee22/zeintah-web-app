import { fetcher } from "@/lib/fetch";

export interface Comment {
    id?: number;
    content: string;
    author?: string;
    created_at?: string;
    updated_at?: string;
}

export class CommentService {
    static async fetchCommentsForPost(props: {
        pageParam: unknown;
        queryKey: [string, number];
    }) {
        const { pageParam, queryKey } = props;
        const res = await fetcher(`ideas/${queryKey[1]}/comments/?page=${pageParam}`);
        return res;
    }

    static async createCommentForPost(postId: number, comment: string) {
        const res = await fetcher(`ideas/${postId}/comments/`, {
            method: "POST",
            body: JSON.stringify({ comment }),
        });
        return res;
    }

    static async deleteCommentForPost( commentId: number) {
        const res = await fetcher(`ideas/${commentId}/comments/`, {
            method: "DELETE",
        });
        return res;
    }
}

export const fetchComments = CommentService.fetchCommentsForPost;
export const createComment = CommentService.createCommentForPost;
export const deleteComment = CommentService.deleteCommentForPost;