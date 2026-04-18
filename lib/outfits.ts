"use server";

import { outfitsTable } from "@/db/schema";
import { db } from "../db";
import { eq, count, and, desc, ilike } from "drizzle-orm";
import { getAuthenticatedUserId } from "./auth";

export async function createOutfit(
  properties: typeof outfitsTable.$inferInsert
) {
  const user_id = await getAuthenticatedUserId();

  const [newOutfit] = await db
    .insert(outfitsTable)
    .values({ ...properties, user_id })
    .returning();

  return newOutfit;
}

export async function readOutfits(queryParams: {
  [key: string]: string | string[] | undefined;
}) {
  const user_id = await getAuthenticatedUserId();

  const limit = Number(queryParams.limit || "10");
  const offset = Number(queryParams.offset || "0");
  const search = typeof queryParams.search === "string" ? queryParams.search : undefined;

  const where = and(
    eq(outfitsTable.user_id, user_id),
    search ? ilike(outfitsTable.description, `%${search}%`) : undefined
  );

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(outfitsTable)
    .where(where);

  const outfits = await db
    .select()
    .from(outfitsTable)
    .where(where)
    .orderBy(desc(outfitsTable.id))
    .offset(offset)
    .limit(limit);

  return { items: outfits, limit, offset, total };
}

export async function readOutfit(id: number) {
  const user_id = await getAuthenticatedUserId();

  const [outfit] = await db
    .select()
    .from(outfitsTable)
    .where(and(eq(outfitsTable.id, id), eq(outfitsTable.user_id, user_id)));

  return outfit;
}

export async function updateOutfit(
  id: number,
  values: typeof outfitsTable.$inferInsert
) {
  const user_id = await getAuthenticatedUserId();

  const { user_id: _uid, ...updateValues } = values;

  const [outfit] = await db
    .update(outfitsTable)
    .set(updateValues)
    .where(and(eq(outfitsTable.id, id), eq(outfitsTable.user_id, user_id)))
    .returning();

  return outfit;
}

export async function deleteOutfit(id: number) {
  const user_id = await getAuthenticatedUserId();

  await db
    .delete(outfitsTable)
    .where(and(eq(outfitsTable.id, id), eq(outfitsTable.user_id, user_id)));
}
