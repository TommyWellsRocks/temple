import { createTable } from "../helper";
import { relations } from "drizzle-orm";
import { index, varchar, serial, integer } from "drizzle-orm/pg-core";
import { users, workoutPrograms, workoutProgramDays } from "~/server/db/schema";

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
