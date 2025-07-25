"use client";

import React from "react";
import Modal from "./modal";
import CreateOrUpdatePostForm from "./create-post-form";
import { useToast } from "../ui/toast-provider";

interface UpdatePostProps {
  open: boolean;
  onClose: (open: boolean) => void;
  initialValues: {
    title?: string;
    description: string;
    thumbnail?: string;
    id: number;
  };
}

export default function UpdatePost({ open, onClose, initialValues }: UpdatePostProps) {
  const { showToast } = useToast();

  const handleSuccess = () => {
    onClose(false);
    showToast({
      title: "Post Updated Successfully!",
      description: "Your post has been updated and is now visible to the community.",
      variant: "success",
      duration: 4000,
    });
  };

  return (
    <Modal open={open} onOpenChange={onClose}>
      <div className="p-6 max-h-[75vh] overflow-y-auto no-scrollbar">
        <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
        <CreateOrUpdatePostForm
          initialValues={initialValues}
          onSuccess={handleSuccess}
          mode="edit"
          postId={initialValues.id}
        />
      </div>
    </Modal>
  );
}
