import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const garmentsTable = pgTable("garments", {
  id: serial().primaryKey(),
  name: text().notNull().default("Unnnamed garment"),
  description: text().default("No description"),
  image: text(),
  color: text(),
  brand: text(),
  comment: text(),
  type: text(),
  size: text(),
  quantity: integer().notNull().default(1),
  rating: integer(),
  condition: integer().notNull().default(100),
  user_id: text(),
});
