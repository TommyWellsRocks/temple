import { isAfter, setHours, setMinutes, setSeconds } from "date-fns";

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

export function isFloat(n: any) {
  return typeof n === "number" && !isNaN(n) && n % 1 !== 0;
}
