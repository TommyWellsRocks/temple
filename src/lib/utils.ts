import { type ClassValue, clsx } from "clsx";
import { isAfter, setHours, setMinutes, setSeconds } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitleCase(string: string) {
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function isAfter7PM(date: Date) {
  const sevenPM = setSeconds(setMinutes(setHours(new Date(), 19), 0), 0);
  return isAfter(date, sevenPM);
}
