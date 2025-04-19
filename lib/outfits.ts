"use server";

import { outfitsTable } from "@/db/schema";
import { db } from "../db";
import { eq, count, desc } from "drizzle-orm";

export async function createOutfit(
  properties: typeof outfitsTable.$inferInsert
) {
  const [newOutfit] = await db
    .insert(outfitsTable)
    .values(properties)
    .returning();

  return newOutfit;
}

export async function readOutfits(queryParams: {
  [key: string]: string | string[] | undefined;
}) {
  const limit = Number(queryParams.limit || "10");
  const offset = Number(queryParams.offset || "0");

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(outfitsTable);

  const outfits = await db
    .select()
    .from(outfitsTable)
    .orderBy(desc(outfitsTable.id))
    .offset(Number(offset))
    .limit(Number(limit));

  return { items: outfits, limit, offset, total };
}

export async function readOutfit(id: number) {
  const [garment] = await db
    .select()
    .from(outfitsTable)
    .where(eq(outfitsTable.id, id));
  return garment;
}

export async function updateOutfit(
  id: number,
  values: typeof outfitsTable.$inferInsert
) {
  const [garment] = await db
    .update(outfitsTable)
    .set(values)
    .where(eq(outfitsTable.id, Number(id)))
    .returning();

  return garment;
}

export async function deleteOutfit(id: number) {
  await db.delete(outfitsTable).where(eq(outfitsTable.id, Number(id)));

  return { id };
}
