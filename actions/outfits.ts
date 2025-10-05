"use server";

import { uploadOutfitImage } from "@/lib/images";
import { createOutfit } from "@/lib/outfits";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createOutfitAction(state: any, formData: FormData) {
  const schema = z.object({
    imageFileList: z.custom<FileList>(),
  });
  const { data, error } = schema.safeParse({
    imageFileList: formData.get("imageFileList"),
  });

  if (error) return { error: error.message };

  const { id } = await createOutfit({});
  const [imageFile] = data.imageFileList;
  await uploadOutfitImage(id, imageFile);

  return redirect(`/outfits/${id}`);
}
