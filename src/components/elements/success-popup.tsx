"use client";

import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  duration?: number;
  hideTitle?: boolean;
}

export default function SuccessPopup({
  isOpen,
  onClose,
  title = "Success!",
  description = "Your action was completed successfully.",
  duration = 3000,
  hideTitle = false,
}: SuccessPopupProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, duration]);

  const content = (
    <div className="flex flex-col items-center text-center space-y-4 pl-4">
      <div className="flex items-center justify-center  rounded-full">
        <CheckCircle className="w-8 h-8 text-white" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="h-auto  border-white/30 p-6 border-0 bg-gradient-to-r from-foreground/10 to-background/50"
      >
        <SheetTitle className={hideTitle ? "sr-only" : ""}>
          {title}
        </SheetTitle>
        {content}
      </SheetContent>
    </Sheet>
  );
} 