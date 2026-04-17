"use server";

import { garmentsTable } from "@/db/schema";
import { db } from "../db";
import { eq, and, isNotNull, not } from "drizzle-orm";
import { getAuthenticatedUserId } from "./auth";

export async function readTypes() {
  const user_id = await getAuthenticatedUserId();

  const result = await db
    .selectDistinct({ type: garmentsTable.type })
    .from(garmentsTable)
    .where(
      and(
        eq(garmentsTable.user_id, user_id),
        isNotNull(garmentsTable.type),
        not(eq(garmentsTable.type, ""))
      )
    )
    .orderBy(garmentsTable.type);

  return result.map(({ type }) => type).filter((t): t is string => t !== null);
}

export async function readBrands() {
  const user_id = await getAuthenticatedUserId();

  const result = await db
    .selectDistinct({ brand: garmentsTable.brand })
    .from(garmentsTable)
    .where(
      and(
        eq(garmentsTable.user_id, user_id),
        isNotNull(garmentsTable.brand),
        not(eq(garmentsTable.brand, ""))
      )
    )
    .orderBy(garmentsTable.brand);

  return result
    .map(({ brand }) => brand)
    .filter((b): b is string => b !== null);
}

export async function readColors() {
  const user_id = await getAuthenticatedUserId();

  const result = await db
    .selectDistinct({ color: garmentsTable.color })
    .from(garmentsTable)
    .where(
      and(
        eq(garmentsTable.user_id, user_id),
        isNotNull(garmentsTable.color),
        not(eq(garmentsTable.color, ""))
      )
    )
    .orderBy(garmentsTable.color);

  return result
    .map(({ color }) => color)
    .filter((c): c is string => c !== null);
}

export async function readFilters() {
  const [types, brands, colors] = await Promise.all([
    readTypes(),
    readBrands(),
    readColors(),
  ]);

  return { type: types, brand: brands, color: colors };
}
