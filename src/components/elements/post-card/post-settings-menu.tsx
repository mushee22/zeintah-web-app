import React from "react";
import { PencilIcon, Trash } from "lucide-react";
import { PostSettingsMenuProps } from "./types";

export default function PostSettingsMenu({
  onEdit,
  onDelete,
}: PostSettingsMenuProps) {
  return (
    <div className="flex gap-x-2">
      <PencilIcon onClick={onEdit} className="w-4 h-4 text-accent-primary" />
      <Trash onClick={onDelete} className="w-4 h-4 text-accent-secondary" />
    </div>
  );
} 