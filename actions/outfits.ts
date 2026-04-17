"use server";

import { outfitsTable } from "@/db/schema";
import { uploadOutfitImage } from "@/lib/images";
import { createOutfit, deleteOutfit, updateOutfit } from "@/lib/outfits";
import { errorMessage } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function createOutfitAction(
  _state: unknown,
  data: { imageFileList: FileList }
) {
  let newOutfit: typeof outfitsTable.$inferSelect;
  try {
    newOutfit = await createOutfit({});
    const [imageFile] = data.imageFileList;
    await uploadOutfitImage(newOutfit.id, imageFile);
  } catch (error) {
    return { error: errorMessage(error) };
  }
  return redirect(`/outfits/${newOutfit.id}`);
}

export async function updateOutfitAction(
  id: number,
  _state: unknown,
  values: typeof outfitsTable.$inferInsert
) {
  try {
    await updateOutfit(id, values);
  } catch (error) {
    return { error: errorMessage(error), success: false };
  }
  return { error: null, success: true };
}

export async function deleteOutfitAction(_state: unknown, id: number) {
  try {
    await deleteOutfit(id);
  } catch (error) {
    return { error: errorMessage(error) };
  }
  return redirect(`/outfits`);
}

export async function uploadImageAction(
  id: number,
  _state: unknown,
  values: {
    imageFileList: FileList;
  }
) {
  try {
    const [imageFile] = values.imageFileList;
    const data = await uploadOutfitImage(id, imageFile);
    return { error: null, success: true, data };
  } catch (error) {
    return { error: errorMessage(error), success: false, data: null };
  }
}
