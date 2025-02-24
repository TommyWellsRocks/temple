import type { getMyPrograms } from "./db/queries/workout/program";
import type { getExercisesForUser } from "./db/queries/workout/exercises";
import type { getExerciseHistory } from "./db/queries/workout/dayExercises";
import type { TitleCaseEquipment, TitleCaseMuscle } from "doNotChangeMe";

export type WorkoutPrograms = NonNullable<Awaited<ReturnType<typeof getMyPrograms>>["value"]>;
export type Program = WorkoutPrograms[0];
export type ProgramDay = Program["programDays"][0];
export type DayExercise = ProgramDay["dayExercises"][0];
export type Exercises = NonNullable<Awaited<ReturnType<typeof getExercisesForUser>>["value"]>;
export type ExerciseHistory = NonNullable<Awaited<ReturnType<typeof getExerciseHistory>>["value"]>;

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
