"use client";

import { useEffect } from "react";
import { useProgram, type ProgramState } from "../useProgram";

import { genRandomInt } from "~/utils/helpers";
import {
  handleCreateProgram,
  handleGetProgram,
} from "~/server/actions/workout/ProgramsActions";

import type { WorkoutPrograms } from "~/server/types";

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
      const existingIds = fallbackPrograms.map((program) => program.id);
      let fakeId = genRandomInt();
      while (existingIds.includes(fakeId)) {
        fakeId = genRandomInt();
      }
      const fakeDate = new Date();
      const optimisticPrograms = [
        ...fallbackPrograms,
        { id: fakeId, createdAt: fakeDate, name, userId, startDate, endDate },
      ] as WorkoutPrograms;
      set((state) => ({
        ...state,
        programs: optimisticPrograms,
      }));

      // Actual Update
      try {
        const { id: realId } = await handleCreateProgram(
          userId,
          name,
          startDate,
          endDate,
        );
        if (!realId) throw "No realId error";
        const realProgram = await handleGetProgram(userId, realId);
        if (!realProgram) throw "No realProgram error";
        const actualPrograms = [
          ...optimisticPrograms.map((program) =>
            program.id === fakeId ? realProgram : program,
          ),
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

export function setProgram(programId: number) {
  const setProgram = useProgram.getState().setProgram;

  useEffect(() => setProgram(programId), [programId]);
}
