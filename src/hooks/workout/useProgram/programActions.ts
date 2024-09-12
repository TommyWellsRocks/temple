"use client";

import { useEffect } from "react";

import { useProgram, type ProgramState } from "./useProgram";
import type { Program } from "~/server/types";

export function programActions(
  set: (
    partial:
      | ProgramState
      | Partial<ProgramState>
      | ((state: ProgramState) => ProgramState | Partial<ProgramState>),
    replace?: boolean | undefined,
  ) => void,
) {
  return {
    program: null,

    setProgram: (program: Program) => set((state) => ({ ...state, program })),

    setProgramDetails: (
      newName: string,
      newStartDate: Date,
      newEndDate: Date,
    ) =>
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
  };
}

export function SetProgram({ program }: { program: Program }) {
  const setProgram = useProgram.getState().setProgram;

  useEffect(() => {
    setProgram(program);
  }, [program, setProgram]);

  return null;
}
