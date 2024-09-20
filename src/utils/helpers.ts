import { isAfter, setHours, setMinutes, setSeconds } from "date-fns";

export function getFakeId(existingIds: number[]) {
  let fakeId = genRandomInt();
  while (existingIds.includes(fakeId)) {
    fakeId = genRandomInt();
  }
  return fakeId;
}

export function genRandomInt() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1;
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

export function isFloat(n: any) {
  return typeof n === "number" && !isNaN(n) && n % 1 !== 0;
}

export function getPlatesFromWeight(n: number) {
  // Given a weight, break down from 45/25/10/5 lb weights
  // 12 = [2x]5 + 2lbs
  let rem = n;

  const platesWeights = [45, 35, 25, 10, 5, 2.5].sort((a, b) => b - a);

  const plates = platesWeights.reduce(
    (obj: { [key: number]: number }, plate) => {
      obj[plate] = 0;
      return obj;
    },
    {},
  );

  platesWeights.forEach((plate) => {
    while (rem >= plate) {
      rem -= plate;
      plates[plate]!++;
    }
  });
  return plates;
}
