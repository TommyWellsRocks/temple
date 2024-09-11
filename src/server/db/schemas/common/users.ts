import { createTable } from "../helper";
import { relations, sql } from "drizzle-orm";
import { boolean, index, timestamp, varchar } from "drizzle-orm/pg-core";
import { accounts } from "~/server/db/schema";

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
