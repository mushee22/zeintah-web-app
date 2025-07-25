import Image from "next/image";
import React from "react";

export default function ProfileAvatar({
  imageUrl,
  alt,
}: {
  imageUrl: string;
  alt: string;
}) {
  return (
    <div className="aspect-[92/86] flex-1 bg-[#D9D9D9] rounded-xl overflow-hidden relative">
      <Image
        src={imageUrl}
        alt={alt ?? "profile"}
        fill
        className="object-cover object-top"
      />
    </div>
  );
}
