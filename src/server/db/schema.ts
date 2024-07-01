// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgTableCreator,
  real,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { DailyMacros } from "../types";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `specbody_${name}`);

// * General
export const users = createTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    password: varchar("password").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    idIndex: index("users_id_idx").on(table.id),
  }),
);

// * Workout Related
export const exercises = createTable(
  "exercises",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).unique().notNull(),
    category: varchar("category", { length: 256 }).notNull(),
    primaryMuscles: varchar("primary_muscles").array().notNull(),
    secondaryMuscles: varchar("secondary_muscles").array(),
    instructions: varchar("instructions").array().notNull(),
    tips: varchar("tips").notNull(),
    isSingleArmBased: boolean("is_single_arm_based").default(false),
    isSingleLegBased: boolean("is_single_leg_based").default(false),
    targetMuscleImages: varchar("target_muscle_images").array(),
    images: varchar("images").array(),
    videos: varchar("videos").array(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    idIndex: index("exercises_id_idx").on(table.id),
  }),
);

export const exercise_notes = createTable(
  "exercise_notes",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    exerciseId: integer("exercise_id")
      .notNull()
      .references(() => exercises.id),
    notes: varchar("notes").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    idIndex: index("exercise_notes_id_idx").on(table.id),
  }),
);

export const workouts = createTable(
  "workouts",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    name: varchar("name").default("New Plan").notNull(),
    nextOccurrenceDate: date("next_occurrence_date"),
    activeThroughDate: date("active_through_date"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    idIndex: index("workouts_id_idx").on(table.id),
  }),
);

export const workout_session_exercises = createTable(
  "workout_session_exercises",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    workoutId: integer("workout_id")
      .notNull()
      .references(() => workouts.id),
    exerciseId: integer("exercise_id")
      .notNull()
      .references(() => exercises.id),
    reps: integer("reps").array().notNull(),
    weight: integer("weight").array().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    idIndex: index("workout_session_exercises_id_idx").on(table.id),
  }),
);

// * Weigh In Related
export const weigh_ins = createTable(
  "weigh_ins",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    picture: varchar("picture"),
    video: varchar("video"),
    dailyMacros: jsonb("daily_macros").$type<DailyMacros>(),
    variablesChanged: varchar("variables_changed"),
    weight: real("weight").notNull(),
    bodyFatPercentage: real("body_fat_percentage"),
    notes: varchar("notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    idIndex: index("weigh_ins_id_idx").on(table.id),
  }),
);

export const userRelations = relations(users, ({ many }) => ({
  workouts: many(workouts),
}));

export const workoutRelations = relations(workouts, ({ one, many }) => ({
  user: one(users, {
    fields: [workouts.userId],
    references: [users.id],
  }),
  sessionExercises: many(workout_session_exercises),
}));

export const sessionExerciseRelations = relations(
  workout_session_exercises,
  ({ one }) => ({
    workout: one(workouts, {
      fields: [workout_session_exercises.workoutId],
      references: [workouts.id],
    }),
    info: one(exercises, {
      fields: [workout_session_exercises.exerciseId],
      references: [exercises.id],
    }),
    notes: one(exercise_notes, {
      fields: [workout_session_exercises.exerciseId],
      references: [exercise_notes.exerciseId],
    }),
  }),
);
