"use client";

import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { Sheet, SheetContent } from "../ui/sheet";

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  duration?: number;
}

export default function SuccessPopup({
  isOpen,
  onClose,
  title = "Success!",
  description = "Your action was completed successfully.",
  duration = 3000,
}: SuccessPopupProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, duration]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="h-auto max-h-[200px] border-white/30 p-6"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 