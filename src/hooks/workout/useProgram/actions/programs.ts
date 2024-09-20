"use client";

import { useEffect } from "react";
import { useProgram, type ProgramState } from "../useProgram";

import { getFakeId } from "~/utils/helpers";
import {
  handleCreateProgram,
  handleDeleteProgram,
  handleGetProgram,
  handleUpdateProgram,
} from "~/server/actions/workout/ProgramsActions";

import type { Program, WorkoutPrograms } from "~/server/types";

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
      const fakeId = getFakeId(existingIds);
      const optimisticPrograms = [...fallbackPrograms];
      optimisticPrograms.push({
        id: fakeId,
        name,
        userId,
        startDate,
        endDate,
        updatedAt: new Date(),
      } as Program); // ! Dangerous
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
        const actualPrograms = optimisticPrograms.map((program) =>
          program.id === fakeId ? realProgram : program,
        );
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

    updateProgram: async (
      userId: string,
      programId: number,
      name: string,
      startDate: Date,
      endDate: Date,
    ) => {
      // Failsafe
      const fallbackPrograms = get().programs;

      // Optimistic Update
      const optimisticPrograms = fallbackPrograms.map((program) =>
        program.id === programId
          ? { ...program, name, startDate, endDate, updatedAt: new Date() }
          : program,
      );
      set((state) => ({
        ...state,
        programs: optimisticPrograms,
      }));

      // Actual Update
      try {
        await handleUpdateProgram(userId, programId, name, startDate, endDate);
      } catch (error) {
        // Else Fallback Update
        console.error(error);
        set((state) => ({
          ...state,
          programs: fallbackPrograms,
        }));
      }
    },

    deleteProgram: async (userId: string, programId: number) => {
      // Failsafe
      const fallbackPrograms = get().programs;

      // Optimistic Update
      const optimisticPrograms = [...fallbackPrograms];
      const badEggIndex = optimisticPrograms.findIndex(
        (program) => program.id === programId,
      );
      optimisticPrograms.splice(badEggIndex, 1);
      set((state) => ({
        ...state,
        programs: optimisticPrograms,
      }));

      // Actual Update
      try {
        await handleDeleteProgram(userId, programId);
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
