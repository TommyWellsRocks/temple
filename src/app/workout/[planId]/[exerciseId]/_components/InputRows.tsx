"use client";

import { useRef } from "react";
import { handleInput } from "./ServerComponents";
import { SessionExercise } from "~/server/types";

export function InputRows({
  sessionExercise,
}: {
  sessionExercise: SessionExercise;
}) {
  const setCountBoxClassDefault =
    "flex h-11 w-11 items-center justify-center bg-gray-600 font-semibold text-gray-900";
  const setCountBoxClassFocus =
    "flex h-11 w-11 items-center justify-center bg-primary font-semibold text-black";

  return sessionExercise.reps.map((repCount, index) => {
    const setCountBox = useRef<HTMLInputElement>(null);

    return (
      <div
        className="flex items-center gap-x-3 text-2xl font-light text-gray-600"
        key={index}
      >
        <div
          className={setCountBoxClassDefault}
          ref={setCountBox}
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
          onFocus={() => {
            setCountBox.current!.className = setCountBoxClassFocus;
          }}
          onBlur={(e) => {
            setCountBox.current!.className = setCountBoxClassDefault;

            let newValue = e.target.valueAsNumber;
            if (newValue < 0) {
              newValue = 0;
              e.target.value = "0";
            }
            const values = sessionExercise.reps;
            const currentTargetValue = values[index];

            if (currentTargetValue !== newValue) {
              values[index] = newValue;
              handleInput(
                sessionExercise.userId,
                sessionExercise.workoutId,
                sessionExercise.exerciseId,
                sessionExercise.id,
                "Reps",
                values,
              );
            }
          }}
        />
        <div className="text-xl">Reps</div>
        <div className="h-9 rotate-12 border border-gray-600"></div>
        <input
          className="w-16 cursor-pointer text-center"
          type="number"
          defaultValue={sessionExercise.weight[index]}
          onFocus={() => {
            setCountBox.current!.className = setCountBoxClassFocus;
          }}
          onBlur={(e) => {
            setCountBox.current!.className = setCountBoxClassDefault;

            let newValue = e.target.valueAsNumber;
            if (newValue < 0) {
              newValue = 0;
              e.target.value = "0";
            }
            const values = sessionExercise.weight;
            const currentTargetValue = values[index];

            if (currentTargetValue !== newValue) {
              values[index] = newValue;
              handleInput(
                sessionExercise.userId,
                sessionExercise.workoutId,
                sessionExercise.exerciseId,
                sessionExercise.id,
                "Weight",
                values,
              );
            }
          }}
        />
        <div className="text-xl">Pounds</div>
      </div>
    );
  });
}
