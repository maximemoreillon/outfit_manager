"use server";

import { outfitGarmentsTable } from "@/db/schema";
import {
  addGarmentToOutfit,
  removeGarmentFromOutfit,
} from "@/lib/outfitGarments";
import { errorMessage } from "@/lib/utils";

export async function addAction(
  _state: unknown,
  values: typeof outfitGarmentsTable.$inferInsert
) {
  try {
    await addGarmentToOutfit(values);
    return { success: true, error: null };
  } catch (error) {
    return { error: errorMessage(error), success: false };
  }
}

export async function removeAction(
  _state: unknown,
  values: typeof outfitGarmentsTable.$inferInsert
) {
  const { garment_id, outfit_id } = values;
  try {
    await removeGarmentFromOutfit(outfit_id, garment_id);
    return { success: true, error: null };
  } catch (error) {
    return { error: errorMessage(error), success: false };
  }
}
