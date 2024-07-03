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
  primaryKey,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { DailyMacros } from "../types";
import { AdapterAccountType } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `temple_${name}`);

// * General
export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccountType>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
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
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    idIndex: index("ex_id_idx").on(table.id),
  }),
);

export const exercise_notes = createTable(
  "exercise_notes",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    exerciseId: integer("exercise_id")
      .notNull()
      .references(() => exercises.id),
    notes: varchar("notes").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    idIndex: index("ex_notes_id_idx").on(table.id),
  }),
);

export const workouts = createTable(
  "workouts",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    name: varchar("name").default("New Plan").notNull(),
    nextOccurrenceDate: date("next_occurrence_date"),
    activeThroughDate: date("active_through_date"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
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
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    workoutId: integer("workout_id")
      .notNull()
      .references(() => workouts.id),
    exerciseId: integer("exercise_id")
      .notNull()
      .references(() => exercises.id),
    reps: integer("reps")
      .array()
      .default(sql`ARRAY[0,0,0,0]::integer[]`)
      .notNull(),
    weight: integer("weight")
      .array()
      .default(sql`ARRAY[0,0,0,0]::integer[]`)
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    idIndex: index("sess_ex_id_idx").on(table.id),
  }),
);

// * Weigh In Related
export const weigh_ins = createTable(
  "weigh_ins",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
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
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    idIndex: index("weigh_id_idx").on(table.id),
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
