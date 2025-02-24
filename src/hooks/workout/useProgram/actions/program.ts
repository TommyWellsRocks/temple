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
import { getChangedProgram, getChangedPrograms } from "../../helpers";

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
      const optimisticPrograms = getChangedPrograms(
        fallbackPrograms,
        programId,
        optimisticProgram,
      );

      set((state) => ({
        ...state,
        programs: optimisticPrograms,
        program: optimisticProgram,
      }));

      // Actual Update
      try {
        const { value: realDayId, err: cdError } = await handleCreateDay(
          programId,
          groupId,
          name,
          repeatOn,
        );
        if (!realDayId || cdError)
          throw cdError ? cdError : "No realDayId error";

        const { value: realDay, err: gdError } =
          await handleGetProgramDay(realDayId);
        if (!realDay || gdError) throw gdError ? gdError : "No realDay error";

        const actualProgram = getChangedProgram(
          optimisticProgram,
          fakeId,
          realDay,
        );
        const actualPrograms = getChangedPrograms(
          optimisticPrograms,
          programId,
          actualProgram,
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
      const optimisticProgram = getChangedProgram(
        fallbackProgram,
        dayId,
        optimisticDay,
      );
      const optimisticPrograms = getChangedPrograms(
        fallbackPrograms,
        programId,
        optimisticProgram,
      );

      set((state) => ({
        ...state,
        programs: optimisticPrograms,
        program: optimisticProgram,
      }));

      // Actual Update
      try {
        const { err } = await handleUpdateDay(
          programId,
          dayId,
          newName,
          newRepeatOn,
        );
        if (err) throw err;
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

    deleteDay: async (programId: number, dayId: number) => {
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
      const optimisticPrograms = getChangedPrograms(
        fallbackPrograms,
        programId,
        optimisticProgram,
      );

      set((state) => ({
        ...state,
        programs: optimisticPrograms,
        program: optimisticProgram,
      }));

      // Actual Update
      try {
        const { err } = await handleDeleteDay(programId, dayId);
        if (err) throw err;
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

    createWeekWithDays: async (programId: number) => {
      // Failsafe
      const fallbackPrograms = get().programs;
      const fallbackProgram = get().program;
      if (!fallbackProgram) return;

      // Optimistic Update
      const existingIds = fallbackProgram.programDays.map((day) => day.id);
      const fakeId = getFakeId(existingIds);
      const fakeGroup = { id: fakeId };
      const optimisticProgramGroups = [...fallbackProgram.groups, fakeGroup];

      const finalGroupId = Math.max(...fallbackProgram.groups.map((g) => g.id));
      const optimisticProgramDays = [
        ...fallbackProgram.programDays,
        ...fallbackProgram.programDays
          .filter((day) => day.groupId === finalGroupId)
          .map((day) => ({ ...day, groupId: fakeId })),
      ];

      const optimisticProgram = {
        ...fallbackProgram,
        groups: optimisticProgramGroups,
        programDays: optimisticProgramDays,
      };
      const optimisticPrograms = getChangedPrograms(
        fallbackPrograms,
        programId,
        optimisticProgram,
      );

      set((state) => ({
        ...state,
        programs: optimisticPrograms,
        program: optimisticProgram,
      }));

      // Actual Update
      try {
        const { value: realGroupId, err: cwError } =
          await handleCreateWeekWithDays(programId);
        if (!realGroupId || cwError)
          throw cwError ? cwError : "No realGroupId error";

        const { value: realGroup, err: gwError } =
          await handleGetWeekWithDays(realGroupId);
        if (!realGroup || gwError)
          throw gwError ? gwError : "No realGroup error";

        const actualProgram = {
          ...optimisticProgram,
          groups: optimisticProgram.groups.map((group) =>
            group.id === fakeId ? { id: realGroupId } : group,
          ),
          programDays: [
            ...optimisticProgram.programDays.filter(
              (day) => day.groupId !== fakeId,
            ),
            ...realGroup.groupDays,
          ],
        };
        const actualPrograms = getChangedPrograms(
          optimisticPrograms,
          programId,
          actualProgram,
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

    deleteWeek: async (programId: number, groupId: number) => {
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
      const optimisticPrograms = getChangedPrograms(
        fallbackPrograms,
        programId,
        optimisticProgram,
      );

      set((state) => ({
        ...state,
        programs: optimisticPrograms,
        program: optimisticProgram,
      }));

      // Actual Update
      try {
        const { err } = await handleDeleteWeek(programId, groupId);
        if (err) throw err;
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

export function SetProgram({ programId }: { programId: number }) {
  const setProgram = useProgram.getState().setProgram;

  useEffect(() => setProgram(programId), [programId]);

  return null;
}
