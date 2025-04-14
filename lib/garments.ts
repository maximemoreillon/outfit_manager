"use server";

import { garmentsTable } from "@/db/schema";
import { db } from "../db";
import { eq, count, ilike } from "drizzle-orm";

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
type ReadGarmentsParams = {
  limit?: string;
  offset?: string;
  search?: string | null;
};
export async function readGarments(queryParams: ReadGarmentsParams) {
  const limit = Number(queryParams.limit || "5");
  const offset = Number(queryParams.offset || "0");

  const { search } = queryParams;

  // TODO: allow filtering by color, brand, etc

  const where = search ? ilike(garmentsTable.name, `%${search}%`) : undefined;

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
