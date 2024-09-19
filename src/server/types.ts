import type { getMyPrograms } from "./db/queries/workout/program";
import type { getExercisesForUser } from "./db/queries/workout/exercises";
import type { getExerciseHistory } from "./db/queries/workout/dayExercises";

export type WorkoutPrograms = Awaited<ReturnType<typeof getMyPrograms>>;
export type Program = WorkoutPrograms[0];
export type ProgramDay = Program["programDays"][0];
export type DayExercise = ProgramDay["dayExercises"][0];
export type Exercises = Awaited<ReturnType<typeof getExercisesForUser>>;
export type ExerciseHistory = Awaited<ReturnType<typeof getExerciseHistory>>;
