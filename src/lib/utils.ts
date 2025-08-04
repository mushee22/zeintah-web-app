import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstNameAndLastName(name: string) {
  const [firstName, ...rest] = name.split(" ");
  return { firstName, lastName: rest?.join(" ") ?? "" };
}

export function secondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const durationText = `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
  return { minutes, remainingSeconds, durationText };
}

export function secondsToHoursAndMinutes(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const remainingMinutes = Math.floor((seconds % 3600) / 60);
  const durationText = `${hours}h ${remainingMinutes}m`;
  return { hours, remainingMinutes, durationText };
}

export function timeAgo(date: string) {
  const now = new Date();
  const inpuDate = new Date(date);

  const diffInMs = now.getTime() - inpuDate.getTime();

  if (diffInMs < 0) {
    return "Just Now";
  }

  const diffSeconds = Math.floor(diffInMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
    return "just now";
  }

  if (diffMinutes < 60) {
    return diffMinutes === 1 ? "1 minute ago" : `${diffMinutes} minutes ago`;
  }

  if (diffHours < 24) {
    return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
  }

  if (diffDays < 7) {
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  }

  if (diffWeeks < 4) {
    return diffWeeks === 1 ? "1 week ago" : `${diffWeeks} weeks ago`;
  }

  if (diffMonths < 12) {
    return diffMonths === 1 ? "1 month ago" : `${diffMonths} months ago`;
  }

  return diffYears === 1 ? "1 year ago" : `${diffYears} years ago`;
}
