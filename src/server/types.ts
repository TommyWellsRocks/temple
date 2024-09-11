import type { getMyPrograms } from "./db/queries/workout/program";
import type { getMyProgram } from "./db/queries/workout/program";
import type {
  dayExerciseFromProgram,
  dayFromProgram,
} from "./db/queries/workout/types";
import type { getUserExercises } from "./db/queries/workout/exercises";
import type { getExerciseHistory } from "./db/queries/workout/dayExercises";

export type WorkoutPrograms = Awaited<ReturnType<typeof getMyPrograms>>;
export type Program = Awaited<ReturnType<typeof getMyProgram>>;
export type ProgramDay = Awaited<ReturnType<typeof dayFromProgram>>;
export type DayExercise = Awaited<ReturnType<typeof dayExerciseFromProgram>>;
export type Exercises = Awaited<ReturnType<typeof getUserExercises>>;
export type ExerciseHistory = Awaited<ReturnType<typeof getExerciseHistory>>;
