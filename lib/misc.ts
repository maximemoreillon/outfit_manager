"use server";

import { garmentsTable } from "@/db/schema";
import { db } from "../db";
import { eq, count, ilike, and, isNotNull, not } from "drizzle-orm";

// TODO: have those three in a single function
export async function readTypes() {
  const result = (await db
    .selectDistinct({ type: garmentsTable.type })
    .from(garmentsTable)
    .where(and(isNotNull(garmentsTable.type), not(eq(garmentsTable.type, ""))))
    .orderBy(garmentsTable.type)) as { type: string }[];

  return result.map(({ type }) => type);
}

export async function readBrands() {
  const result = (await db
    .selectDistinct({ brand: garmentsTable.brand })
    .from(garmentsTable)
    .where(
      and(isNotNull(garmentsTable.brand), not(eq(garmentsTable.brand, "")))
    )
    .orderBy(garmentsTable.brand)) as { brand: string }[];

  return result.map(({ brand }) => brand);
}

export async function readColors() {
  const result = (await db
    .selectDistinct({ color: garmentsTable.color })
    .from(garmentsTable)
    .where(
      and(isNotNull(garmentsTable.color), not(eq(garmentsTable.color, "")))
    )
    .orderBy(garmentsTable.color)) as { color: string }[];

  return result.map(({ color }) => color);
}
