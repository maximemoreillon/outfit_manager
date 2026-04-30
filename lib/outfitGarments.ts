"use server";

import { garmentsTable, outfitGarmentsTable, outfitsTable } from "@/db/schema";
import { db } from "../db";
import { eq, and, count } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { getAuthenticatedUserId } from "./auth";

const parentTable = alias(garmentsTable, "parent");
type Garment = typeof garmentsTable.$inferSelect;
const INHERITED_FIELDS = ["type", "brand", "color", "description", "size"] as const;
function resolveInheritance(garment: Garment, parent: Garment | null): Garment {
  if (!garment.parent_id || !parent) return garment;
  const overrides = Object.fromEntries(
    INHERITED_FIELDS.filter((f) => parent[f] !== null && parent[f] !== "").map((f) => [f, parent[f]])
  );
  return { ...garment, ...overrides };
}

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

  const [{ count: garmentCount }] = await db
    .select({ count: count() })
    .from(outfitGarmentsTable)
    .where(eq(outfitGarmentsTable.outfit_id, properties.outfit_id));

  if (garmentCount >= 50) throw new Error("Outfit cannot have more than 50 garments");

  const [newRecord] = await db
    .insert(outfitGarmentsTable)
    .values(properties)
    .returning();

  return newRecord;
}

export async function readOutfitGarments(outfit_id: number) {
  const result = await db
    .select({ garment: garmentsTable, parent: parentTable })
    .from(outfitGarmentsTable)
    .where(eq(outfitGarmentsTable.outfit_id, outfit_id))
    .innerJoin(garmentsTable, eq(outfitGarmentsTable.garment_id, garmentsTable.id))
    .leftJoin(parentTable, eq(garmentsTable.parent_id, parentTable.id))
    .limit(50);

  return result.map(({ garment, parent }) => resolveInheritance(garment, parent));
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
