"use client";

import { create } from "zustand";
import { programsActions } from "./actions/programs";
import { programActions } from "./actions/program";
import { dayActions } from "./actions/day";
import { exerciseActions } from "./actions/exercise";

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
  deleteProgram: (userId: string, programId: number) => void;

  // Program
  program: Program | null;
  setProgram: (programId: number) => void;
  createDay: (
    userId: string,
    programId: number,
    groupId: number,
    name: string,
    repeatOn: number[] | null,
  ) => void;
  updateDay: (
    userId: string,
    programId: number,
    dayId: number,
    newName: string,
    newRepeatOn: number[] | null,
  ) => void;
  deleteDay: (userId: string, programId: number, dayId: number) => void;
  createWeekWithDays: (userId: string, programId: number) => void;
  deleteWeek: (userId: string, programId: number, groupId: number) => void;

  // Day
  day: null | ProgramDay;
  setDay: (dayId: number) => void;

  // Exercise
  dayExercise: null | DayExercise;
  setDayExercise: (dayId: number, dayExerciseId: number) => void;
  updateDayExercise: (dayEx: DayExercise) => void;
}

export const useProgram = create<ProgramState>((set, get) => ({
  // Programs
  ...programsActions(set, get),
  // Program
  ...programActions(set, get),
  // Days
  ...dayActions(set, get),
  // Exercise
  ...exerciseActions(set, get),
}));
