"use client";

import { create } from "zustand";
import { programsActions } from "./actions/programsActions";
import { programActions } from "./actions/programActions";
import { dayActions } from "./actions/dayActions";
import { exerciseActions } from "./actions/exerciseActions";

import type {
  Program,
  ProgramDay,
  DayExercise,
  WorkoutPrograms,
} from "~/server/types";

// * NOTE: PROGRAM IS THE PARENT. DAY AND EXERCISE ARE COPIES OF ITEMS WITHIN PROGRAM. NOT REFERENCES.
// * SO WHENEVER YOU UPDATE AN ITEM, UPDATE THE PARENT.

export interface ProgramState {
  // Programs
  programs: WorkoutPrograms | [];
  setPrograms: (programs: WorkoutPrograms) => void;
  createProgram: (
    name: string,
    userId: string,
    startDate: Date,
    endDate: Date,
  ) => void;
  updateProgram: (
    userId: string,
    programId: number,
    name: string,
    startDate: Date,
    endDate: Date,
  ) => void;

  // Program
  program: Program | null;
  setProgram: (programId: number) => void;
  setProgramDetails: (
    newName: string,
    newStartDate: Date,
    newEndDate: Date,
  ) => void;

  // Day
  day: null | ProgramDay;
  setDay: (dayId: number) => void;
  updateDay: (day: ProgramDay) => void;

  // Exercise
  dayExercise: null | DayExercise;
  setDayExercise: (dayId: number, dayExerciseId: number) => void;
  updateDayExercise: (dayEx: DayExercise) => void;
}

export const useProgram = create<ProgramState>((set, get) => ({
  ...programsActions(set, get),
  // Program
  ...programActions(set, get),
  // Days
  ...dayActions(set, get),
  // Exercise
  ...exerciseActions(set, get),
}));
