import { getImageURL } from "@/lib/fetch";
import Image from "next/image";
import React from "react";
import { PostImageProps } from "./types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export default function PostImage({
  image,
  alt,
  image_height = 1,
  image_width = 1,
}: PostImageProps) {
  if (!image) return <></>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="w-full bg-gray-100 relative cursor-pointer hover:opacity-90 max-w-full transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
          style={{
            aspectRatio: image_height ? image_width / image_height : 1,
          }}
        >
          <Image
            src={getImageURL(image)}
            alt={alt}
            fill
            className="object-cover  transition-transform duration-300 ease-in-out"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw]  max-h-[90vh] p-0 bg-transparent border-none shadow-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-90 data-[state=open]:zoom-in-90 data-[state=closed]:slide-out-to-center-2 data-[state=open]:slide-in-from-center-2 duration-500 ease-out">
        <DialogTitle className="sr-only">{alt || "Image preview"}</DialogTitle>
        <div className="relative  flex items-center justify-center">
          <div className="relative max-w-full max-h-full animate-in zoom-in-95 duration-500 ease-out delay-100">
            <Image
              src={getImageURL(image)}
              alt={alt}
              width={image_width || 800}
              height={image_height || 600}
              className="object-contain max-w-full max-h-[80vh] rounded-lg shadow-2xl transition-all duration-500 ease-out"
              priority
            />
            <DialogClose className="absolute top-4 right-4 bg-white/10 rounded-full p-2 cursor-pointer">
              <X className="w-4 h-4" />
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
