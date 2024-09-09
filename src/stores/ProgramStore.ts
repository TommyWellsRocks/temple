"use client";

import { create } from "zustand";
import type { Program, ProgramDay, DayExercise } from "~/server/types";
import { useEffect } from "react";
import {
  handleExerciseSetsChange,
  handleExerciseVolumeInput,
  handleUpdateLoggedSets,
} from "~/server/actions/workout/ExerciseActions";
import {
  handleEndWorkout,
  handleStartWorkout,
} from "~/server/actions/workout/DayActions";

interface ProgramState {
  program: Program | null;
  programGroups:
    | {
        id: number;
        groupDays: ProgramDay[];
      }[]
    | null;
  setProgram: (program: Program) => void;
  setProgramGroups: (program: Program) => void;
  setProgramDetails: (
    newName: string,
    newStartDate: Date,
    newEndDate: Date,
  ) => void;
  day: null | ProgramDay;
  setDay: (dayId: number) => void;
  setDayDetails: (
    dayId: number,
    newName: string,
    newRepeatOn: number[] | null,
  ) => void;
  setStartWorkout: (userId: string, dayId: number) => void;
  setEndWorkout: (userId: string, dayId: number) => void;
  dayExercise: null | DayExercise;
  setDayExercise: (dayId: number, dayExerciseId: number) => void;
  setDayExerciseInputs: (
    label: "Reps" | "Weight",
    index: number,
    value: number,
  ) => void;
  setDayExerciseSets: (method: "Add" | "Delete") => void;
  setDayExerciseLoggedSet: (loggedSetsCount: number) => void;
}

export const useProgram = create<ProgramState>((set) => ({
  program: null,
  programGroups: null,
  setProgram: (program) => set({ program }),
  setProgramGroups: (program) => {
    const groupObjects: { id: number; groupDays: ProgramDay[] }[] = []; // Groups[groupDays, id]
    new Set(program?.programDays.map((day) => day.groupId)).forEach((groupId) =>
      groupObjects.push({ id: groupId, groupDays: [] }),
    );
    program?.programDays.forEach((day) =>
      groupObjects
        .find((group) => group.id === day.groupId)
        ?.groupDays.push(day),
    );
    groupObjects.sort((a, b) => a.id - b.id);
    return set({ programGroups: groupObjects });
  },
  setProgramDetails: (newName, newStartDate, newEndDate) =>
    set((state) => {
      if (!state.program) return state;
      return {
        ...state,
        program: {
          ...state.program,
          name: newName,
          startDate: newStartDate,
          endDate: newEndDate,
        },
      };
    }),
  // Days
  day: null,
  setDay: (dayId) =>
    set((state) => {
      const day = state.program?.programDays.find((day) => day.id === dayId);

      return {
        ...state,
        day,
      };
    }),
  setDayDetails: (dayId, newName, newRepeatOn) =>
    set((state) => {
      if (!state.program) return state;

      // Update programDays
      const updatedProgramDays = state.program.programDays.map((day) =>
        day.id === dayId
          ? { ...day, name: newName, repeatOn: newRepeatOn }
          : day,
      );

      return {
        ...state,
        program: {
          ...state.program,
          programDays: updatedProgramDays,
        },
      };
    }),
  setStartWorkout: (userId, dayId) =>
    set((state) => {
      if (!state.program || !state.day) return state;

      const startedWorkout = new Date();

      // Update programDays
      const updatedProgramDays = state.program.programDays.map((day) =>
        day.id === dayId ? { ...day, startedWorkout } : day,
      );

      handleStartWorkout(userId, dayId, startedWorkout);

      return {
        ...state,
        day: {
          ...state.day,
          startedWorkout,
        },
        program: {
          ...state.program,
          programDays: updatedProgramDays,
        },
      };
    }),
  setEndWorkout: (userId, dayId) =>
    set((state) => {
      if (!state.program || !state.day) return state;

      const endedWorkout = new Date();

      // Update programDays
      const updatedProgramDays = state.program.programDays.map((day) =>
        day.id === dayId ? { ...day, endedWorkout } : day,
      );

      handleEndWorkout(userId, dayId, endedWorkout);

      return {
        ...state,
        day: {
          ...state.day,
          endedWorkout,
        },
        program: {
          ...state.program,
          programDays: updatedProgramDays,
        },
      };
    }),
  // Exercise
  dayExercise: null,
  setDayExercise: (dayId, dayExerciseId) => {
    set((state) => {
      const dayEx = state.program?.programDays
        .find((day) => day.id === dayId)
        ?.dayExercises.find((ex) => ex.id === dayExerciseId);
      return { ...state, dayExercise: dayEx };
    });
  },
  setDayExerciseInputs: (label, index, value) =>
    set((state) => {
      const dayEx = state.dayExercise;
      if (!dayEx) return state;

      if (
        (label === "Reps" && dayEx?.reps[index] !== value) ||
        (label === "Weight" && dayEx?.weight[index] !== value)
      ) {
        if (label === "Reps") {
          dayEx.reps[index] = value;
          console.log(dayEx.reps);
        } else if (label === "Weight") {
          for (let i = index; i < dayEx.weight.length; i++) {
            dayEx.weight[i] = value;
          }
        }
        handleExerciseVolumeInput(
          dayEx.id,
          dayEx.userId,
          dayEx.reps,
          dayEx.weight,
        );

        return {
          ...state,
          dayExercise: dayEx,
        };
      } else return state;
    }),
  setDayExerciseSets: (method) =>
    set((state) => {
      const dayEx = state.dayExercise;
      if (!dayEx) return state;

      if (method === "Add") {
        dayEx.reps.push(0);
        dayEx.weight.push(dayEx.weight[dayEx.weight.length - 1] || 0);
      } else {
        dayEx.reps.pop();
        dayEx.weight.pop();
        if (dayEx.loggedSetsCount > dayEx.reps.length) {
          dayEx.loggedSetsCount--;
        }
      }

      handleExerciseSetsChange(
        dayEx.id,
        dayEx.userId,
        dayEx.reps,
        dayEx.weight,
        dayEx.loggedSetsCount,
      );

      return {
        ...state,
        dayExercise: dayEx,
      };
    }),
  setDayExerciseLoggedSet: (loggedSetsCount) =>
    set((state) => {
      const dayEx = state.dayExercise;
      if (!dayEx) return state;

      dayEx.loggedSetsCount = loggedSetsCount;

      handleUpdateLoggedSets(dayEx.id, dayEx.userId, dayEx.loggedSetsCount);

      return {
        ...state,
        dayExercise: dayEx,
      };
    }),
}));

export function SetProgram({ program }: { program: Program }) {
  const setProgram = useProgram.getState().setProgram;
  const setProgramGroups = useProgram.getState().setProgramGroups;

  useEffect(() => {
    setProgram(program);
    setProgramGroups(program);
  }, [program, setProgram]);

  return null;
}

export function setDay(dayId: number) {
  const setDay = useProgram.getState().setDay;

  useEffect(() => setDay(dayId), [dayId]);
}

export function setDayExercise(dayId: number, dayExerciseId: number) {
  const setDayEx = useProgram.getState().setDayExercise;

  useEffect(() => setDayEx(dayId, dayExerciseId), [dayId, dayExerciseId]);
}
