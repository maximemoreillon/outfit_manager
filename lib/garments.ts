"use server";

import { garmentsTable } from "@/db/schema";
import { db } from "../db";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createGarment(formData: FormData) {
  const name = formData.get("name");
  if (!name) throw "Missing name";
  if (typeof name !== "string") throw "Invalid name";

  const [{ id }] = await db.insert(garmentsTable).values({ name }).returning();

  return redirect(`/garments/${id}`);
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
