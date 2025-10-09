"use server";

import { garmentsTable } from "@/db/schema";
import { createGarment, deleteGarment, updateGarment } from "@/lib/garments";
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

export async function updateGarmentAction(
  id: number,
  state: any,
  values: ItemInsert
) {
  try {
    await updateGarment(id, values);
  } catch (error: any) {
    return { error: error.message, success: false };
  }
  return { error: null, success: true };
}

export async function deleteGarmentAction(state: any, id: number) {
  try {
    await deleteGarment(id);
  } catch (error: any) {
    return { error: error.message };
  }
  return redirect(`/outfits`);
}
