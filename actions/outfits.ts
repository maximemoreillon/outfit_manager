"use server";

import { outfitsTable } from "@/db/schema";
import { uploadOutfitImage } from "@/lib/images";
import { createOutfit, deleteOutfit, updateOutfit } from "@/lib/outfits";
import { redirect } from "next/navigation";

export async function createOutfitAction(
  state: any,
  data: { imageFileList: FileList }
) {
  let newOutfit: typeof outfitsTable.$inferSelect;
  try {
    newOutfit = await createOutfit({});
    const [imageFile] = data.imageFileList;
    await uploadOutfitImage(newOutfit.id, imageFile);
  } catch (error: any) {
    return { error: error.message };
  }
  return redirect(`/outfits/${newOutfit.id}`);
}

export async function updateOutfitAction(
  id: number,
  state: any,
  values: typeof outfitsTable.$inferInsert
) {
  try {
    await updateOutfit(id, values);
  } catch (error: any) {
    return { error: error.message, success: false };
  }
  return { error: null, success: true };
}

export async function deleteOutfitAction(state: any, id: number) {
  try {
    await deleteOutfit(id);
  } catch (error: any) {
    return { error: error.message };
  }
  return redirect(`/outfits`);
}

export async function uploadImageAction(
  id: number,
  state: any,
  values: {
    imageFileList: FileList;
  }
) {
  try {
    const [imageFile] = values.imageFileList;
    const data = await uploadOutfitImage(id, imageFile);
    return { error: null, success: true, data };
  } catch (error: any) {
    return { error: error.message, success: false, data: null };
  }
}
