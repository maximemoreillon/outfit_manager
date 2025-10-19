"use server";

import { outfitGarmentsTable } from "@/db/schema";
// TODO: this is unused at the moment

import {
  addGarmentToOutfit,
  removeGarmentFromOutfit,
} from "@/lib/outfitGarments";

export async function addAction(
  state: any,
  values: typeof outfitGarmentsTable.$inferInsert
) {
  try {
    await addGarmentToOutfit(values);
    return { success: true, error: null };
  } catch (error: any) {
    return { error: error.message, success: false };
  }
}

export async function removeAction(
  state: any,
  values: typeof outfitGarmentsTable.$inferInsert
) {
  const { garment_id, outfit_id } = values;
  try {
    await removeGarmentFromOutfit(outfit_id, garment_id);
    return { success: true, error: null };
  } catch (error: any) {
    return { error: error.message, success: false };
  }
}
