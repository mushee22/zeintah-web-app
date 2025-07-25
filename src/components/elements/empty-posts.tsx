"use client";

import React from "react";
import { FileText, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface EmptyPostsProps {
  onCreatePost?: () => void;
  title?: string;
  description?: string;
  showCreateButton?: boolean;
}

export default function EmptyPosts({
  onCreatePost,
  title = "No posts yet",
  description = "Be the first to share your thoughts and ideas with the community.",
  showCreateButton = true,
}: EmptyPostsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-full flex items-center justify-center mb-6">
        <FileText className="w-12 h-12 text-accent-primary" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      
      <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
        {description}
      </p>
      
      {showCreateButton && onCreatePost && (
        <Button
          onClick={onCreatePost}
          className="bg-gradient-to-r from-accent-primary to-accent-secondary text-black font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Your First Post
        </Button>
      )}
      
    </div>
  );
} 