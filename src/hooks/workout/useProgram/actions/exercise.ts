"use client";

import { useEffect } from "react";

import {
  handleExerciseNoteInput,
  handleExerciseSetsChange,
  handleExerciseVolumeInput,
  handleUpdateLoggedSets,
} from "~/server/actions/workout/ExerciseActions";
import { useProgram, type ProgramState } from "../useProgram";

import { genRandomInt } from "~/utils/helpers";

export function exerciseActions(
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
    dayExercise: null,
    setDayExercise: (dayExerciseId: number) => {
      set((state) => ({
        ...state,
        dayExercise: state.day?.dayExercises.find(
          (ex) => ex.id === dayExerciseId,
        ),
      }));
    },

    updateExerciseVolume: async (
      programId: number,
      dayId: number,
      dayExerciseId: number,
      userId: string,
      reps: number[],
      weight: number[],
    ) => {
      // Failsafe
      const fallbackPrograms = get().programs;
      const fallbackProgram = get().program;
      const fallbackDay = get().day;
      const fallbackExercise = get().dayExercise;
      if (!fallbackProgram || !fallbackDay || !fallbackExercise) return;

      // Optimistic Update
      const optimisticExercise = {
        ...fallbackExercise,
        reps,
        weight,
      };
      const optimisticDay = {
        ...fallbackDay,
        dayExercises: fallbackDay.dayExercises.map((ex) =>
          ex.id === dayExerciseId ? optimisticExercise : ex,
        ),
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
        day: optimisticDay,
        dayExercise: optimisticExercise,
      }));

      // Actual Update
      try {
        await handleExerciseVolumeInput(dayExerciseId, userId, reps, weight);
      } catch (error) {
        // Else Fallback Update
        console.error(error);
        set((state) => ({
          ...state,
          programs: fallbackPrograms,
          program: fallbackProgram,
          day: fallbackDay,
          dayExercise: fallbackExercise,
        }));
      }
    },

    updateExerciseSets: async (
      programId: number,
      dayId: number,
      dayExerciseId: number,
      userId: string,
      reps: number[],
      weight: number[],
      loggedSetsCount: number,
    ) => {
      // Failsafe
      const fallbackPrograms = get().programs;
      const fallbackProgram = get().program;
      const fallbackDay = get().day;
      const fallbackExercise = get().dayExercise;
      if (!fallbackProgram || !fallbackDay || !fallbackExercise) return;

      // Optimistic Update
      const optimisticExercise = {
        ...fallbackExercise,
        reps,
        weight,
        loggedSetsCount,
      };
      const optimisticDay = {
        ...fallbackDay,
        dayExercises: fallbackDay.dayExercises.map((ex) =>
          ex.id === dayExerciseId ? optimisticExercise : ex,
        ),
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
        day: optimisticDay,
        dayExercise: optimisticExercise,
      }));

      // Actual Update
      try {
        await handleExerciseSetsChange(
          dayExerciseId,
          userId,
          reps,
          weight,
          loggedSetsCount,
        );
      } catch (error) {
        // Else Fallback Update
        console.error(error);
        set((state) => ({
          ...state,
          programs: fallbackPrograms,
          program: fallbackProgram,
          day: fallbackDay,
          dayExercise: fallbackExercise,
        }));
      }
    },

    updateExerciseLoggedSets: async (
      programId: number,
      dayId: number,
      dayExerciseId: number,
      userId: string,
      loggedSetsCount: number,
    ) => {
      // Failsafe
      const fallbackPrograms = get().programs;
      const fallbackProgram = get().program;
      const fallbackDay = get().day;
      const fallbackExercise = get().dayExercise;
      if (!fallbackProgram || !fallbackDay || !fallbackExercise) return;

      // Optimistic Update
      const optimisticExercise = {
        ...fallbackExercise,
        loggedSetsCount,
      };
      const optimisticDay = {
        ...fallbackDay,
        dayExercises: fallbackDay.dayExercises.map((ex) =>
          ex.id === dayExerciseId ? optimisticExercise : ex,
        ),
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
        day: optimisticDay,
        dayExercise: optimisticExercise,
      }));

      // Actual Update
      try {
        await handleUpdateLoggedSets(dayExerciseId, userId, loggedSetsCount);
      } catch (error) {
        // Else Fallback Update
        console.error(error);
        set((state) => ({
          ...state,
          programs: fallbackPrograms,
          program: fallbackProgram,
          day: fallbackDay,
          dayExercise: fallbackExercise,
        }));
      }
    },

    updateExerciseNote: async (
      userId: string,
      programId: number,
      dayId: number,
      dayExerciseId: number,
      exerciseId: number,
      noteValue: string,
      noteId?: number,
    ) => {
      // Failsafe
      const fallbackPrograms = get().programs;
      const fallbackProgram = get().program;
      const fallbackDay = get().day;
      const fallbackExercise = get().dayExercise;
      if (!fallbackProgram || !fallbackDay || !fallbackExercise) return;

      // Optimistic Update
      const fakeId = genRandomInt();
      const optimisticExercise = {
        ...fallbackExercise,
        notes: { ...fallbackExercise.notes, id: fakeId, notes: noteValue },
      };
      const optimisticDay = {
        ...fallbackDay,
        dayExercises: fallbackDay.dayExercises.map((ex) =>
          ex.id === dayExerciseId ? optimisticExercise : ex,
        ),
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
        day: optimisticDay,
        dayExercise: optimisticExercise,
      }));

      // Actual Update
      try {
        const { id: realNoteId } = await handleExerciseNoteInput(
          userId,
          exerciseId,
          noteValue,
          noteId,
        );
        if (!realNoteId) throw "No realNoteId error";

        const actualExercise = {
          ...optimisticExercise,
          notes: { ...optimisticExercise.notes, id: realNoteId },
        };
        const actualDay = {
          ...optimisticDay,
          dayExercises: optimisticDay.dayExercises.map((ex) =>
            ex.id === dayExerciseId ? actualExercise : ex,
          ),
        };
        const actualProgram = {
          ...optimisticProgram,
          programDays: optimisticProgram.programDays.map((day) =>
            day.id === dayId ? actualDay : day,
          ),
        };
        const actualPrograms = optimisticPrograms.map((program) =>
          program.id === programId ? actualProgram : program,
        );

        set((state) => ({
          ...state,
          programs: actualPrograms,
          program: actualProgram,
          day: actualDay,
          dayExercise: actualExercise,
        }));
      } catch (error) {
        // Else Fallback Update
        console.error(error);
        set((state) => ({
          ...state,
          programs: fallbackPrograms,
          program: fallbackProgram,
          day: fallbackDay,
          dayExercise: fallbackExercise,
        }));
      }
    },
  };
}

export function SetDayExercise({ dayExerciseId }: { dayExerciseId: number }) {
  const setDayEx = useProgram.getState().setDayExercise;

  useEffect(() => setDayEx(dayExerciseId), [dayExerciseId, setDayEx]);

  return null;
}
