"use client";

import { create } from "zustand";
import type { Program, ProgDay } from "~/server/types";
import { useEffect } from "react";

interface ProgramState {
  program: Program | null;
  programGroups:
    | {
        id: number;
        groupDays: ProgDay[];
      }[]
    | null;
  setProgram: (program: Program) => void;
  setProgramGroups: (program: Program) => void;
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
  programGroups: null,
  setProgram: (program) => set({ program }),
  setProgramGroups: (program) => {
    const groupObjects: { id: number; groupDays: ProgDay[] }[] = []; // Groups[groupDays, id]
    new Set(program?.programDays.map((day) => day.groupId)).forEach((groupId) =>
      groupObjects.push({ id: groupId, groupDays: [] }),
    );
    program?.programDays.forEach((day) =>
      groupObjects
        .find((group) => group.id === day.groupId)
        ?.groupDays.push(day),
    );
    groupObjects.sort((a, b) => a.id - b.id);
    return set({ programGroups: groupObjects });
  },
  setProgramDetails: (newName, newStartDate, newEndDate) =>
    set((state) => {
      if (!state.program) return state;
      return {
        ...state,
        program: {
          ...state.program,
          name: newName,
          startDate: newStartDate,
          endDate: newEndDate,
        },
      };
    }),
  // Days
  setDayDetails: (dayId, newName, newRepeatOn) =>
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
}));

export function SetProgram({ program }: { program: Program }) {
  const setProgram = useProgram.getState().setProgram;
  const setProgramGroups = useProgram.getState().setProgramGroups;

  useEffect(() => {
    setProgram(program);
    setProgramGroups(program);
  }, [program, setProgram]);

  return null;
}
