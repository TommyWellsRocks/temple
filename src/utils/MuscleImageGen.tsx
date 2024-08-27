import bodygraphic from "public/content/images/workout/body-graphic.svg";
// const muscles = [
//   "Shoulders",
//   "Biceps",
//   "Calves",
//   "Triceps",
//   "Traps",
//   "Forearms",
//   "Back",
//   "Lower Back",
//   // "Chest",
//   // "Adductors",
//   // "Abductors",
//   // "Quads",
//   // "Abs",
//   // "Glutes",
//   // "Hamstrings",
// ];

import Image from "next/image";

export function MuscleImage({
  primaryMuscle,
  secondaryMuscles,
  widthInPx,
}: {
  primaryMuscle: string | null;
  secondaryMuscles: string[] | null;
  widthInPx: number;
}) {
  return (
    <Image
      alt="Muscle Image"
      src={bodygraphic}
      width={widthInPx}
      className={`w-[${widthInPx}px] rounded-lg border border-primary bg-white p-0.5`}
    ></Image>
  );
}
