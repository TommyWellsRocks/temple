"use client";

import { useEffect } from "react";
import { useProgram, type ProgramState } from "../useProgram";

import { genRandomInt, getFakeId } from "~/utils/helpers";

import {
  handleCreateDay,
  handleCreateWeekWithDays,
  handleDeleteDay,
  handleDeleteWeek,
  handleGetProgramDay,
  handleGetWeekWithDays,
  handleUpdateDay,
} from "~/server/actions/workout/ProgramActions";

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
      const fakeId = getFakeId(existingIds);
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

    updateDay: async (
      userId: string,
      programId: number,
      dayId: number,
      newName: string,
      newRepeatOn: number[] | null,
    ) => {
      // Failsafe
      const fallbackPrograms = get().programs;
      const fallbackProgram = get().program;
      if (!fallbackProgram) return;
      const fallbackDay = fallbackProgram.programDays.find(
        (day) => day.id === dayId,
      );
      if (!fallbackDay) return;

      // Optimistic Update
      const optimisticDay = {
        ...fallbackDay,
        name: newName,
        repeatOn: newRepeatOn,
        updatedAt: new Date(),
      };
      const optimisticProgram = {
        ...fallbackProgram,
        programDays: fallbackProgram.programDays.map((day) =>
          day.id === dayId ? optimisticDay : day,
        ),
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
        await handleUpdateDay(userId, programId, dayId, newName, newRepeatOn);
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

    deleteDay: async (userId: string, programId: number, dayId: number) => {
      // Failsafe
      const fallbackPrograms = get().programs;
      const fallbackProgram = get().program;
      if (!fallbackProgram) return;
      const fallbackDay = fallbackProgram.programDays.find(
        (day) => day.id === dayId,
      );
      if (!fallbackDay) return;

      // Optimistic Update
      const badEggIndex = fallbackProgram.programDays.findIndex(
        (day) => day.id === dayId,
      );
      const optimisticProgramDays = [...fallbackProgram.programDays];
      optimisticProgramDays.splice(badEggIndex, 1);
      const optimisticProgram = {
        ...fallbackProgram,
        programDays: optimisticProgramDays,
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
        await handleDeleteDay(userId, programId, dayId);
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

    createWeekWithDays: async (userId: string, programId: number) => {
      // Failsafe
      const fallbackPrograms = get().programs;
      const fallbackProgram = get().program;
      if (!fallbackProgram) return;

      // Optimistic Update
      const existingIds = fallbackProgram.programDays.map((day) => day.id);
      const fakeId = getFakeId(existingIds);
      const fakeGroup = { id: fakeId };
      const optimisticProgramGroups = [...fallbackProgram.groups, fakeGroup];

      const optimisticProgram = {
        ...fallbackProgram,
        groups: optimisticProgramGroups,
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
        const realGroupId = await handleCreateWeekWithDays(userId, programId);
        if (!realGroupId) throw "No realGroupId error";

        const realGroup = await handleGetWeekWithDays(userId, realGroupId);
        if (!realGroup) throw "No realGroup error";

        const actualProgram = {
          ...optimisticProgram,
          groups: optimisticProgram.groups.map((group) =>
            group.id === fakeId ? { id: realGroupId } : group,
          ),
          programDays: [
            ...optimisticProgram.programDays,
            ...realGroup.groupDays,
          ],
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

    deleteWeek: async (userId: string, programId: number, groupId: number) => {
      // Failsafe
      const fallbackPrograms = get().programs;
      const fallbackProgram = get().program;
      if (!fallbackProgram) return;

      // Optimistic Update
      const badEggIndexGroup = fallbackProgram.groups.findIndex(
        (group) => group.id === groupId,
      );
      const optimisticGroups = [...fallbackProgram.groups];
      optimisticGroups.splice(badEggIndexGroup, 1);

      const optimisticProgramDays = fallbackProgram.programDays.filter(
        (day) => day.groupId !== groupId,
      );

      const optimisticProgram = {
        ...fallbackProgram,
        groups: optimisticGroups,
        programDays: optimisticProgramDays,
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
        await handleDeleteWeek(userId, programId, groupId);
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
  };
}

export function setProgram(programId: number) {
  const setProgram = useProgram.getState().setProgram;

  useEffect(() => setProgram(programId), [programId]);
}
