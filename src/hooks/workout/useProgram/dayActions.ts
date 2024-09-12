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
        if (!state.program) return state;
        const day = state.program.programDays.find((day) => day.id === dayId);
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

        // Update Parent
        const updatedProgramDays = state.program.programDays.map((day) =>
          day.id === dayId
            ? { ...day, name: newName, repeatOn: newRepeatOn }
            : day,
        );

        // Update Child
        const updatedDay =
          state.day && state.day.id === dayId
            ? {
                ...state.day,
                name: newName,
                repeatOn: newRepeatOn,
              }
            : state.day;

        return {
          ...state,
          program: {
            ...state.program,
            programDays: updatedProgramDays,
          },
          day: updatedDay,
        };
      }),

    setStartWorkout: (dayId: number, startedWorkout: Date) =>
      set((state) => {
        if (!state.program) return state;

        // Update Parent
        const updatedProgramDays = state.program.programDays.map((day) =>
          day.id === dayId ? { ...day, startedWorkout } : day,
        );

        // Update Child
        const updatedDay =
          state.day && state.day.id === dayId
            ? {
                ...state.day,
                startedWorkout,
              }
            : state.day;

        return {
          ...state,
          day: updatedDay,
          program: {
            ...state.program,
            programDays: updatedProgramDays,
          },
        };
      }),

    setEndWorkout: (dayId: number, endedWorkout: Date) =>
      set((state) => {
        if (!state.program) return state;

        // Update Parent
        const updatedProgramDays = state.program.programDays.map((day) =>
          day.id === dayId ? { ...day, endedWorkout } : day,
        );

        // Update Child
        const updatedDay =
          state.day && state.day.id === dayId
            ? {
                ...state.day,
                endedWorkout,
              }
            : state.day;

        return {
          ...state,
          day: updatedDay,
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
