"use client";

import Image from "next/image";
import Base from "public/content/images/workout/muscles/Base.png";
import { musclesToImage, type TitleCaseMuscle } from "doNotChangeMe";

// For now, abs category is Obliques, Lower and Upper Abs

export function FullMusclesImage({
  primaryMuscle,
  secondaryMuscles,
}: {
  primaryMuscle: TitleCaseMuscle | null;
  secondaryMuscles: TitleCaseMuscle[] | null;
}) {
  return (
    <div className="relative">
      <Image
        alt="Muscle Image"
        src={Base}
        className={`rounded-lg border border-primary bg-black p-0.5`}
      />
      {primaryMuscle ? (
        <Image
          alt="Primary Muscle"
          src={musclesToImage[primaryMuscle]}
          className={`absolute top-0 rounded-lg p-0.5 `}
          style={{
            filter:
              "invert(50%) sepia(100%) saturate(1000%) hue-rotate(290deg)",
          }}
        />
      ) : null}
      {secondaryMuscles?.map((secondary) => {
        return (
          <Image
            key={secondary}
            alt="Secondary Muscle"
            src={musclesToImage[secondary]}
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
