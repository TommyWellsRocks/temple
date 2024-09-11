import { createTable } from "../helper";
import { relations, sql } from "drizzle-orm";
import {
  index,
  varchar,
  serial,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { users, exercises } from "~/server/db/schema";

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
    name: varchar("name"),
    notes: varchar("notes"),
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

export const exerciseNotesRelations = relations(exercise_notes, ({ one }) => ({
  note: one(exercises, {
    fields: [exercise_notes.exerciseId],
    references: [exercises.id],
  }),
}));
