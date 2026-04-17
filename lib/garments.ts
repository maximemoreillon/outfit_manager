"use server";

import { garmentsTable } from "@/db/schema";
import { db } from "../db";
import { eq, count, ilike, and } from "drizzle-orm";
import { getAuthenticatedUserId } from "./auth";

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

export async function createGarment(
  properties: typeof garmentsTable.$inferInsert
) {
  const user_id = await getAuthenticatedUserId();

  const [newGarment] = await db
    .insert(garmentsTable)
    .values({ ...properties, user_id })
    .returning();

  return newGarment;
}

export async function readGarments(queryParams: ReadGarmentsParams) {
  const user_id = await getAuthenticatedUserId();

  const limit = Number(queryParams.limit || "10");
  const offset = Number(queryParams.offset || "0");

  const { search, brand, type, color } = queryParams;

  const where = and(
    eq(garmentsTable.user_id, user_id),
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
    .offset(offset)
    .limit(limit);

  return { items: garments, limit, offset, total };
}

export async function readGarment(id: number) {
  const user_id = await getAuthenticatedUserId();

  const [garment] = await db
    .select()
    .from(garmentsTable)
    .where(and(eq(garmentsTable.id, id), eq(garmentsTable.user_id, user_id)));

  return garment;
}

export async function updateGarment(
  id: number,
  values: typeof garmentsTable.$inferInsert
) {
  const user_id = await getAuthenticatedUserId();

  const { user_id: _uid, ...updateValues } = values;

  const [garment] = await db
    .update(garmentsTable)
    .set(updateValues)
    .where(and(eq(garmentsTable.id, id), eq(garmentsTable.user_id, user_id)))
    .returning();

  return garment;
}

export async function deleteGarment(id: number) {
  const user_id = await getAuthenticatedUserId();

  await db
    .delete(garmentsTable)
    .where(and(eq(garmentsTable.id, id), eq(garmentsTable.user_id, user_id)));
}
