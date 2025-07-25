import { fetcher } from '@/lib/fetch';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react'

export default function useLikeIdea(postId: number, isUserLiked: boolean, count: number) {

    const [isLiked, setIsLiked] = useState(false);

    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        setIsLiked(isUserLiked);
        setLikeCount(count);
    }, [isUserLiked, count]);

    const { mutate: likeToggle, isPending: isLikeTogglePending } = useMutation({
        mutationFn: () => {
            return fetcher(`ideas/${postId}/like-toggle/`, {
                method: "POST",
            });
        },
        onMutate: () => {
            const previousIsLiked = isLiked;
            const previousLikeCount = likeCount;

            setIsLiked(!isLiked);
            setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
            
            return { previousIsLiked, previousLikeCount };
        },
        onError: (error, variables, context) => {
            if (context) {
                setIsLiked(context.previousIsLiked);
                setLikeCount(context.previousLikeCount);
            }
        },
    });


    return {
        isLiked,
        totalLikes: likeCount,
        likeToggle,
        isLikeTogglePending,
    }


}
