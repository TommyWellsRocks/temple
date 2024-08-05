"use client"

import { Minus, Plus } from "lucide-react";
import { clipPathHexagon } from "~/components/ui/Hexagon";
import { handleEditSetCount } from "~/server/components/workout/ExerciseActions";
import { handleExerciseVolumeInput } from "~/server/components/workout/ExerciseActions";

const countBoxClassDefault =
  "flex h-10 w-10 items-center justify-center bg-gray-600 font-semibold text-gray-900 -mr-3";
const countBoxClassFocus =
  "flex h-10 w-10 items-center justify-center bg-primary font-semibold text-black -mr-3";

function InputArea({
  label,
  defaultValue,
  dayExercise,
  index,
}: {
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
        className="w-16 cursor-pointer bg-transparent text-center text-3xl font-bold italic"
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

function InputRow({
  index,
  repValue,
  dayExercise,
}: {
  index: number;
  repValue: number;
  dayExercise: {
    id: number;
    programId: number;
    dayId: number;
    userId: string;
    reps: number[];
    weight: number[];
  };
}) {
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
        dayExercise={dayExercise}
        index={index}
        label="Reps"
        defaultValue={repValue}
      />

      <div className="h-4 rotate-[20deg] border border-gray-800"></div>

      <InputArea
        dayExercise={dayExercise}
        index={index}
        label="Weight"
        defaultValue={weightValue!}
      />
    </div>
  );
}

function InputRows({
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
  return (
    <div className="flex flex-col gap-y-5 text-2xl font-light text-gray-600">
      {dayExercise!.reps.map((repValue, index) => (
        <InputRow index={index} repValue={repValue} dayExercise={dayExercise} />
      ))}
    </div>
  );
}

function EditSetButton({
  method,
  dayExercise,
}: {
  method: "Add" | "Delete";
  dayExercise: {
    id: number;
    userId: string;
    programId: number;
    dayId: number;
    reps: number[];
    weight: number[];
  };
}) {
  return (
    <button
      className="flex h-11 w-11 items-center justify-center bg-primary"
      style={{
        clipPath: clipPathHexagon,
      }}
      onClick={() => {
        let repValues = dayExercise!.reps;
        let weightValues = dayExercise!.weight;

        if (method === "Add") {
          repValues.push(0);
          weightValues.push(weightValues[weightValues.length - 1]!);
        } else {
          repValues.pop();
          weightValues.pop();
        }

        handleEditSetCount(dayExercise!, repValues, weightValues);
      }}
    >
      {method === "Add" ? <Plus /> : <Minus />}
    </button>
  );
}

function EditSetsButtons({
  dayExercise,
}: {
  dayExercise: {
    id: number;
    userId: string;
    programId: number;
    dayId: number;
    reps: number[];
    weight: number[];
  };
}) {
  return (
    <div className="mb-10 flex gap-x-10">
      <EditSetButton method="Add" dayExercise={dayExercise} />
      <EditSetButton method="Delete" dayExercise={dayExercise} />
    </div>
  );
}

export function SetInputs({
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
  return (
    <section className="flex flex-col items-center justify-center gap-y-5">
      <InputRows dayExercise={dayExercise} />
      <EditSetsButtons dayExercise={dayExercise} />
    </section>
  );
}
