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
  Exercises,
} from "~/server/types";

// * NOTE: PROGRAM IS THE PARENT. DAY AND EXERCISE ARE COPIES OF ITEMS WITHIN PROGRAM. NOT REFERENCES.
// * SO WHENEVER YOU UPDATE AN ITEM, UPDATE THE PARENT.
// ! CURRENTLY EACH CATEGORY ONLY UPDATES ITSELF AND IT'S PARENT ONLY ie: deleteExercise won't work right if delete while on exercise

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
    programId: number,
    name: string,
    startDate: Date,
    endDate: Date,
  ) => void;
  deleteProgram: (programId: number) => void;

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
    programId: number,
    dayId: number,
    newName: string,
    newRepeatOn: number[] | null,
  ) => void;
  deleteDay: (programId: number, dayId: number) => void;
  createWeekWithDays: (programId: number) => void;
  deleteWeek: (programId: number, groupId: number) => void;

  // Day
  day: null | ProgramDay;
  setDay: (dayId: number) => void;
  addExercise: (
    userId: string,
    programId: number,
    groupId: number,
    dayId: number,
    exerciseId: number,
    exercises: Exercises,
  ) => void;
  deleteExercise: (
    userId: string,
    programId: number,
    dayId: number,
    dayExerciseId: number,
  ) => void;
  updateExerciseName: (
    userId: string,
    programId: number,
    dayId: number,
    exerciseId: number,
    newName: string,
    noteId?: number,
  ) => void;
  startWorkout: (userId: string, programId: number, dayId: number) => void;
  endWorkout: (userId: string, programId: number, dayId: number) => void;

  // Exercise
  dayExercise: null | DayExercise;
  setDayExercise: (dayExerciseId: number) => void;
  updateExerciseVolume: (
    programId: number,
    dayId: number,
    dayExerciseId: number,
    reps: number[],
    weight: number[],
  ) => void;
  updateExerciseSets: (
    programId: number,
    dayId: number,
    dayExerciseId: number,
    reps: number[],
    weight: number[],
    loggedSetsCount: number,
  ) => void;
  updateExerciseLoggedSets: (
    programId: number,
    dayId: number,
    dayExerciseId: number,
    loggedSetsCount: number,
  ) => void;
  updateExerciseNote: (
    programId: number,
    dayId: number,
    dayExerciseId: number,
    exerciseId: number,
    noteValue: string,
    noteId?: number,
  ) => void;
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
