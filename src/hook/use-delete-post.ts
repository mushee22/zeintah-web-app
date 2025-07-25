import { getAuthAccessToken, getURL } from "@/lib/fetch";
import { queryClient } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";

export default function useDeletePost() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: async (id: number) => {
      const token = await getAuthAccessToken();
      const response = await fetch(getURL(`ideas/${id}/`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });

  return {
    deletePost: mutateAsync,
    isDeleting: isPending,
  };
}
