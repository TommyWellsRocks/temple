"use client";

import { useEffect } from "react";

import { useProgram, type ProgramState } from "./useProgram";
import { DayExercise } from "~/server/types";

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
        if (!state.program) return state;

        const day = state.program.programDays.find((day) => day.id === dayId);

        if (!day) return state;

        const dayExercise = day.dayExercises.find(
          (ex) => ex.id === dayExerciseId,
        );

        return { ...state, dayExercise };
      });
    },

    updateDayExercise: (dayEx: DayExercise) =>
      set((state) => {
        if (!dayEx || !state.program) return state;

        // Update Parent (Program)
        const updatedProgramDays = state.program.programDays.map((day) =>
          day.id === dayEx.dayId
            ? {
                ...day,
                dayExercises: day.dayExercises.map((ex) =>
                  ex.id === dayEx.id ? dayEx : ex,
                ),
              }
            : day,
        );

        // Update Parent (Day)
        const updatedDay = state.day
          ? {
              ...state.day,
              dayExercises: state.day.dayExercises.map((ex) =>
                ex.id === dayEx.id ? dayEx : ex,
              ),
            }
          : state.day;

        // Update Child (DayExercise)
        const updatedDayExercise =
          state.dayExercise?.id === dayEx.id ? dayEx : state.dayExercise;

        return {
          ...state,
          program: {
            ...state.program,
            programDays: updatedProgramDays,
          },
          day: updatedDay,
          dayExercise: updatedDayExercise,
        };
      }),
  };
}

export function setDayExercise(dayId: number, dayExerciseId: number) {
  const setDayEx = useProgram.getState().setDayExercise;

  useEffect(() => setDayEx(dayId, dayExerciseId), [dayId, dayExerciseId]);
}
