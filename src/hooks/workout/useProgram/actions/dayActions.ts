"use client";

import { useEffect } from "react";
import { useProgram, type ProgramState } from "../useProgram";

import { genRandomInt } from "~/utils/helpers";

import type { ProgramDay } from "~/server/types";
import {
  handleCreateDay,
  handleGetProgramDay,
} from "~/server/actions/workout/ProgramActions";

export function dayActions(
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
    day: null,

    setDay: (dayId: number) =>
      set((state) => ({
        ...state,
        day: state.program?.programDays.find((day) => day.id === dayId),
      })),

    createDay: async (
      userId: string,
      programId: number,
      groupId: number,
      name: string,
      repeatOn: number[] | null,
    ) => {
      // Failsafe
      const fallbackPrograms = get().programs;
      const fallbackProgram = get().program;
      if (!fallbackProgram) return;

      // Optimistic Update
      const existingIds = fallbackProgram.programDays.map((day) => day.id);
      let fakeId = genRandomInt();
      while (existingIds.includes(fakeId)) {
        fakeId = genRandomInt();
      }
      const optimisticDay = {
        id: fakeId,
        name,
        updatedAt: new Date(),
        userId,
        programId,
        groupId,
        repeatOn,
        startedWorkout: null,
        endedWorkout: null,
        group: { id: genRandomInt() },
        dayExercises: [],
      };
      const optimisticProgram = {
        ...fallbackProgram,
        programDays: [...fallbackProgram.programDays, optimisticDay],
      };
      const optimisticPrograms = fallbackPrograms.map((program) =>
        program.id === programId ? optimisticProgram : program,
      );

      set((state) => ({
        ...state,
        programs: optimisticPrograms,
        program: optimisticProgram,
      }));

      // Actual Update
      try {
        const { id: realDayId } = await handleCreateDay(
          userId,
          programId,
          groupId,
          name,
          repeatOn,
        );
        if (!realDayId) throw "No realDayId error";

        const realDay = await handleGetProgramDay(userId, realDayId);
        if (!realDay) throw "No realDay error";

        const actualProgram = {
          ...optimisticProgram,
          programDays: optimisticProgram.programDays.map((day) =>
            day.id === fakeId ? realDay : day,
          ),
        };

        const actualPrograms = optimisticPrograms.map((program) =>
          program.id === programId ? actualProgram : program,
        );

        set((state) => ({
          ...state,
          programs: actualPrograms,
          program: actualProgram,
        }));
      } catch (error) {
        // Else Fallback Update
        console.error(error);
        set((state) => ({
          ...state,
          programs: fallbackPrograms,
          program: fallbackProgram,
        }));
      }
    },

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
