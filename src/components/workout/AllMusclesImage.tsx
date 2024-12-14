"use client";

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
      <img
        alt="Muscle Image"
        src={"/content/images/workout/muscles/Base.png"}
        className={`rounded-lg border border-primary bg-black p-0.5`}
        loading="lazy"
      />
      {primaryMuscle ? (
        <img
          alt="Primary Muscle"
          src={musclesToImage[primaryMuscle]}
          className={`absolute top-0 rounded-lg p-0.5 `}
          loading="lazy"
          style={{
            filter:
              "invert(50%) sepia(100%) saturate(1000%) hue-rotate(290deg)",
          }}
        />
      ) : null}
      {secondaryMuscles?.map((secondary) => {
        return (
          <img
            key={secondary}
            alt="Secondary Muscle"
            src={musclesToImage[secondary]}
            loading="lazy"
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
