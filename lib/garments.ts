"use server";

import { garmentsTable } from "@/db/schema";
import { db } from "../db";
import { eq, count, ilike, and } from "drizzle-orm";

export async function createGarment(
  properties: typeof garmentsTable.$inferInsert
) {
  const [newGarment] = await db
    .insert(garmentsTable)
    .values(properties)
    .returning();

  return newGarment;
}

// TODO: make it more specific
// TODO: | null is not nice
type ReadGarmentsParams = {
  limit?: string;
  offset?: string;
  search?: string | null;
  brand?: string | null;
  type?: string | null;
  color?: string | null;
};
export async function readGarments(queryParams: ReadGarmentsParams) {
  const limit = Number(queryParams.limit || "10");
  const offset = Number(queryParams.offset || "0");

  const { search, brand, type, color } = queryParams;

  // TODO: allow filtering by color, brand, etc

  const where = and(
    search ? ilike(garmentsTable.name, `%${search}%`) : undefined,
    brand ? eq(garmentsTable.brand, brand) : undefined,
    type ? eq(garmentsTable.type, type) : undefined,
    color ? eq(garmentsTable.color, color) : undefined
  );

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(garmentsTable)
    .where(where);

  const garments = await db
    .select()
    .from(garmentsTable)
    .where(where)
    .offset(Number(offset))
    .limit(Number(limit));

  return { items: garments, limit, offset, total };
}

export async function readGarment(id: number) {
  const [garment] = await db
    .select()
    .from(garmentsTable)
    .where(eq(garmentsTable.id, id));
  return garment;
}

export async function updateGarment(
  id: number,
  values: typeof garmentsTable.$inferInsert
) {
  const [garment] = await db
    .update(garmentsTable)
    .set(values)
    .where(eq(garmentsTable.id, Number(id)))
    .returning();

  return garment;
}

export async function deleteGarment(id: number) {
  await db.delete(garmentsTable).where(eq(garmentsTable.id, Number(id)));

  return { id };
}
