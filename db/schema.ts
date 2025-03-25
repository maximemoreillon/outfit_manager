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

export const outfitsTable = pgTable("outfits", {
  id: serial().primaryKey(),
  name: text().notNull().default("Unnnamed outfit"),
  description: text().default("No description"),
  comment: text(),
  rating: integer(),
  user_id: text(),
});

export const outfitGarmentsTable = pgTable("outfit_garments", {
  id: serial().primaryKey(),
  outfit_id: integer()
    .notNull()
    .references(() => outfitsTable.id),
  garment_id: integer()
    .notNull()
    .references(() => garmentsTable.id),
});
