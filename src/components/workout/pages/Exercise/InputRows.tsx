"use client";

import { handleExerciseVolumeInput } from "~/components/workout/ServerComponents/DayExercise";
import { clipPathHexagon } from "./Hexagon";

function InputArea({
  countBoxClassDefault,
  countBoxClassFocus,
  label,
  defaultValue,
  dayExercise,
  index,
}: {
  countBoxClassDefault: string;
  countBoxClassFocus: string;
  dayExercise: {
    id: number;
    programId: number;
    dayId: number;
    userId: string;
    reps: number[];
    weight: number[];
  };
  index: number;
  label: "Reps" | "Weight";
  defaultValue: number;
}) {
  return (
    <div className="flex items-center gap-x-1">
      <input
        className="w-16 cursor-pointer bg-transparent text-center font-bold italic text-3xl"
        type="number"
        defaultValue={defaultValue}
        onFocus={(e) => {
          const countBox =
            e.currentTarget.parentNode!.parentNode!.firstElementChild!;
          countBox.className = countBoxClassFocus;
        }}
        onBlur={(e) => {
          const countBox =
            e.currentTarget.parentNode!.parentNode!.firstElementChild!;
          countBox.className = countBoxClassDefault;

          let newValue = e.target.valueAsNumber;
          if (newValue < 0 || isNaN(newValue)) {
            newValue = 0;
            e.target.value = "0";
          }

          if (label === "Reps") {
            if (dayExercise!.reps[index] !== newValue) {
              dayExercise.reps[index] = newValue;
              handleExerciseVolumeInput(dayExercise);
            }
          } else if (label === "Weight") {
            if (dayExercise!.weight[index] !== newValue) {
              // Set To Remaining Weights
              for (let i = index; i < dayExercise.weight.length; i++) {
                dayExercise.weight[i] = newValue;
              }
              handleExerciseVolumeInput(dayExercise);
            }
          }
        }}
      />
      <div className="text-base">{label === "Weight" ? "Pounds" : label}</div>
    </div>
  );
}

export function InputRows({
  dayExercise,
}: {
  dayExercise: {
    id: number;
    programId: number;
    dayId: number;
    userId: string;
    reps: number[];
    weight: number[];
  };
}) {
  const countBoxClassDefault =
    "flex h-10 w-10 items-center justify-center bg-gray-600 font-semibold text-gray-900 -mr-3";
  const countBoxClassFocus =
    "flex h-10 w-10 items-center justify-center bg-primary font-semibold text-black -mr-3";

  return (
    <div className="flex flex-col gap-y-5 text-2xl font-light text-gray-600">
      {dayExercise!.reps.map((repValue, index) => {
        const weightValue = dayExercise.weight[index];
        return (
          <div className="flex items-center gap-x-3">
            <div
              className={countBoxClassDefault}
              style={{
                clipPath: clipPathHexagon,
              }}
            >
              {index + 1}
            </div>

            <InputArea
              countBoxClassDefault={countBoxClassDefault}
              countBoxClassFocus={countBoxClassFocus}
              dayExercise={dayExercise}
              index={index}
              label="Reps"
              defaultValue={repValue}
            />

            <div className="h-4 rotate-[20deg] border border-gray-800"></div>

            <InputArea
              countBoxClassDefault={countBoxClassDefault}
              countBoxClassFocus={countBoxClassFocus}
              dayExercise={dayExercise}
              index={index}
              label="Weight"
              defaultValue={weightValue!}
            />
          </div>
        );
      })}
    </div>
  );
}
