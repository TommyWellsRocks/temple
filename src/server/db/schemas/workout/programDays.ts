import { createTable } from "../helper";
import { relations, sql } from "drizzle-orm";
import {
  index,
  varchar,
  serial,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import {
  users,
  workoutPrograms,
  workoutProgramDayGroups,
  workoutDayExercises,
} from "~/server/db/schema";

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
    startedWorkout: timestamp("started_at", { withTimezone: true }),
    endedWorkout: timestamp("ended_at", { withTimezone: true }),
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
