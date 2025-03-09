import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const garmentsTable = pgTable("garments", {
  id: serial().primaryKey(),
  name: text().notNull(),
  quantity: integer().notNull().default(1),
  description: text(),
  image: text(),
  color: text(),
  brand: text(),
  size: text(),
  rating: integer(),
  condition: integer().notNull().default(100),
  // TODO: user_id
});
