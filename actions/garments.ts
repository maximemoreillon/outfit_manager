"use server";

import { garmentsTable } from "@/db/schema";
import { createGarment, deleteGarment, updateGarment } from "@/lib/garments";
import { uploadGarmentImage } from "@/lib/images";
import { errorMessage } from "@/lib/utils";
import { redirect } from "next/navigation";

type ItemInsert = typeof garmentsTable.$inferInsert;

export async function createGarmentAction(_state: unknown, values: ItemInsert) {
  let newGarment: typeof garmentsTable.$inferSelect;
  try {
    newGarment = await createGarment(values);
  } catch (error) {
    return { error: errorMessage(error) };
  }
  return redirect(`/garments/${newGarment.id}`);
}

export async function updateGarmentAction(
  id: number,
  _state: unknown,
  values: ItemInsert
) {
  try {
    await updateGarment(id, values);
  } catch (error) {
    return { error: errorMessage(error), success: false };
  }
  return { error: null, success: true };
}

export async function deleteGarmentAction(_state: unknown, id: number) {
  try {
    await deleteGarment(id);
  } catch (error) {
    return { error: errorMessage(error) };
  }
  return redirect(`/garments`);
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
    const data = await uploadGarmentImage(id, imageFile);
    return { error: null, success: true, data };
  } catch (error) {
    return { error: errorMessage(error), success: false, data: null };
  }
}
