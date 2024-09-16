import { createTable } from "../helper";
import { relations } from "drizzle-orm";
import { index, varchar, serial } from "drizzle-orm/pg-core";
import { exercise_notes, users } from "~/server/db/schema";

export const exercises = createTable(
  "exercises",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    name: varchar("name", { length: 256 }).notNull(),
    equipment: varchar("equipment").array(),
    primaryMuscle: varchar("primary_muscle"),
    secondaryMuscles: varchar("secondary_muscles").array(),
    video: varchar("video"),
  },
  (table) => ({
    idIndex: index().on(table.id),
  }),
);

export const exerciseRelations = relations(exercises, ({ many }) => ({
  notes: many(exercise_notes),
}));
