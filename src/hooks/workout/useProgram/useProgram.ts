"use client";

import { create } from "zustand";
import { programActions } from "./programActions";
import { dayActions } from "./dayActions";
import { exerciseActions } from "./exerciseActions";

import type { Program, ProgramDay, DayExercise } from "~/server/types";

export interface ProgramState {
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
  setStartWorkout: (dayId: number, startedWorkout: Date) => void;
  setEndWorkout: (dayId: number, endedWorkout: Date) => void;
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
  // Program
  ...programActions(set),
  // Days
  ...dayActions(set),
  // Exercise
  ...exerciseActions(set),
}));
