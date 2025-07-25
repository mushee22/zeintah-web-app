"use client";

import React from "react";
import Modal from "./modal";
import { Button } from "../ui/button";
import { useToast } from "../ui/toast-provider";
import useDeletePost from "@/hook/use-delete-post";

interface DeletePostProps {
  open: boolean;
  onClose: (open: boolean) => void;
  id: number;
}

export default function DeletePost({ open, onClose, id }: DeletePostProps) {
    
  const { showToast } = useToast();
  const { deletePost, isDeleting } = useDeletePost();

  const handleDelete = async () => {
    try {
      await deletePost(id);
      onClose(false);
      showToast({
        title: "Post Deleted Successfully!",
        description: "Your post has been permanently removed.",
        variant: "success",
        duration: 4000,
      });
    } catch (error) {
      showToast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
      console.error(error);
    }
  };

  return (
    <Modal open={open} onOpenChange={onClose}>
      <div className="p-6 max-w-md">
        <h2 className="text-xl font-semibold mb-4">Delete Post</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this post? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={() => onClose(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
