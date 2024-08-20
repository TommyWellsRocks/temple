"use client";

import { Minus, Plus } from "lucide-react";
// import { Timer } from "lucide-react";
// import { useEffect, useState } from "react";
import { clipPathParallelogram } from "~/components/ui/Shapes";
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
            for (let i = index; i < dayExercise.weight.length; i++) {
              dayExercise.weight[i] = newValue;
            }
            handleExerciseVolumeInput(dayExercise);
          }
        }}
      />
      <div className="text-base">{label === "Weight" ? "Pounds" : label}</div>
    </div>
  );
}

// function SetTimer() {
//   const [timerSeconds, setTimerSeconds] = useState<number>(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimerSeconds((prevTimerSeconds) => prevTimerSeconds + 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const minutes = Math.floor(timerSeconds / 60);
//   const seconds = timerSeconds % 60;

//   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
//   const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

//   return (
//     <span>
//       {formattedMinutes}:{formattedSeconds}
//     </span>
//   );
// }

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
    <div className="flex flex-col items-end">
      {/* <button
        className="flex items-center gap-1 w-24 rounded-t-lg bg-black px-2 py-1 text-base"
        onClick={() => {}}
      >
        <Timer /> <SetTimer />
      </button> */}
      <div className="flex items-center gap-x-2 min-[340px]:gap-x-3">
        <div
          className={`-mr-3 flex h-10 w-10 items-center justify-center font-semibold ${repValue ? "bg-gray-600 text-gray-900" : "bg-primary text-black"}`}
          style={{
            clipPath: clipPathParallelogram,
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
      {dayExercise.reps.map((repValue, index) => (
        <InputRow
          key={index}
          index={index}
          repValue={repValue}
          dayExercise={dayExercise}
        />
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
        clipPath: clipPathParallelogram,
      }}
      onClick={() => {
        const repValues = dayExercise.reps;
        const weightValues = dayExercise.weight;

        if (method === "Add") {
          repValues.push(0);
          weightValues.push(weightValues[weightValues.length - 1]!);
        } else {
          repValues.pop();
          weightValues.pop();
        }

        handleEditSetCount(dayExercise, repValues, weightValues);
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
