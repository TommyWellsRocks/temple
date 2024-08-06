"use client";

import { Minus, Plus } from "lucide-react";
import { clipPathHexagon } from "~/components/ui/Hexagon";
import { handleEditSetCount } from "~/server/components/workout/ExerciseActions";
import { handleExerciseVolumeInput } from "~/server/components/workout/ExerciseActions";
import { isFloat } from "~/utils/helpers";

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
        className="w-20 cursor-pointer bg-transparent text-center text-3xl font-bold italic"
        type="number"
        defaultValue={defaultValue}
        onFocus={(e) => {
          // Input Actions
          if (e.target.valueAsNumber === 0 || isNaN(e.target.valueAsNumber))
            e.target.value = "";
        }}
        onBlur={(e) => {
          // Input Actions
          let newValue = e.target.valueAsNumber;
          if (newValue < 0 || newValue >= 1000 || isNaN(newValue)) {
            newValue = 0;
            e.target.value = String(newValue);
          }

          if (isFloat(newValue)) {
            newValue = Number(newValue.toFixed(0));
            e.target.value = String(newValue);
          }

          if (label === "Reps" && dayExercise.reps[index] !== newValue) {
            dayExercise.reps[index] = newValue;
            handleExerciseVolumeInput(dayExercise);
          } else if (
            label === "Weight" &&
            dayExercise.weight[index] !== newValue
          ) {
            dayExercise.weight[index] = newValue;
            handleExerciseVolumeInput(dayExercise);
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
    <div className="flex items-center gap-x-2 min-[340px]:gap-x-3">
      <div
        className={`-mr-3 flex h-10 w-10 items-center justify-center font-semibold ${weightValue && repValue ? "bg-gray-600 text-gray-900" : "bg-primary text-black"}`}
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
