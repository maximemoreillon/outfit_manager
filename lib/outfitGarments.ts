"use server";

import { garmentsTable, outfitGarmentsTable, outfitsTable } from "@/db/schema";
import { db } from "../db";
import { eq, and, count } from "drizzle-orm";
import { getAuthenticatedUserId } from "./auth";

export async function addGarmentToOutfit(
  properties: typeof outfitGarmentsTable.$inferInsert
) {
  const user_id = await getAuthenticatedUserId();

  const [outfit] = await db
    .select({ id: outfitsTable.id })
    .from(outfitsTable)
    .where(
      and(
        eq(outfitsTable.id, properties.outfit_id),
        eq(outfitsTable.user_id, user_id)
      )
    );

  if (!outfit) throw new Error("Outfit not found");

  const [garment] = await db
    .select({ id: garmentsTable.id })
    .from(garmentsTable)
    .where(
      and(
        eq(garmentsTable.id, properties.garment_id),
        eq(garmentsTable.user_id, user_id)
      )
    );

  if (!garment) throw new Error("Garment not found");

  const [newRecord] = await db
    .insert(outfitGarmentsTable)
    .values(properties)
    .returning();

  return newRecord;
}

export async function readOutfitGarments(
  outfit_id: number,
  limit = 9,
  offset = 0
) {
  const where = eq(outfitGarmentsTable.outfit_id, outfit_id);

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(outfitGarmentsTable)
    .where(where);

  const result = await db
    .select()
    .from(outfitGarmentsTable)
    .where(where)
    .innerJoin(
      garmentsTable,
      eq(outfitGarmentsTable.garment_id, garmentsTable.id)
    )
    .limit(limit)
    .offset(offset);

  return { items: result.map(({ garments }) => garments), total, limit, offset };
}

export async function removeGarmentFromOutfit(
  outfit_id: number,
  garment_id: number
) {
  const user_id = await getAuthenticatedUserId();

  const [outfit] = await db
    .select({ id: outfitsTable.id })
    .from(outfitsTable)
    .where(
      and(eq(outfitsTable.id, outfit_id), eq(outfitsTable.user_id, user_id))
    );

  if (!outfit) throw new Error("Outfit not found");

  await db
    .delete(outfitGarmentsTable)
    .where(
      and(
        eq(outfitGarmentsTable.outfit_id, outfit_id),
        eq(outfitGarmentsTable.garment_id, garment_id)
      )
    );

  return { outfit_id, garment_id };
}

export async function readGarmentOutfits(garment_id: number) {
  const user_id = await getAuthenticatedUserId();

  const [garment] = await db
    .select({ id: garmentsTable.id })
    .from(garmentsTable)
    .where(
      and(eq(garmentsTable.id, garment_id), eq(garmentsTable.user_id, user_id))
    );

  if (!garment) throw new Error("Garment not found");

  // TODO: pagination
  const result = await db
    .select()
    .from(outfitGarmentsTable)
    .where(eq(outfitGarmentsTable.garment_id, garment_id))
    .innerJoin(
      outfitsTable,
      eq(outfitGarmentsTable.outfit_id, outfitsTable.id)
    );

  return { items: result.map(({ outfits }) => outfits) };
}
