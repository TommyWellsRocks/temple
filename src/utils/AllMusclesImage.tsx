"use client";

import Image from "next/image";
import Base from "public/content/images/workout/muscles/Base.svg";
import Abductors from "public/content/images/workout/muscles/Abductors.svg";
import Adductors from "public/content/images/workout/muscles/Adductors.svg";
import Back from "public/content/images/workout/muscles/Back.svg";
import Biceps from "public/content/images/workout/muscles/Biceps.svg";
import Calves from "public/content/images/workout/muscles/Calves.svg";
import Chest from "public/content/images/workout/muscles/Chest.svg";
import Forearms from "public/content/images/workout/muscles/Forearms.svg";
import Glutes from "public/content/images/workout/muscles/Glutes.svg";
import Hamstrings from "public/content/images/workout/muscles/Hamstrings.svg";
import LowerAbs from "public/content/images/workout/muscles/Lower Abs.svg";
import LowerBack from "public/content/images/workout/muscles/Lower Back.svg";
import Neck from "public/content/images/workout/muscles/Neck.svg";
import Obliques from "public/content/images/workout/muscles/Obliques.svg";
import Quads from "public/content/images/workout/muscles/Quads.svg";
import Shoulders from "public/content/images/workout/muscles/Shoulders.svg";
import Traps from "public/content/images/workout/muscles/Traps.svg";
import Triceps from "public/content/images/workout/muscles/Triceps.svg";
import UpperAbs from "public/content/images/workout/muscles/Upper Abs.svg";
import Abs from "public/content/images/workout/muscles/Abs.svg";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";

export const muscles: { [key: string]: StaticImport } = {
  Abs,
  Abductors,
  Adductors,
  Back,
  Biceps,
  Calves,
  Chest,
  Forearms,
  Glutes,
  Hamstrings,
  LowerAbs,
  LowerBack,
  Neck,
  Obliques,
  Quads,
  Shoulders,
  Traps,
  Triceps,
  UpperAbs,
};

// For now, abs category is Obliques, Lower and Upper Abs

export function ExerciseMuscleImage({
  primaryMuscle,
  secondaryMuscles,
  widthInPx,
}: {
  primaryMuscle: string | null;
  secondaryMuscles: string[] | null;
  widthInPx: number;
}) {
  if (!primaryMuscle)
    return (
      <Image
        alt="Muscle Image"
        src={Base}
        width={widthInPx}
        className={`rounded-lg border border-primary bg-black p-0.5`}
      />
    );
  return (
    <div className="relative">
      <Image
        alt="Muscle Image"
        src={Base}
        width={widthInPx}
        className={`rounded-lg border border-primary bg-black p-0.5`}
      />
      <Image
        alt="Primary Muscle"
        src={muscles[primaryMuscle]!}
        className={`absolute top-0 rounded-lg p-0.5 `}
        style={{
          filter: "invert(50%) sepia(100%) saturate(1000%) hue-rotate(290deg)",
        }}
      />
      {secondaryMuscles?.map((secondary) => {
        return (
          <Image
            key={secondary}
            alt="Secondary Muscle"
            src={muscles[secondary]!}
            className={`absolute top-0 rounded-lg p-0.5`}
            style={{
              filter:
                "invert(50%) sepia(100%) saturate(1000%) hue-rotate(130deg)",
            }}
          />
        );
      })}
    </div>
  );
}
