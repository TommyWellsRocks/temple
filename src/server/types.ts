import {
  getDayExercise,
  getMyWorkoutPrograms,
  getProgram,
  getProgramDay,
} from "./queries/workouts";
import { getExercises } from "./queries/exercises";

export interface SessionExercise {
  id: number;
  userId: string;
  dayId: number;
  exerciseId: number;
  reps: number[];
  weight: number[];
  createdAt: Date;
  updatedAt: Date;
}

export type WorkoutPrograms = Awaited<ReturnType<typeof getMyWorkoutPrograms>>;
export type Program = Awaited<ReturnType<typeof getProgram>>;
export type ProgramDay = Awaited<ReturnType<typeof getProgramDay>>;
export type DayExercise = Awaited<ReturnType<typeof getDayExercise>>;
export type Exercises = Awaited<ReturnType<typeof getExercises>>;
