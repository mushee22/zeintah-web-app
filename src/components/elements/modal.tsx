import React from "react";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { X } from "lucide-react";
import useMobile from "@/hook/use-mobile";
import { DialogProps } from "@radix-ui/react-dialog";

interface Props extends DialogProps {
  title?: "";
  children?: React.ReactNode;
}

export default function Modal({ open, onOpenChange, children }: Props) {
  const { isMobile } = useMobile();

  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTitle className="max-md:hidden"></SheetTitle>
      <SheetContent className="border-white/5 p-4 pt-6 " side="bottom">
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
      <DialogContent className="border-white/30 p-4 ">
        <X
          className="absolute top-2 right-2"
          onClick={() => onOpenChange?.(false)}
        />
        {children}
      </DialogContent>
    </Dialog>
  );
}
