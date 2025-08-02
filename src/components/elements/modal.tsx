import React from "react";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { X } from "lucide-react";
import useMobile from "@/hook/use-mobile";
import { DialogProps } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface Props extends DialogProps {
  title?: "";
  children?: React.ReactNode;
  className?: string;
}

export default function Modal({ open, onOpenChange, children, className }: Props) {
  const { isMobile } = useMobile();

  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTitle className="max-md:hidden"></SheetTitle>
      <SheetContent className={cn("border-white/5 p-4 pt-6 ", className)} side="bottom">
        <X
          className="absolute top-2 right-2"
          onClick={() => onOpenChange?.(false)}
        />
        {children}
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle></DialogTitle>
      <DialogContent className={cn("border-white/30 p-4 ", className)}>
        <X
          className="absolute top-2 right-2"
          onClick={() => onOpenChange?.(false)}
        />
        {children}
      </DialogContent>
    </Dialog>
  );
}
