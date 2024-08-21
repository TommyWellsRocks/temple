"use client";

import { Minus, Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { clipPathParallelogram } from "~/components/ui/Shapes";
import { handleExerciseVolumeInput } from "~/server/components/workout/ExerciseActions";
import type { DayExercise } from "~/server/types";
import { isFloat } from "~/utils/helpers";
// import { Timer } from "lucide-react";
// import { useEffect, useState } from "react";
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

function InputArea({
  index,
  value,
  changeFunc,
  label,
}: {
  index: number;
  value: number;
  changeFunc: (label: "Reps" | "Weight", index: number, value: number) => void;
  label: "Reps" | "Weight";
}) {
  return (
    <div className="flex items-center gap-x-1">
      <input
        className="w-20 cursor-pointer bg-transparent text-center text-3xl font-bold italic"
        type="number"
        defaultValue={value}
        onFocus={(e) => {
          // Input Actions
          if (e.target.valueAsNumber === 0 || isNaN(e.target.valueAsNumber))
            e.target.value = "";
        }}
        onBlur={(e) => {
          // Input Actions
          let newValue = e.target.valueAsNumber;
          if (newValue < 0 || newValue > 999 || isNaN(newValue)) {
            newValue = 0;
            e.target.value = String(newValue);
          }

          if (isFloat(newValue)) {
            newValue = Number(newValue.toFixed(0));
            e.target.value = String(newValue);
          }

          changeFunc(label, index, newValue);
        }}
      />
      <div className="text-base">{label === "Weight" ? "Pounds" : label}</div>
    </div>
  );
}

function InputRows({
  dayExercise,
  handleInputChangeFunc,
}: {
  dayExercise: DayExercise;
  handleInputChangeFunc: (
    label: "Reps" | "Weight",
    index: number,
    value: number,
  ) => void;
}) {
  if (!dayExercise) return;

  return (
    <div className="flex flex-col gap-y-5 text-2xl font-light text-gray-600">
      {dayExercise.reps.map((repCount, index) => {
        const weightCount = dayExercise.weight[index]!;
        const isLogged = true;
        return (
          <div className="flex flex-col items-end" key={crypto.randomUUID()}>
            {/* <button
        className="flex items-center gap-1 w-24 rounded-t-lg bg-black px-2 py-1 text-base"
        onClick={() => {}}
      >
        <Timer /> <SetTimer />
      </button> */}
            <div className="flex items-center gap-x-2 min-[340px]:gap-x-3">
              <div
                className={`-mr-3 flex h-10 w-10 items-center justify-center font-semibold ${isLogged ? "bg-gray-600 text-gray-900" : "bg-primary text-black"}`}
                style={{
                  clipPath: clipPathParallelogram,
                }}
              >
                {index + 1}
              </div>

              <InputArea
                key={crypto.randomUUID()}
                index={index}
                value={repCount}
                changeFunc={handleInputChangeFunc}
                label="Reps"
              />

              <div className="h-4 rotate-[20deg] border border-gray-800"></div>

              <InputArea
                key={crypto.randomUUID()}
                index={index}
                value={weightCount}
                changeFunc={handleInputChangeFunc}
                label="Weight"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EditSetButton({
  method,
  setDayEx,
}: {
  method: "Add" | "Delete";
  setDayEx: (...args: any) => any;
}) {
  return (
    <button
      className="flex h-11 w-11 items-center justify-center bg-primary"
      style={{
        clipPath: clipPathParallelogram,
      }}
      onClick={() => {
        setDayEx((prevDayEx: DayExercise) => {
          const newDayEx = { ...prevDayEx };
          if (method === "Add") {
            newDayEx.reps?.push(0);
            newDayEx.weight?.push(
              newDayEx.weight[newDayEx.weight?.length - 1] || 0,
            );
          } else {
            newDayEx.reps?.pop();
            newDayEx.weight?.pop();
          }
          return newDayEx;
        });
      }}
    >
      {method === "Add" ? <Plus /> : <Minus />}
    </button>
  );
}

export function SetInputs({ dayExercise }: { dayExercise: DayExercise }) {
  if (!dayExercise) return;

  const [dayEx, setDayEx] = useState(dayExercise);

  function handleInputChange(
    label: "Reps" | "Weight",
    index: number,
    value: number,
  ) {
    setDayEx((prevDayEx) => {
      const newDayEx = { ...prevDayEx };
      if (label === "Reps" && newDayEx.reps[index] !== value) {
        newDayEx.reps[index] = value;
        handleExerciseVolumeInput(newDayEx);
      } else if (label === "Weight" && newDayEx.weight[index] !== value) {
        for (let i = index; i < newDayEx.weight.length; i++) {
          newDayEx.weight[i] = value;
        }
        handleExerciseVolumeInput(newDayEx);
      }
      return newDayEx;
    });
  }

  return (
    <section className="flex flex-col items-center justify-center gap-y-5">
      <InputRows
        dayExercise={dayEx}
        handleInputChangeFunc={handleInputChange}
      />

      <div className="mb-10 flex gap-x-10">
        <EditSetButton method="Add" setDayEx={setDayEx} />
        <EditSetButton method="Delete" setDayEx={setDayEx} />
      </div>
    </section>
  );
}
