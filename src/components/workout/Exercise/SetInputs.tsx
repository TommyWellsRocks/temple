"use client";

import { Minus, Plus } from "lucide-react";
import { clipPathParallelogram } from "~/components/ui/Shapes";
import { useActiveInputs } from "~/context/ActiveExerciseInputContext";
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
    <input
      id={`${crypto.randomUUID()}-${label}`}
      className={`${label === "Reps" ? "w-[3ch]" : "w-[4ch]"} cursor-pointer bg-transparent text-center text-3xl font-bold italic focus:outline-none`}
      type="number"
      inputMode="numeric"
      defaultValue={value}
      onInput={(e) => {
        if (isNaN(e.currentTarget.valueAsNumber)) e.currentTarget.value = "0";
        else if (label === "Reps" && e.currentTarget.valueAsNumber >= 2) {
          e.currentTarget.blur();
        } else if (label === "Weight" && e.currentTarget.value.length > 2)
          e.currentTarget.blur();
      }}
      onFocus={(e) => {
        e.target.select();
      }}
      onBlur={(e) => {
        // Input Actions
        let newValue = e.target.valueAsNumber;
        if (
          newValue < 0 ||
          newValue > 999 ||
          isNaN(newValue) ||
          (label === "Reps" && newValue > 20)
        ) {
          newValue = 0;
          e.target.value = String(newValue);
        }

        if (isFloat(newValue)) {
          newValue = Number(newValue.toFixed(0));
          e.target.value = String(newValue);
        }

        // Update State
        changeFunc(label, index, newValue);
      }}
    />
  );
}

function InputRows({
  handleInputChangeFunc,
}: {
  handleInputChangeFunc: (
    label: "Reps" | "Weight",
    index: number,
    value: number,
  ) => void;
}) {
  const { dayEx } = useActiveInputs()!;
  if (!dayEx) return;

  return (
    <div className="flex flex-col gap-y-5 text-2xl font-light text-gray-600">
      {dayEx.reps.map((repCount, index) => {
        const weightCount = dayEx.weight[index]!;
        const isLogged = dayEx.loggedSetsCount > index;
        const isActiveSet = index === dayEx.loggedSetsCount;
        return (
          <div className="flex flex-col items-end" key={crypto.randomUUID()}>
            {/* <button
        className="flex items-center gap-1 w-24 rounded-t-lg bg-black px-2 py-1 text-base"
        onClick={() => {}}
      >
        <Timer /> <SetTimer />
      </button> */}
            <div
              className={`flex items-center gap-x-2 min-[340px]:gap-x-3 ${isActiveSet ? "text-gray-200" : null}`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center font-semibold ${isLogged ? "bg-gray-600 text-gray-900" : "bg-primary text-black"}`}
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
              <span className="text-base">Reps</span>

              <div className="h-4 rotate-[20deg] border border-gray-800"></div>

              <InputArea
                key={crypto.randomUUID()}
                index={index}
                value={weightCount}
                changeFunc={handleInputChangeFunc}
                label="Weight"
              />
              <span className="text-base">Pounds</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EditSetButton({ method }: { method: "Add" | "Delete" }) {
  const { dayEx, setDayEx } = useActiveInputs()!;
  if (!dayEx) return;

  return (
    <button
      className="flex h-11 w-11 items-center justify-center bg-primary"
      style={{
        clipPath: clipPathParallelogram,
      }}
      onClick={() => {
        setDayEx((prevDayEx: DayExercise) => {
          if (!prevDayEx) return;
          const newDayEx = { ...prevDayEx };
          if (method === "Add") {
            newDayEx.reps.push(0);
            newDayEx.weight.push(
              newDayEx.weight[newDayEx.weight.length - 1] || 0,
            );
          } else {
            newDayEx.reps.pop();
            newDayEx.weight.pop();
            if (prevDayEx.loggedSetsCount > prevDayEx.reps.length) {
              newDayEx.loggedSetsCount--;
            }
          }
          return newDayEx;
        });
      }}
    >
      {method === "Add" ? <Plus /> : <Minus />}
    </button>
  );
}

export function SetInputs() {
  const { dayEx, setDayEx } = useActiveInputs()!;
  if (!dayEx) return;

  function handleInputChange(
    label: "Reps" | "Weight",
    index: number,
    value: number,
  ) {
    if (
      (label === "Reps" && dayEx?.reps[index] !== value) ||
      (label === "Weight" && dayEx?.weight[index] !== value)
    )
      setDayEx((prevDayEx: any) => {
        const newDayEx = { ...prevDayEx };
        if (label === "Reps") {
          newDayEx.reps[index] = value;
        } else if (label === "Weight") {
          for (let i = index; i < newDayEx.weight.length; i++) {
            newDayEx.weight[i] = value;
          }
        }
        return newDayEx;
      });
  }

  return (
    <section className="flex flex-col items-center justify-center gap-y-5">
      <InputRows handleInputChangeFunc={handleInputChange} />

      <div className="mb-10 flex gap-x-10">
        <EditSetButton method="Add" />
        <EditSetButton method="Delete" />
      </div>
    </section>
  );
}
