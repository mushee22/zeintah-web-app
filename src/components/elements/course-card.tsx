import React from "react";

import Image, { StaticImageData } from "next/image";
import { LockIcon } from "lucide-react";

interface Props {
  title: string;
  price: number;
  isLocked: boolean;
  image: StaticImageData | string;
}

export default function CourseCard({ title, image, isLocked }: Props) {
  return (
    <div className="rounded-xl group shadow-md overflow-hidden space-y-2 relative border border-white/10 pb-2">
      <div className="flex justify-center aspect-[350/230] max-h-[300px] rounded-ss-2xl rounded-se-2xl overflow-hidden w-full  relative">
        <Image
          src={image}
          alt=""
          className="object-cover hover:scale-110 transition-all duration-300 ease-in-out"
          fill
        />
      </div>
      <div className="pl-2">
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      {
        isLocked && 
      <div className="absolute z-10 inset-0 bg-black/40  hidden group-hover:flex   items-center justify-center ">
        <div className="p-4 bg-black/80 rounded-full">
          {isLocked && <LockIcon className="size-6 text-accent-primary" />}
        </div>
      </div>
      }
    </div>
  );
}
