import { getAuthAccessToken, getURL } from "@/lib/fetch";
import { queryClient } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { CreatePostFormData } from "./use-create-post";

export default function useUpdatePost() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["update-post"],
    mutationFn: async ({ id, data }: { id: number; data: CreatePostFormData }) => {
      const formData = new FormData();
      formData.append("title", data.title ?? "");
      formData.append("description", data.description);

      if (data.image) {
        formData.append("thumbnail", data.image);
      } else {
        formData.append("is_uploaded_image_removed", data.is_uploaded_image_removed ? "true" : "false"); 
      }

      const token = await getAuthAccessToken();
      const response = await fetch(getURL(`ideas/${id}/`), {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });

  return {
    updatePost: mutateAsync,
    isUpdating: isPending,
  };
} 