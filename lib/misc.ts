"use server";

import { garmentsTable } from "@/db/schema";
import { db } from "../db";
import { eq, count, ilike, and, isNotNull, not } from "drizzle-orm";

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

export async function readFilters() {
  const filters: { type: string[]; brand: string[]; color: string[] } = {
    type: [],
    brand: [],
    color: [],
  };

  // TODO: take that from above
  // type FilterKeys = (typeof Object.keys(filters))[number];
  type FilterKeys = "type" | "brand" | "color";

  for (const prop of Object.keys(filters)) {
    const drizzleFilter = garmentsTable[prop as FilterKeys];

    const result = (await db
      .selectDistinct({ [prop]: drizzleFilter })
      .from(garmentsTable)
      .where(and(isNotNull(drizzleFilter), not(eq(drizzleFilter, ""))))
      .orderBy(drizzleFilter)) as { [prop]: string }[];

    filters[prop as FilterKeys] = result.map((e) => e[prop]);
  }

  // console.log(result);

  return filters;
}
