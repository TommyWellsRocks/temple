"use client";

import { type ProgramState } from "../useProgram";

export function programActions(
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
    program: null,

    setProgram: (programId: number) =>
      set((state) => ({
        ...state,
        program: state.programs.find((program) => program.id === programId),
      })),

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
