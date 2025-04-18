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
  type Filters = {
    type: string[];
    brand: string[];
    color: string[];
  };

  const filters: Filters = {
    type: [],
    brand: [],
    color: [],
  };

  const selectDistinctQuery = Object.keys(filters).reduce(
    (acc, k) => ({
      ...acc,
      [k]: garmentsTable[k as keyof Filters],
    }),
    {}
  );

  const result = await db
    .selectDistinct(selectDistinctQuery)
    .from(garmentsTable);

  /*
  Result structure:
  [
    { type: null, brand: null, color: null },
    { type: 'T-shirt', brand: 'H&M', color: null },
    { type: 'Pants', brand: '', color: null },
    { type: null, brand: 'Uniqlo', color: null }
  ]
  */

  Object.keys(filters).forEach((k) => {
    filters[k as keyof Filters] = result
      .map((r) => (r as { [k: string]: string | null })[k])
      .filter((e): e is Required<string> => !!e);
  });

  return filters;
}
