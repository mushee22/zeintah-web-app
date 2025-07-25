"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  showAction?: boolean;
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  showAction = true,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {Icon && (
        <div className="w-20 h-20 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-full flex items-center justify-center mb-6">
          <Icon className="w-10 h-10 text-accent-primary" />
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      
      <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
        {description}
      </p>
      
      {showAction && actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-gradient-to-r from-accent-primary to-accent-secondary text-black font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
} 