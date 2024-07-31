"use client";

import { handleExerciseVolumeInput } from "~/components/workout/ServerComponents/DayExercise";

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
    "flex h-11 w-11 items-center justify-center bg-gray-600 font-semibold text-gray-900";
  const countBoxClassFocus =
    "flex h-11 w-11 items-center justify-center bg-primary font-semibold text-black";

  return dayExercise!.reps.map((repValue, index) => {
    const weightValue = dayExercise.weight[index];
    return (
      <div className="flex items-center gap-x-3 text-2xl font-light text-gray-600">
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
          className="w-12 cursor-pointer bg-transparent text-center"
          type="number"
          defaultValue={repValue}
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

            if (dayExercise!.reps[index] !== newValue) {
              dayExercise.reps[index] = newValue;
              handleExerciseVolumeInput(dayExercise);
            }
          }}
        />
        <div className="text-xl">Reps</div>
        <div className="h-9 rotate-12 border border-gray-600"></div>
        <input
          className="w-16 cursor-pointer bg-transparent text-center"
          type="number"
          defaultValue={weightValue}
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

            if (dayExercise!.weight[index] !== newValue) {
              // Set To Remaining Weights
              for (let i = index; i < dayExercise.weight.length; i++) {
                dayExercise.weight[i] = newValue;
              }
              handleExerciseVolumeInput(dayExercise);
            }
          }}
        />
        <div className="text-xl">Pounds</div>
      </div>
    );
  });
}
