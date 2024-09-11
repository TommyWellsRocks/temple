import { useEffect } from "react";

import { useProgram, type ProgramState } from "./useProgram";
import type { Program, ProgramDay } from "~/server/types";

export function programActions(set: any) {
  return {
    program: null,
    programGroups: null,
    setProgram: (program: Program) => set({ program }),
    setProgramGroups: (program: Program) => {
      const groupObjects: { id: number; groupDays: ProgramDay[] }[] = []; // Groups[groupDays, id]
      new Set(program?.groups.map((group) => group.id)).forEach((groupId) =>
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
    setProgramDetails: (
      newName: string,
      newStartDate: Date,
      newEndDate: Date,
    ) =>
      set((state: ProgramState) => {
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
  const setProgramGroups = useProgram.getState().setProgramGroups;

  useEffect(() => {
    setProgram(program);
    setProgramGroups(program);
  }, [program, setProgram]);

  return null;
}
