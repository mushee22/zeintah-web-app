import React from "react";

import Image, { StaticImageData } from "next/image";
import { LockIcon, PlayIcon, ClockIcon, Check } from "lucide-react"
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  isLocked: boolean;
  isNeedToLogin: boolean;
  image: StaticImageData | string;
  totalDuration?: string;
  videoCount?: number;
  completedVideos?: number;
}

export default function CourseCard({
  title,
  image,
  isLocked,
  isNeedToLogin,
  totalDuration = "0h 0m",
  videoCount = 0,
  completedVideos = 0,
}: Props) {
  // Calculate progress percentage
  const calculateProgress = () => {
    if (!completedVideos || !videoCount) return 0;
    return Math.min((completedVideos / videoCount) * 100, 100);
  };

  const router = useRouter();

  const handleLogin = () => {
    if (!isNeedToLogin) return;
    router.push('/sign-in');
  }

  const progress = calculateProgress();
  const isFullyCompleted = completedVideos === videoCount;
  const hasProgress = completedVideos && completedVideos > 0;

  return (
    <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-secondary-500/50 to-secondary-100/30 border border-white/10 hover:border-accent-primary/30 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-accent-primary/10 hover:-translate-y-1">
      <div className="relative h-[160px] sm:h-[180px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {isLocked && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 lg:hidden">
            <div className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-500 to-red-600 text-white">
              Locked
            </div>
          </div>
        )}
        {!isLocked && hasProgress ? (
          isFullyCompleted ? (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-green-500 rounded-full text-white">
              <div className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium flex gap-x-1 items-center">
                <Check size={14} strokeWidth={2.5} />
                Completed
              </div>
            </div>
          ) : (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/60 rounded-full text-white">
              <div className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium ">
                {Math.round(progress)} %Completed
              </div>
            </div>
          )
        ) : (
          <></>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-gradient-to-r from-accent-primary to-accent-secondary p-2 sm:p-3 rounded-full shadow-lg">
            <PlayIcon className="w-4 h-4 sm:w-5 sm:h-5 text-background" />
          </div>
        </div>
      </div>
      <div className="py-2 px-3 sm:py-3 sm:px-4 space-y-1.5">
        <h3 className="text-xs sm:text-sm font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-accent-primary transition-colors duration-200">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          {
            totalDuration ?
              <div className="flex items-center gap-1 text-xs text-muted">
                <ClockIcon className="w-3 h-3" />
                <span className="text-xs">{totalDuration}</span>
              </div>
              :
              null
          }
          {
            videoCount ?
              <div className="flex items-center gap-1 text-xs text-muted">
                {/* <VideoIcon className="w-3 h-3" /> */}
                <span className="text-xs">{videoCount} videos</span>
              </div>
              :
              null
          }
        </div>
      </div>
      {isLocked && (
        <div onClick={handleLogin} className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-gradient-to-r from-accent-primary to-accent-secondary p-3 sm:p-4 rounded-full shadow-xl">
            <LockIcon className="w-5 h-5 sm:w-6 sm:h-6 text-background" />
          </div>
        </div>
      )}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-primary/20 via-transparent to-accent-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}


export function CourseSkeleton() {
  return (
    <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden  border border-white/10">
      <div className="relative h-[160px] sm:h-[180px] overflow-hidden">
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      </div>
      <div className="py-2 px-3 sm:py-3 sm:px-4 space-y-1.5">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-200 rounded animate-pulse" />
            <div className="w-12 h-3 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}