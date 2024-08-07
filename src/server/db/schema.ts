// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { AdapterAccountType } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `temple_${name}`);

// * General
export const users = createTable(
  "user",
  {
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
    redirectOnLoadWorkout: boolean("redirect_on_load_workout")
      .notNull()
      .default(true),
    lastWorkoutRedirect: timestamp("last_workout_redirect"),
    weightInPounds: boolean("weight_in_pounds").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    idIndex: index().on(table.id),
  }),
);

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
    category: varchar("category", { length: 256 }),
    primaryMuscles: varchar("primary_muscles").array().notNull(),
    secondaryMuscles: varchar("secondary_muscles").array(),
    instructions: varchar("instructions").array().notNull(),
    tips: varchar("tips").notNull(),
    targetMuscleImages: varchar("target_muscle_images").array(),
    images: varchar("images").array(),
    videos: varchar("videos").array(),
    equipment: varchar("equipment"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    idIndex: index().on(table.id),
  }),
);

export const exercise_notes = createTable(
  "exercise_notes",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    exerciseId: integer("exercise_id")
      .notNull()
      .references(() => exercises.id, { onDelete: "cascade" }),
    notes: varchar("notes").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    idIndex: index().on(table.id),
    userIndex: index().on(table.userId),
  }),
);

export const workoutPrograms = createTable(
  "workout_programs",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name").default("New Program").notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    idIndex: index().on(table.id),
    userIndex: index().on(table.userId),
  }),
);

export const workoutProgramDayGroups = createTable(
  "workout_program_day_groups",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    programId: integer("program_id")
      .notNull()
      .references(() => workoutPrograms.id, { onDelete: "cascade" }),
  },
  (table) => ({
    idIndex: index().on(table.id),
    programIndex: index().on(table.programId),
  }),
);

export const workoutProgramDays = createTable(
  "workout_program_days",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    programId: integer("program_id")
      .notNull()
      .references(() => workoutPrograms.id, { onDelete: "cascade" }),
    groupId: integer("group_id")
      .notNull()
      .references(() => workoutProgramDayGroups.id, { onDelete: "cascade" }),
    name: varchar("name").default("New Day").notNull(),
    repeatOn: integer("repeat").array(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    idIndex: index().on(table.id),
    programIndex: index().on(table.programId),
  }),
);

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
    userIndex: index().on(table.userId),
    dayIndex: index().on(table.dayId),
  }),
);

export const workoutProgramRelations = relations(
  workoutPrograms,
  ({ one, many }) => ({
    user: one(users, {
      fields: [workoutPrograms.userId],
      references: [users.id],
    }),
    groups: many(workoutProgramDayGroups),
    programDays: many(workoutProgramDays),
  }),
);

export const workoutGroupRelations = relations(
  workoutProgramDayGroups,
  ({ one, many }) => ({
    user: one(users, {
      fields: [workoutProgramDayGroups.userId],
      references: [users.id],
    }),
    program: one(workoutPrograms, {
      fields: [workoutProgramDayGroups.programId],
      references: [workoutPrograms.id],
    }),
    groupDays: many(workoutProgramDays),
  }),
);

export const workoutProgramDayRelations = relations(
  workoutProgramDays,
  ({ one, many }) => ({
    user: one(users, {
      fields: [workoutProgramDays.userId],
      references: [users.id],
    }),
    program: one(workoutPrograms, {
      fields: [workoutProgramDays.programId],
      references: [workoutPrograms.id],
    }),
    group: one(workoutProgramDayGroups, {
      fields: [workoutProgramDays.groupId],
      references: [workoutProgramDayGroups.id],
    }),
    dayExercises: many(workoutDayExercises),
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

// * Sheer Related
export const sheerResponses = createTable(
  "sheer_responses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    response: boolean("response").notNull(),
    why: varchar("why"),
    date: timestamp("date", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    userIndex: index().on(table.userId),
    dateIndex: index().on(table.date),
  }),
);
