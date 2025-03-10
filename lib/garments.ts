"use server";

import { garmentsTable } from "@/db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export async function createGarment(properties: any) {
  const [newGarment] = await db
    .insert(garmentsTable)
    .values(properties)
    .returning();

  return newGarment;
}

export async function readGarments() {
  const result = await db.select().from(garmentsTable);
  return result;
}

export async function readGarment(id: number) {
  const [result] = await db
    .select()
    .from(garmentsTable)
    .where(eq(garmentsTable.id, id));
  return result;
}

export async function updateGarment(id: number, values: any) {
  const [result] = await db
    .update(garmentsTable)
    .set(values)
    .where(eq(garmentsTable.id, Number(id)))
    .returning();
}
