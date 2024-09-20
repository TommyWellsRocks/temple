"use client";

import { useEffect } from "react";
import { useProgram, type ProgramState } from "../useProgram";

import { genRandomInt } from "~/utils/helpers";
import {
  handleAddExercise,
  handleEditExerciseName,
  handleGetExercise,
} from "~/server/actions/workout/DayActions";

import type { Exercises } from "~/server/types";

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

    addExercise: async (
      userId: string,
      programId: number,
      groupId: number,
      dayId: number,
      exerciseId: number,
      exercises: Exercises,
    ) => {
      const exercise = exercises.find((ex) => ex.id === exerciseId);
      if (!exercise) return;

      // Failsafe
      const fallbackPrograms = get().programs;
      const fallbackProgram = get().program;
      const fallbackDay = get().day;
      if (!fallbackProgram || !fallbackDay) return;

      // Optimistic Update
      const existingIds = fallbackDay.dayExercises.map((ex) => ex.id);
      let fakeId = genRandomInt();
      while (existingIds.includes(fakeId)) {
        fakeId = genRandomInt();
      }

      const optimisticExercise = {
        id: fakeId,
        updatedAt: new Date(),
        userId,
        exerciseId,
        programId,
        dayId,
        reps: [0, 0, 0, 0],
        weight: [0, 0, 0, 0],
        loggedSetsCount: 0,
        notes: {
          id: fakeId,
          name: exercise.notes[0]?.name ?? null,
          notes: null,
        },
        info: {
          id: exercise.id,
          name: exercise.name,
          equipment: null,
          primaryMuscle: null,
          secondaryMuscles: null,
          video: null,
        },
      };
      const optimisticDay = {
        ...fallbackDay,
        dayExercises: [...fallbackDay.dayExercises, optimisticExercise],
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
      }));

      // Actual Update
      try {
        const { id: realDayExerciseId } = await handleAddExercise(
          userId,
          programId,
          groupId,
          dayId,
          exerciseId,
        );
        if (!realDayExerciseId) throw "No realDayExerciseId error";
        const realExercise = await handleGetExercise(userId, realDayExerciseId);
        if (!realExercise) throw "No realExercise error";

        const actualDay = {
          ...optimisticDay,
          dayExercises: optimisticDay.dayExercises.map((ex) =>
            ex.id === fakeId ? realExercise : ex,
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
        }));
      } catch (error) {
        // Else Fallback Update
        console.error(error);
        set((state) => ({
          ...state,
          programs: fallbackPrograms,
          program: fallbackProgram,
          day: fallbackDay,
        }));
      }
    },

    updateExerciseName: async (
      userId: string,
      programId: number,
      dayId: number,
      exerciseId: number,
      newName: string,
      noteId?: number,
    ) => {
      // Failsafe
      const fallbackPrograms = get().programs;
      const fallbackProgram = get().program;
      const fallbackDay = get().day;
      if (!fallbackProgram || !fallbackDay) return;

      // Optimistic Update
      const fakeId = genRandomInt();
      const optimisticDay = {
        ...fallbackDay,
        dayExercises: fallbackDay.dayExercises.map((ex) =>
          ex.info.id === exerciseId
            ? {
                ...ex,
                notes: ex.notes
                  ? {
                      ...ex.notes,
                      name: newName,
                    }
                  : { id: fakeId, name: newName, notes: null },
              }
            : ex,
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
      }));

      // Actual Update
      try {
        const { id: realNoteId } = await handleEditExerciseName(
          userId,
          programId,
          exerciseId,
          newName,
          noteId,
        );
        if (!realNoteId) throw "No realNoteId error";

        const actualDay = {
          ...optimisticDay,
          dayExercises: optimisticDay.dayExercises.map((ex) =>
            ex.info.id === exerciseId
              ? { ...ex, notes: { ...ex.notes, id: realNoteId } }
              : ex,
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
        }));
      } catch (error) {
        // Else Fallback Update
        console.error(error);
        set((state) => ({
          ...state,
          programs: fallbackPrograms,
          program: fallbackProgram,
          day: fallbackDay,
        }));
      }
    },
  };
}

export function setDay(dayId: number) {
  const setDay = useProgram.getState().setDay;

  useEffect(() => setDay(dayId), [dayId]);
}
