"use client";

import { create } from "zustand";
import { programActions } from "./programActions";
import { dayActions } from "./dayActions";
import { exerciseActions } from "./exerciseActions";

import type { Program, ProgramDay, DayExercise } from "~/server/types";

// * NOTE: PROGRAM IS THE PARENT. DAY AND EXERCISE ARE COPIES OF ITEMS WITHIN PROGRAM. NOT REFERENCES.
// * SO WHENEVER YOU UPDATE AN ITEM, UPDATE THE PARENT.

export interface ProgramState {
  // Program
  program: Program | null;
  setProgram: (program: Program) => void;
  setProgramDetails: (
    newName: string,
    newStartDate: Date,
    newEndDate: Date,
  ) => void;
  // Day
  day: null | ProgramDay;
  setDay: (dayId: number) => void;
  setDayDetails: (
    dayId: number,
    newName: string,
    newRepeatOn: number[] | null,
  ) => void;
  setStartWorkout: (dayId: number, startedWorkout: Date) => void;
  setEndWorkout: (dayId: number, endedWorkout: Date) => void;
  // Exercise
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
