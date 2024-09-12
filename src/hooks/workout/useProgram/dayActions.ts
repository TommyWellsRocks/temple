"use client";

import { useEffect } from "react";

import { useProgram, type ProgramState } from "./useProgram";

export function dayActions(
  set: (
    partial:
      | ProgramState
      | Partial<ProgramState>
      | ((state: ProgramState) => ProgramState | Partial<ProgramState>),
    replace?: boolean | undefined,
  ) => void,
) {
  return {
    day: null,
    setDay: (dayId: number) =>
      set((state) => {
        const day = state.program?.programDays.find((day) => day.id === dayId);

        return {
          ...state,
          day,
        };
      }),
    setDayDetails: (
      dayId: number,
      newName: string,
      newRepeatOn: number[] | null,
    ) =>
      set((state) => {
        if (!state.program) return state;

        // Update programDays
        const updatedProgramDays = state.program.programDays.map((day) =>
          day.id === dayId
            ? { ...day, name: newName, repeatOn: newRepeatOn }
            : day,
        );

        return {
          ...state,
          program: {
            ...state.program,
            programDays: updatedProgramDays,
          },
        };
      }),
    setStartWorkout: (dayId: number, startedWorkout: Date) =>
      set((state) => {
        if (!state.program || !state.day) return state;

        // Update programDays
        const updatedProgramDays = state.program.programDays.map((day) =>
          day.id === dayId ? { ...day, startedWorkout } : day,
        );

        return {
          ...state,
          day: {
            ...state.day,
            startedWorkout,
          },
          program: {
            ...state.program,
            programDays: updatedProgramDays,
          },
        };
      }),
    setEndWorkout: (dayId: number, endedWorkout: Date) =>
      set((state) => {
        if (!state.program || !state.day) return state;

        // Update programDays
        const updatedProgramDays = state.program.programDays.map((day) =>
          day.id === dayId ? { ...day, endedWorkout } : day,
        );

        return {
          ...state,
          day: {
            ...state.day,
            endedWorkout,
          },
          program: {
            ...state.program,
            programDays: updatedProgramDays,
          },
        };
      }),
  };
}

export function setDay(dayId: number) {
  const setDay = useProgram.getState().setDay;

  useEffect(() => setDay(dayId), [dayId]);
}
