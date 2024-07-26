import {
  getMyDayExercise,
  getMyPrograms,
  getMyProgram,
  getMyProgramDay,
} from "./queries/workouts";
import { getExercises } from "./queries/exercises";

export type WorkoutPrograms = Awaited<ReturnType<typeof getMyPrograms>>;
export type Program = Awaited<ReturnType<typeof getMyProgram>>;
export type ProgramDay = Awaited<ReturnType<typeof getMyProgramDay>>;
export type DayExercise = Awaited<ReturnType<typeof getMyDayExercise>>;
export type Exercises = Awaited<ReturnType<typeof getExercises>>;
