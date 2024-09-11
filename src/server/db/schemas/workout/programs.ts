import { createTable } from "../helper";
import { relations, sql } from "drizzle-orm";
import { index, varchar, serial, timestamp } from "drizzle-orm/pg-core";
import {
  users,
  workoutProgramDays,
  workoutProgramDayGroups,
} from "~/server/db/schema";

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
