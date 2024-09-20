"use client";

import { useEffect } from "react";

import { useProgram, type ProgramState } from "../useProgram";
import { DayExercise } from "~/server/types";

export function exerciseActions(
  set: {
    (
      partial:
        | ProgramState
        | Partial<ProgramState>
        | ((state: ProgramState) => ProgramState | Partial<ProgramState>),
      replace?: false | undefined,
    ): void;
    (
      state: ProgramState | ((state: ProgramState) => ProgramState),
      replace: true,
    ): void;
  },
  get: () => ProgramState,
) {
  return {
    dayExercise: null,

    setDayExercise: (dayExerciseId: number) => {
      set((state) => ({
        ...state,
        dayExercise: state.day?.dayExercises.find(
          (ex) => ex.id === dayExerciseId,
        ),
      }));
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

export function SetDayExercise({ dayExerciseId }: { dayExerciseId: number }) {
  const setDayEx = useProgram.getState().setDayExercise;

  useEffect(() => setDayEx(dayExerciseId), [dayExerciseId, setDayEx]);

  return null;
}
