import { useState } from "react";

export default function usePostAction() {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  return {
    editOpen,
    deleteConfirm,
    setEditOpen,
    setDeleteConfirm,
  };
} 