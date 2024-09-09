import type {
  getMyPrograms,
  getMyProgram,
  dayFromProgram,
  dayExerciseFromProgram,
  getExerciseHistory,
} from "./queries/workouts";
import type { getExercises } from "./queries/exercises";

export type WorkoutPrograms = Awaited<ReturnType<typeof getMyPrograms>>;
export type Program = Awaited<ReturnType<typeof getMyProgram>>;
export type ProgramDay = Awaited<ReturnType<typeof dayFromProgram>>;
export type DayExercise = Awaited<ReturnType<typeof dayExerciseFromProgram>>;
export type Exercises = Awaited<ReturnType<typeof getExercises>>;
export type ExerciseHistory = Awaited<ReturnType<typeof getExerciseHistory>>