"use server";

import { garmentsTable, outfitGarmentsTable, outfitsTable } from "@/db/schema";
import { db } from "../db";
import { eq, count } from "drizzle-orm";

export async function addGarmentToOutfit(
  properties: typeof outfitGarmentsTable.$inferInsert
) {
  console.log({ properties });
  const [newRecord] = await db
    .insert(outfitGarmentsTable)
    .values(properties)
    .returning();

  return newRecord;
}

export async function readOutfitGarments(outfit_id: number) {
  // TODO: pagination
  const result = await db
    .select()
    .from(outfitGarmentsTable)
    .where(eq(outfitGarmentsTable.outfit_id, outfit_id))
    .innerJoin(
      garmentsTable,
      eq(outfitGarmentsTable.garment_id, garmentsTable.id)
    );

  return { items: result.map(({ garments }) => garments) };
}

export async function removeGarmentFromOutfit(
  outfit_id: number,
  garment_id: number
) {
  // TODO: implement

  return {};
}
