"use server";

import { outfitsTable } from "@/db/schema";
import { uploadOutfitImage } from "@/lib/images";
import { createOutfit } from "@/lib/outfits";
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
