import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getFirstNameAndLastName(name: string) {
  const [firstName, ...rest] = name.split(" ")
  return { firstName, lastName: rest?.join(" ") ?? '' }
}

export function secondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  const durationText = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  return { minutes, remainingSeconds, durationText }
}
