"use client";

import { useEffect } from "react";
import { useProgram, type ProgramState } from "../useProgram";

import { genRandomInt, getFakeId } from "~/utils/helpers";
import {
  getChangedDay,
  getChangedProgram,
  getChangedPrograms,
} from "../../helpers";
import {
  handleAddExercise,
  handleDeleteExercise,
  handleEditExerciseName,
  handleEndWorkout,
  handleGetExercise,
  handleStartWorkout,
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
      const fakeId = getFakeId(existingIds);

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
      }));

      // Actual Update
      try {
        const { value: realDayExerciseId, err: addExErr } =
          await handleAddExercise(programId, groupId, dayId, exerciseId);
        if (!realDayExerciseId || addExErr)
          throw addExErr ? addExErr : "No realDayExerciseId error";
        const { value: realExercise, err: getExErr } =
          await handleGetExercise(realDayExerciseId);
        if (!realExercise || getExErr)
          throw getExErr ? getExErr : "No realExercise error";

        const actualDay = getChangedDay(optimisticDay, fakeId, realExercise);
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

    deleteExercise: async (
      userId: string,
      programId: number,
      dayId: number,
      dayExerciseId: number,
    ) => {
      // Failsafe
      const fallbackPrograms = get().programs;
      const fallbackProgram = get().program;
      const fallbackDay = get().day;
      if (!fallbackProgram || !fallbackDay) return;

      // Optimistic Update
      const badEggIndex = fallbackDay.dayExercises.findIndex(
        (dayEx) => dayEx.id === dayExerciseId,
      );
      const optimisticExercises = [...fallbackDay.dayExercises];
      optimisticExercises.splice(badEggIndex, 1);
      const optimisticDay = {
        ...fallbackDay,
        dayExercises: optimisticExercises,
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
        day: optimisticDay,
      }));

      // Actual Update
      try {
        const { err } = await handleDeleteExercise(dayExerciseId);
        if (err) throw err;
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
      }));

      // Actual Update
      try {
        const { value: realNoteId, err } = await handleEditExerciseName(
          exerciseId,
          newName,
          noteId,
        );
        if (!realNoteId || err) throw err ? err : "No realNoteId error";

        const actualDay = {
          ...optimisticDay,
          dayExercises: optimisticDay.dayExercises.map((ex) =>
            ex.info.id === exerciseId
              ? { ...ex, notes: { ...ex.notes, id: realNoteId } }
              : ex,
          ),
        };
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

    startWorkout: async (userId: string, programId: number, dayId: number) => {
      // Failsafe
      const fallbackPrograms = get().programs;
      const fallbackProgram = get().program;
      const fallbackDay = get().day;
      if (!fallbackProgram || !fallbackDay) return;

      // Optimistic Update
      const optimisticDay = {
        ...fallbackDay,
        startedWorkout: new Date(),
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
        day: optimisticDay,
      }));

      // Actual Update
      try {
        const { err } = await handleStartWorkout(dayId);
        if (err) throw err;
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

    endWorkout: async (userId: string, programId: number, dayId: number) => {
      // Failsafe
      const fallbackPrograms = get().programs;
      const fallbackProgram = get().program;
      const fallbackDay = get().day;
      if (!fallbackProgram || !fallbackDay) return;

      // Optimistic Update
      const optimisticDay = {
        ...fallbackDay,
        endedWorkout: new Date(),
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
        day: optimisticDay,
      }));

      // Actual Update
      try {
        const { err } = await handleEndWorkout(dayId);
        if (err) throw err;
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

export function SetDay({
  programId,
  dayId,
}: {
  programId: number;
  dayId: number;
}) {
  const setProgram = useProgram.getState().setProgram;
  const setProgramDay = useProgram.getState().setDay;

  useEffect(() => {
    setProgram(programId);
    setProgramDay(dayId);
  }, [programId, dayId]);

  return null;
}
