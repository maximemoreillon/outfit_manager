"use server";

import { garmentsTable } from "@/db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export async function createGarment(
  properties: typeof garmentsTable.$inferInsert
) {
  const [newGarment] = await db
    .insert(garmentsTable)
    .values(properties)
    .returning();

  return newGarment;
}

export async function readGarments() {
  const garments = await db.select().from(garmentsTable);
  return garments;
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
