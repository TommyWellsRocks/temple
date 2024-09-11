import { createTable } from "../helper";
import { relations, sql } from "drizzle-orm";
import { index, serial, integer, timestamp, text } from "drizzle-orm/pg-core";
import {
  users,
  workoutPrograms,
  workoutProgramDayGroups,
  workoutProgramDays,
  exercises,
  exercise_notes,
} from "~/server/db/schema";

export const workoutDayExercises = createTable(
  "workout_day_exercises",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    programId: integer("program_id")
      .notNull()
      .references(() => workoutPrograms.id, { onDelete: "cascade" }),
    groupId: integer("group_id")
      .notNull()
      .references(() => workoutProgramDayGroups.id, { onDelete: "cascade" }),
    dayId: integer("day_id")
      .notNull()
      .references(() => workoutProgramDays.id, { onDelete: "cascade" }),
    exerciseId: integer("exercise_id")
      .notNull()
      .references(() => exercises.id, { onDelete: "cascade" }),
    reps: integer("reps").array().notNull(),
    weight: integer("weight").array().notNull(),
    loggedSetsCount: integer("logged_sets_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    userIndex: index().on(table.userId),
    dayIndex: index().on(table.dayId),
  }),
);

export const workoutDayExerciseRelations = relations(
  workoutDayExercises,
  ({ one }) => ({
    day: one(workoutProgramDays, {
      fields: [workoutDayExercises.dayId],
      references: [workoutProgramDays.id],
    }),
    info: one(exercises, {
      fields: [workoutDayExercises.exerciseId],
      references: [exercises.id],
    }),
    notes: one(exercise_notes, {
      fields: [workoutDayExercises.exerciseId],
      references: [exercise_notes.exerciseId],
    }),
  }),
);
