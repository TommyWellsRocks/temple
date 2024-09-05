import type {
  getMyDayExercise,
  getMyPrograms,
  getMyProgram,
  getMyProgramDay,
} from "./queries/workouts";
import type { getExercises } from "./queries/exercises";

export type WorkoutPrograms = Awaited<ReturnType<typeof getMyPrograms>>;
export type Program = Awaited<ReturnType<typeof getMyProgram>>;
export type ProgramDay = Awaited<ReturnType<typeof getMyProgramDay>>;
export type DayExercise = Awaited<ReturnType<typeof getMyDayExercise>>;
export type Exercises = Awaited<ReturnType<typeof getExercises>>;


export interface ProgDay {
  repeatOn: number[] | null;
  name: string;
  id: number;
  userId: string;
  programId: number;
}