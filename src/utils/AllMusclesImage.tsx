"use client";

import Image from "next/image";
import Base from "public/content/images/workout/muscles/Base.png";
import Abductors from "public/content/images/workout/muscles/Abductors.png";
import Adductors from "public/content/images/workout/muscles/Adductors.png";
import Back from "public/content/images/workout/muscles/Back.png";
import Biceps from "public/content/images/workout/muscles/Biceps.png";
import Calves from "public/content/images/workout/muscles/Calves.png";
import Chest from "public/content/images/workout/muscles/Chest.png";
import Forearms from "public/content/images/workout/muscles/Forearms.png";
import Glutes from "public/content/images/workout/muscles/Glutes.png";
import Hamstrings from "public/content/images/workout/muscles/Hamstrings.png";
import LowerAbs from "public/content/images/workout/muscles/Lower Abs.png";
import LowerBack from "public/content/images/workout/muscles/Lower Back.png";
import Neck from "public/content/images/workout/muscles/Neck.png";
import Obliques from "public/content/images/workout/muscles/Obliques.png";
import Quads from "public/content/images/workout/muscles/Quads.png";
import Shoulders from "public/content/images/workout/muscles/Shoulders.png";
import Traps from "public/content/images/workout/muscles/Traps.png";
import Triceps from "public/content/images/workout/muscles/Triceps.png";
import UpperAbs from "public/content/images/workout/muscles/Upper Abs.png";
import Abs from "public/content/images/workout/muscles/Abs.png";
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
  "Lower Abs": LowerAbs,
  "Lower Back": LowerBack,
  Neck,
  Obliques,
  Quads,
  Shoulders,
  Traps,
  Triceps,
  "Upper Abs": UpperAbs,
};

// For now, abs category is Obliques, Lower and Upper Abs

export function FullMusclesImage({
  primaryMuscle,
  secondaryMuscles,
}: {
  primaryMuscle: string | null;
  secondaryMuscles: string[] | null;
}) {
  if (!primaryMuscle)
    return (
      <Image
        alt="Muscle Image"
        src={Base}
        className={`rounded-lg border border-primary bg-black p-0.5`}
      />
    );
  return (
    <div className="relative">
      <Image
        alt="Muscle Image"
        src={Base}
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
