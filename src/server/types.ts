import type { getMyPrograms } from "./db/queries/workout/program";
import type { getExercisesForUser } from "./db/queries/workout/exercises";
import type { getExerciseHistory } from "./db/queries/workout/dayExercises";
import type { TitleCaseEquipment, TitleCaseMuscle } from "doNotChangeMe";

export type WorkoutPrograms = Awaited<ReturnType<typeof getMyPrograms>>;
export type Program = WorkoutPrograms[0];
export type ProgramDay = Program["programDays"][0];
export type DayExercise = ProgramDay["dayExercises"][0];
export type Exercises = Awaited<ReturnType<typeof getExercisesForUser>>;
export type ExerciseHistory = Awaited<ReturnType<typeof getExerciseHistory>>;

// Admin
export interface ExerciseFormat {
  id: number | null;
  name: string;
  equipment: TitleCaseEquipment[];
  primaryMuscle: TitleCaseMuscle;
  secondaryMuscles: TitleCaseMuscle[];
  video: undefined;
}

export interface FormattedJsonExercise {
  id: number | undefined;
  name: string;
  equipment: TitleCaseEquipment[];
  primaryMuscle: TitleCaseMuscle;
  secondaryMuscles: TitleCaseMuscle[];
  video: undefined;
}
