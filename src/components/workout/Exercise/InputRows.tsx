"use client";

import { handleExerciseVolumeInput } from "~/components/workout/ServerComponents/DayExercise";
import { DayExercise } from "~/server/types";

export function InputRows({
  userId,
  dayExercise,
}: {
  userId: string;
  dayExercise: DayExercise;
}) {
  const countBoxClassDefault =
    "flex h-11 w-11 items-center justify-center bg-gray-600 font-semibold text-gray-900";
  const countBoxClassFocus =
    "flex h-11 w-11 items-center justify-center bg-primary font-semibold text-black";

  return dayExercise!.reps.map((repCount, index) => {
    return (
      <div
        className="flex items-center gap-x-3 text-2xl font-light text-gray-600"
        key={index}
      >
        <div
          className={countBoxClassDefault}
          style={{
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        >
          {index + 1}
        </div>
        <input
          className="w-12 cursor-pointer text-center"
          type="number"
          defaultValue={repCount}
          onFocus={(e) => {
            const countBox = e.currentTarget.parentNode!.firstElementChild!;
            countBox.className = countBoxClassFocus;
          }}
          onBlur={(e) => {
            const countBox = e.currentTarget.parentNode!.firstElementChild!;
            countBox.className = countBoxClassDefault;

            let newValue = e.target.valueAsNumber;
            if (newValue < 0) {
              newValue = 0;
              e.target.value = "0";
            }
            const values = dayExercise!.reps;
            const currentTargetValue = values[index];

            if (currentTargetValue !== newValue) {
              values[index] = newValue;
              handleExerciseVolumeInput(userId, dayExercise, "Reps", values);
            }
          }}
        />
        <div className="text-xl">Reps</div>
        <div className="h-9 rotate-12 border border-gray-600"></div>
        <input
          className="w-16 cursor-pointer text-center"
          type="number"
          defaultValue={dayExercise!.weight[index]}
          onFocus={(e) => {
            const countBox = e.currentTarget.parentNode!.firstElementChild!;
            countBox.className = countBoxClassFocus;
          }}
          onBlur={(e) => {
            const countBox = e.currentTarget.parentNode!.firstElementChild!;
            countBox.className = countBoxClassDefault;

            let newValue = e.target.valueAsNumber;
            if (newValue < 0) {
              newValue = 0;
              e.target.value = "0";
            }
            const values = dayExercise!.weight;
            const currentTargetValue = values[index];

            if (currentTargetValue !== newValue) {
              values[index] = newValue;
              handleExerciseVolumeInput(userId, dayExercise, "Weight", values);
            }
          }}
        />
        <div className="text-xl">Pounds</div>
      </div>
    );
  });
}
