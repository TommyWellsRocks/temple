"use client";

import { useEffect } from "react";

import { useProgram, type ProgramState } from "../useProgram";
import { ProgramDay } from "~/server/types";

export function dayActions(set: {
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
}) {
  return {
    day: null,

    setDay: (dayId: number) =>
      set((state) => {
        if (!state.program) return state;
        const day = state.program.programDays.find(
          (programDay) => programDay.id === dayId,
        );
        return {
          ...state,
          day,
        };
      }),

    updateDay: (day: ProgramDay) =>
      set((state) => {
        if (!day || !state.program) return state;

        // Update Parent
        const updatedProgramDays = state.program.programDays.map(
          (programDay) => (programDay.id === day.id ? day : programDay),
        );

        // Update Child
        const updatedDay = state.day?.id === day.id ? day : state.day;

        return {
          ...state,
          program: {
            ...state.program,
            programDays: updatedProgramDays,
          },
          day: updatedDay,
        };
      }),
  };
}

export function setDay(dayId: number) {
  const setDay = useProgram.getState().setDay;

  useEffect(() => setDay(dayId), [dayId]);
}
