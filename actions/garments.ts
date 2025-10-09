"use server";

import { garmentsTable } from "@/db/schema";
import { createGarment } from "@/lib/garments";
import { redirect } from "next/navigation";

type ItemInsert = typeof garmentsTable.$inferInsert;

export async function createGarmentAction(state: any, values: ItemInsert) {
  let newGarment: typeof garmentsTable.$inferSelect;
  try {
    newGarment = await createGarment(values);
  } catch (error: any) {
    return { error: error.message };
  }
  return redirect(`/garments/${newGarment.id}`);
}
