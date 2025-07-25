import { Image as ImageIcon, Upload, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import Image from "next/image";
import useCreatePost, { CreatePostFormData } from "@/hook/use-create-post";
import useUpdatePost from "@/hook/use-update-post";

interface CreatePostFormProps {
  onSuccess?: VoidFunction;
  onClose?: VoidFunction;
  className?: string;
  initialValues?: {
    title?: string;
    thumbnail?: string;
    description: string;
    id?: number;
  };
  mode?: "create" | "edit";
  postId?: number;
}

const CreateOrUpdatePostForm: React.FC<CreatePostFormProps> = ({
  onSuccess,
  className = "",
  initialValues,
  mode = "create",
  postId,
}) => {
  const [formData, setFormData] = useState<CreatePostFormData>({
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    image: undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [status, setStatus] = useState<string | null>(null);

  const { createPost, isCreating, validateForm } = useCreatePost();
  const { updatePost, isUpdating } = useUpdatePost();

  const isSubmitting = mode === "edit" ? isUpdating : isCreating;

  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title ?? "",
        description: initialValues.description ?? "",
        id: initialValues.id ?? undefined,
      });

      setImagePreview(initialValues.thumbnail ?? "");
    }
  }, [initialValues]);

  const handleInputChange = (
    field: keyof CreatePostFormData,
    value: string | File | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    try {
      const validation = validateForm(formData);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      if (mode === "edit" && postId) {
        await updatePost({ id: postId, data: formData });
      } else {
        await createPost(formData);
      }

      // Reset form only for create mode
      if (mode === "create") {
        setFormData({
          title: "",
          description: "",
          image: undefined,
        });
        setImagePreview(null);
        setErrors({});
      }

      onSuccess?.();
    } catch (error) {
      console.error(
        `Error ${mode === "edit" ? "updating" : "creating"} post:`,
        error
      );
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setStatus(
        `Error ${
          mode === "edit" ? "updating" : "creating"
        } post: ${errorMessage}`
      );
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        setErrors((prev) => ({ ...prev, image: error.message }));
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        handleInputChange("image", file);
        setErrors((prev) => ({ ...prev, image: "" }));

        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            setImagePreview(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  const removeImage = (): void => {
    handleInputChange("image", undefined);
    if (mode === "edit" && initialValues?.thumbnail) {
      setFormData((prev) => ({ ...prev, is_uploaded_image_removed: true }));
    }
    setImagePreview(null);
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const getFieldErrorClass = (fieldName: keyof CreatePostFormData): string => {
    return errors[fieldName]
      ? "border-red-500 focus:border-red-500"
      : "border-foreground/20 focus:border-blue-500";
  };

  const handleReset = (): void => {
    setFormData({
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      image: undefined,
      is_uploaded_image_removed: false,
    });
    setImagePreview(initialValues?.thumbnail ?? null);
    setErrors({});
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 max-w-4xl">
          <div className="flex flex-col gap-y-1">
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              className={`p-2 border rounded-md outline-none transition-colors ${getFieldErrorClass(
                "title"
              )}`}
              name="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              tabIndex={-1}
            />
            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title}</span>
            )}
          </div>

          <div className="flex flex-col gap-y-1">
            <label className="text-sm font-medium">Description</label>
            <textarea
              placeholder="Enter description"
              className={`resize-none outline-none border rounded-md p-2 transition-colors ${getFieldErrorClass(
                "description"
              )}`}
              name="description"
              rows={5}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              tabIndex={-1}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description}</span>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-sm font-medium">Image</label>
            {imagePreview && (
              <div className="relative inline-block aspect-square w-full">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full aspect-square object-cover rounded-lg border"
                  fill
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {!imagePreview && (
              <div
                {...getRootProps()}
                className={`p-8 border border-dashed rounded-3xl cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : errors.image
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col gap-y-3 items-center w-full">
                  {isDragActive ? (
                    <ImageIcon className="text-blue-500" size={48} />
                  ) : (
                    <Upload className="text-gray-400" size={48} />
                  )}
                  <div className="text-center">
                    <p className="text-gray-600">
                      {isDragActive
                        ? "Drop the image here"
                        : "Upload image here or click to browse"}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Supports: JPEG, PNG, GIF, WebP (Max: 5MB)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {errors.image && (
              <span className="text-red-500 text-sm">{errors.image}</span>
            )}
          </div>

          {status && <div className="text-red-500 text-sm">{status}</div>}

          <div className="flex gap-x-2 items-center pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="  px-6 py-2 rounded-md hover:bg-accent-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting
                ? mode === "edit"
                  ? "Updating..."
                  : "Creating..."
                : mode === "edit"
                ? "Update Post"
                : "Create Post"}
            </Button>

            <Button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className=" bg-red-400 text-white hover:text-gray-800 hover:bg-red-500  px-4 py-2"
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateOrUpdatePostForm;
