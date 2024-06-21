// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
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

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `specbody_${name}`);

export const users = createTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (table) => ({
    idIndex: index("users_id_idx").on(table.id),
  }),
);

export const exercises = createTable(
  "exercises",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    category: varchar("category", { length: 256 }).notNull(),
    primaryMuscles: varchar("primary_muscles").array().notNull(),
    secondaryMuscles: varchar("secondary_muscles").array(),
    instructions: varchar("instructions").array().notNull(),
    tips: varchar("instructions").notNull(),
    isSingleArmBased: boolean("is_single_arm_based").default(false),
    isSingleLegBased: boolean("is_single_leg_based").default(false),
    targetMuscleImages: varchar("target_muscle_images").array(),
    images: varchar("images").array(),
    videos: varchar("videos").array(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: integer("created_by")
      .default(0)
      .notNull()
      .references(() => users.id),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (table) => ({
    idIndex: index("exercises_id_idx").on(table.id),
  }),
);

interface WorkoutItem {
  exerciseId: number;
  setCount: number;
  reps: number[];
  weight: number[];
}

export const workout_sessions = createTable(
  "workout_sessions",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    workoutItems: jsonb("workout_items").$type<WorkoutItem[]>(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (table) => ({
    idIndex: index("workout_sessions_id_idx").on(table.id),
  }),
);

export const workout_plans = createTable(
  "workout_plans",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    workoutItems: jsonb("workout_items").$type<WorkoutItem[]>(),
    nextOccurrenceDate: date("next_occurrence_date"),
    activeThroughDate: date("active_through_date"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (table) => ({
    idIndex: index("workout_plans_id_idx").on(table.id),
  }),
);

interface DailyMacros {
  calories: number;
  carbs: number;
  fats: number;
  protein: number;
}

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
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (table) => ({
    idIndex: index("weigh_ins_id_idx").on(table.id),
  }),
);
