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
import {
  getChangedDay,
  getChangedProgram,
  getChangedPrograms,
} from "../../helpers";

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
      const optimisticDay = getChangedDay(
        fallbackDay,
        dayExerciseId,
        optimisticExercise,
      );
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
        day: optimisticDay,
        dayExercise: optimisticExercise,
      }));

      // Actual Update
      try {
        const { err } = await handleExerciseVolumeInput(
          dayExerciseId,
          userId,
          reps,
          weight,
        );
        if (err) throw err;
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
      const optimisticDay = getChangedDay(
        fallbackDay,
        dayExerciseId,
        optimisticExercise,
      );
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
        day: optimisticDay,
        dayExercise: optimisticExercise,
      }));

      // Actual Update
      try {
        const { err } = await handleExerciseSetsChange(
          dayExerciseId,
          userId,
          reps,
          weight,
          loggedSetsCount,
        );
        if (err) throw err;
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
      const optimisticDay = getChangedDay(
        fallbackDay,
        dayExerciseId,
        optimisticExercise,
      );
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
        day: optimisticDay,
        dayExercise: optimisticExercise,
      }));

      // Actual Update
      try {
        const { err } = await handleUpdateLoggedSets(
          dayExerciseId,
          userId,
          loggedSetsCount,
        );
        if (err) throw err;
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
      const optimisticDay = getChangedDay(
        fallbackDay,
        dayExerciseId,
        optimisticExercise,
      );
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
        day: optimisticDay,
        dayExercise: optimisticExercise,
      }));

      // Actual Update
      try {
        const { value: realNoteId, err } = await handleExerciseNoteInput(
          userId,
          exerciseId,
          noteValue,
          noteId,
        );
        if (!realNoteId || err) throw err ? err : "No realNoteId error";

        const actualExercise = {
          ...optimisticExercise,
          notes: { ...optimisticExercise.notes, id: realNoteId },
        };
        const actualDay = getChangedDay(
          optimisticDay,
          dayExerciseId,
          actualExercise,
        );
        const actualProgram = getChangedProgram(
          optimisticProgram,
          dayId,
          actualDay,
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

export function SetExercise({
  programId,
  dayId,
  dayExerciseId,
}: {
  programId: number;
  dayId: number;
  dayExerciseId: number;
}) {
  const setProgram = useProgram.getState().setProgram;
  const setProgramDay = useProgram.getState().setDay;
  const setDayEx = useProgram.getState().setDayExercise;

  useEffect(() => {
    setProgram(programId);
    setProgramDay(dayId);
    setDayEx(dayExerciseId);
  }, [programId, dayId, dayExerciseId]);

  return null;
}
