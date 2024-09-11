// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

// import { pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
// export const createTable = pgTableCreator((name) => `temple_${name}`);

// * common
export { users, usersRelations } from "~/server/db/schemas/common/users";
export {
  accounts,
  accountsRelations,
} from "~/server/db/schemas/common/accounts";
export {
  sessions,
  sessionsRelations,
} from "~/server/db/schemas/common/sessions";
export { verificationTokens } from "~/server/db/schemas/common/verificationTokens";

// * Workout Related
export {
  exercises,
  exerciseRelations,
} from "~/server/db/schemas/workout/exercises";
export {
  exercise_notes,
  exerciseNotesRelations,
} from "~/server/db/schemas/workout/exerciseNotes";
export {
  workoutPrograms,
  workoutProgramRelations,
} from "~/server/db/schemas/workout/programs";
export {
  workoutProgramDayGroups,
  workoutGroupRelations,
} from "~/server/db/schemas/workout/programDayGroups";
export {
  workoutProgramDays,
  workoutProgramDayRelations,
} from "~/server/db/schemas/workout/programDays";
export {
  workoutDayExercises,
  workoutDayExerciseRelations,
} from "~/server/db/schemas/workout/dayExercises";

// * Sheer Related
export { sheerResponses } from "~/server/db/schemas/sheer/sheerResponses";
