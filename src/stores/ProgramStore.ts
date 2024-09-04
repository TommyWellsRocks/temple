"use client";

import { create } from "zustand";
import { produce } from "immer";
import type { Program } from "~/server/types";

interface ProgramState {
  program: Program | null;
  setProgram: (program: Program) => void;
  setProgramDetails: (
    newName: string,
    newStartDate: Date,
    newEndDate: Date,
  ) => void;
  setDayDetails: (
    dayId: number,
    newName: string,
    newRepeatOn: number[] | null,
  ) => void;
}

export const useProgram = create<ProgramState>((set) => ({
  program: null,
  setProgram: (program) => set({ program }),
  setProgramDetails: (newName, newStartDate, newEndDate) =>
    set(
      produce((state: ProgramState) => {
        const program = state.program;
        if (program) {
          program.name = newName;
          program.startDate = newStartDate;
          program.endDate = newEndDate;
        }
      }),
    ),
  // Days
  setDayDetails: (dayId, newName, newRepeatOn) =>
    set(
      produce((state: ProgramState) => {
        const day = state.program?.programDays.find((day) => day.id === dayId);
        if (day) {
          day.name = newName;
          day.repeatOn = newRepeatOn;
        }
      }),
    ),
}));

export function SetProgram({ program }: { program: Program }) {
  const setProgram = useProgram.getState().setProgram;

  setProgram(program);
  return null;
}
