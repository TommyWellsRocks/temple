"use client";

import { useEffect } from "react";

import { useProgram, type ProgramState } from "./useProgram";

export function exerciseActions(
  set: (
    partial:
      | ProgramState
      | Partial<ProgramState>
      | ((state: ProgramState) => ProgramState | Partial<ProgramState>),
    replace?: boolean | undefined,
  ) => void,
) {
  return {
    dayExercise: null,
    setDayExercise: (dayId: number, dayExerciseId: number) => {
      set((state) => {
        const dayEx = state.program?.programDays
          .find((day) => day.id === dayId)
          ?.dayExercises.find((ex) => ex.id === dayExerciseId);
        return { ...state, dayExercise: dayEx };
      });
    },
    setDayExerciseInputs: (
      label: "Reps" | "Weight",
      index: number,
      value: number,
    ) =>
      set((state) => {
        const dayEx = state.dayExercise;
        if (!dayEx) return state;

        if (
          (label === "Reps" && dayEx?.reps[index] !== value) ||
          (label === "Weight" && dayEx?.weight[index] !== value)
        ) {
          if (label === "Reps") {
            dayEx.reps[index] = value;
          } else if (label === "Weight") {
            for (let i = index; i < dayEx.weight.length; i++) {
              dayEx.weight[i] = value;
            }
          }

          return {
            ...state,
            dayExercise: dayEx,
          };
        } else return state;
      }),
    setDayExerciseSets: (method: "Add" | "Delete") =>
      set((state) => {
        const dayEx = state.dayExercise;
        if (!dayEx) return state;

        if (method === "Add") {
          dayEx.reps.push(0);
          dayEx.weight.push(dayEx.weight[dayEx.weight.length - 1] || 0);
        } else {
          dayEx.reps.pop();
          dayEx.weight.pop();
          if (dayEx.loggedSetsCount > dayEx.reps.length) {
            dayEx.loggedSetsCount--;
          }
        }

        return {
          ...state,
          dayExercise: dayEx,
        };
      }),
    setDayExerciseLoggedSet: (loggedSetsCount: number) =>
      set((state) => {
        const dayEx = state.dayExercise;
        if (!dayEx) return state;

        dayEx.loggedSetsCount = loggedSetsCount;

        return {
          ...state,
          dayExercise: dayEx,
        };
      }),
  };
}

export function setDayExercise(dayId: number, dayExerciseId: number) {
  const setDayEx = useProgram.getState().setDayExercise;

  useEffect(() => setDayEx(dayId, dayExerciseId), [dayId, dayExerciseId]);
}
