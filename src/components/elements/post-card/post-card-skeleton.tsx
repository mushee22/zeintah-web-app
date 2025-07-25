import React from "react";

export default function PostCardSkeleton() {
  return (
    <div className="post-card-bg border border-white/10 rounded-xl animate-pulse">
      <div className="flex items-center gap-x-3 p-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
        <div className="space-y-2">
          <div className="w-24 h-3 bg-gray-300 rounded" />
          <div className="w-16 h-2 bg-gray-300 rounded" />
        </div>
      </div>
      <div className="w-full h-[350px] bg-gray-300 rounded" />
      <div className="py-4 px-4 space-y-3">
        <div className="w-3/4 h-3 bg-gray-300 rounded" />
        <div className="w-full h-3 bg-gray-300 rounded" />
        <div className="w-1/3 h-2 bg-gray-300 rounded" />
      </div>
      <div className="px-4 pb-4">
        <div className="w-5 h-5 bg-gray-300 rounded ml-auto" />
      </div>
    </div>
  );
} 