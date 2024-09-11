import { createTable } from "../helper";
import { sql } from "drizzle-orm";
import {
  index,
  varchar,
  serial,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "~/server/db/schema";

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
