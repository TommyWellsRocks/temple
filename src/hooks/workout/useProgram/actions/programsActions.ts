"use client";

import { handleCreateProgram } from "~/server/actions/workout/ProgramsActions";
import { useProgram, type ProgramState } from "../useProgram";
import type { WorkoutPrograms } from "~/server/types";
import { genRandomInt } from "~/utils/helpers";
import { useEffect } from "react";

export function programsActions(
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
    programs: [],

    setPrograms: (programs: WorkoutPrograms) =>
      set((state) => ({ ...state, programs })),

    createProgram: async (
      name: string,
      userId: string,
      startDate: Date,
      endDate: Date,
    ) => {
      // Failsafe
      const fallbackPrograms = get().programs;

      // Optimistic Update
      const fakeId = genRandomInt();
      const fakeDate = new Date();
      const optimisticPrograms = [
        ...fallbackPrograms,
        { id: fakeId, createdAt: fakeDate, name, userId, startDate, endDate },
      ];
      set((state) => ({
        ...state,
        programs: optimisticPrograms,
      }));

      // Actual Update
      try {
        const realProgram = await handleCreateProgram(
          userId,
          name,
          startDate,
          endDate,
        );
        if (!realProgram) throw "No creation error";
        const actualPrograms = [
          ...optimisticPrograms.map((program) => {
            if (program.id === fakeId) {
              return {
                ...program,
                id: realProgram.id,
                createdAt: realProgram.createdAt,
              };
            } else {
              return program;
            }
          }),
        ];
        set((state) => ({
          ...state,
          programs: actualPrograms,
        }));
      } catch (error) {
        // Else Fallback Update
        console.error(error);
        set((state) => ({
          ...state,
          programs: fallbackPrograms,
        }));
      }
    },
  };
}

export function SetPrograms({ programs }: { programs: WorkoutPrograms }) {
  const setPrograms = useProgram.getState().setPrograms;

  useEffect(() => {
    setPrograms(programs);
  }, [programs, setPrograms]);

  return null;
}
