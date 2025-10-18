"use server";

// TODO: this is unused at the moment

import {
  addGarmentToOutfit,
  removeGarmentFromOutfit,
} from "@/lib/outfitGarments";

export async function addAction(state: any, values: any) {
  try {
    await addGarmentToOutfit(values);
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function removeAction(
  outfit_id: number,
  garment_id: number,
  state: any
) {
  try {
    await removeGarmentFromOutfit(outfit_id, garment_id);
  } catch (error: any) {
    return { error: error.message };
  }
}
