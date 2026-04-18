"use server";

import { garmentsTable } from "@/db/schema";
import { db } from "../db";
import { eq, count, ilike, and } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { getAuthenticatedUserId } from "./auth";

// Fields a child garment inherits from its parent template
const INHERITED_FIELDS = ["type", "brand", "color", "size"] as const;

const parentTable = alias(garmentsTable, "parent");

type Garment = typeof garmentsTable.$inferSelect;

function resolveInheritance(garment: Garment, parent: Garment | null): Garment {
  if (!garment.parent_id || !parent) return garment;
  const overrides = Object.fromEntries(
    INHERITED_FIELDS.map((f) => [f, parent[f]])
  ) as Pick<Garment, (typeof INHERITED_FIELDS)[number]>;
  return { ...garment, ...overrides };
}

type ReadGarmentsParams = {
  limit?: string;
  offset?: string;
  search?: string | null;
  brand?: string | null;
  type?: string | null;
  color?: string | null;
  is_generic?: string;
};

export async function createGarment(
  properties: typeof garmentsTable.$inferInsert
) {
  const user_id = await getAuthenticatedUserId();
  const [newGarment] = await db
    .insert(garmentsTable)
    .values({ ...properties, user_id })
    .returning();
  return newGarment;
}

export async function readGarments(queryParams: ReadGarmentsParams) {
  const user_id = await getAuthenticatedUserId();

  const limit = Number(queryParams.limit || "10");
  const offset = Number(queryParams.offset || "0");

  const { search, brand, type, color, is_generic } = queryParams;
  const templateFilter =
    is_generic === "true"
      ? eq(garmentsTable.is_generic, true)
      : is_generic === "false"
        ? eq(garmentsTable.is_generic, false)
        : undefined;

  const where = and(
    eq(garmentsTable.user_id, user_id),
    templateFilter,
    search ? ilike(garmentsTable.name, `%${search}%`) : undefined,
    brand ? eq(garmentsTable.brand, brand) : undefined,
    type ? eq(garmentsTable.type, type) : undefined,
    color ? eq(garmentsTable.color, color) : undefined
  );

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(garmentsTable)
    .where(where);

  const rows = await db
    .select({ garment: garmentsTable, parent: parentTable })
    .from(garmentsTable)
    .leftJoin(parentTable, eq(garmentsTable.parent_id, parentTable.id))
    .where(where)
    .offset(offset)
    .limit(limit);

  const items = rows.map(({ garment, parent }) =>
    resolveInheritance(garment, parent)
  );

  return { items, limit, offset, total };
}

export async function readGarment(id: number) {
  const user_id = await getAuthenticatedUserId();

  const [row] = await db
    .select({ garment: garmentsTable, parent: parentTable })
    .from(garmentsTable)
    .leftJoin(parentTable, eq(garmentsTable.parent_id, parentTable.id))
    .where(and(eq(garmentsTable.id, id), eq(garmentsTable.user_id, user_id)));

  if (!row) return undefined;
  return resolveInheritance(row.garment, row.parent);
}

export async function updateGarment(
  id: number,
  values: typeof garmentsTable.$inferInsert
) {
  const user_id = await getAuthenticatedUserId();
  const { user_id: _uid, ...updateValues } = values;
  const [garment] = await db
    .update(garmentsTable)
    .set(updateValues)
    .where(and(eq(garmentsTable.id, id), eq(garmentsTable.user_id, user_id)))
    .returning();
  return garment;
}

export async function readAllGenericGarments() {
  const user_id = await getAuthenticatedUserId();
  return db
    .select()
    .from(garmentsTable)
    .where(
      and(eq(garmentsTable.user_id, user_id), eq(garmentsTable.is_generic, true))
    )
    .orderBy(garmentsTable.name);
}

export async function readGarmentsByParent(parent_id: number) {
  const user_id = await getAuthenticatedUserId();
  const rows = await db
    .select({ garment: garmentsTable, parent: parentTable })
    .from(garmentsTable)
    .leftJoin(parentTable, eq(garmentsTable.parent_id, parentTable.id))
    .where(
      and(
        eq(garmentsTable.user_id, user_id),
        eq(garmentsTable.parent_id, parent_id)
      )
    );
  return rows.map(({ garment, parent }) => resolveInheritance(garment, parent));
}

export async function deleteGarment(id: number) {
  const user_id = await getAuthenticatedUserId();
  await db
    .delete(garmentsTable)
    .where(and(eq(garmentsTable.id, id), eq(garmentsTable.user_id, user_id)));
}
