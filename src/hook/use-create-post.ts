import { getAuthAccessToken, getURL } from "@/lib/fetch";
import { queryClient } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const createPostSchema = z.object({
  id: z.number().optional(),
  title: z.string().optional(),
  is_uploaded_image_removed: z.boolean().optional(),
  description: z.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  image: z.instanceof(File).optional()
    .refine((file) => {
      if (!file) return true;
      return file.size <= 5 * 1024 * 1024;
    }, "File size must be less than 5MB")
    .refine((file) => {
      if (!file) return true;
      return file.type.startsWith("image/");
    }, "Only image files are allowed"),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;

export default function useCreatePost() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ["create-post", "update-post"],
    mutationFn: async (values: CreatePostFormData) => {

      const url = values.id ? getURL(`ideas/${values.id}/`) : getURL("ideas/create/");
      const method = values.id ? "PUT" : "POST";
      
      const formData = new FormData();
      
      formData.append("title", values.title ?? "");
      
      formData.append("description", values.description);

      if (values.image) {
        formData.append("thumbnail", values.image);
      }

      const token = await getAuthAccessToken();
      
      const response = await fetch(url, {
        method: method,
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
  });

  const validateForm = (values: CreatePostFormData) => {
    const result = createPostSchema.safeParse(values);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as string;
        errors[field] = error.message;
      });
      return { isValid: false, errors };
    }
    return { isValid: true, errors: {} };
  };

  return {
    createPost: mutateAsync,
    isCreating: isPending,
    error,
    validateForm,
  };
} 