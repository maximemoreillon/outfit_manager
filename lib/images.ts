"use server";

import { db } from "@/db";
import { S3_BUCKET, s3Client } from "./s3";
import { garmentsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function uploadImage(formData: FormData) {
  const image = formData.get("image");
  if (!image) throw "Missing image";
  if (!(image instanceof File)) throw "Not a file";

  const garmentId = formData.get("garmentId");
  if (!garmentId) throw "Missing garment ID";

  const buffer = await image.arrayBuffer();

  const key = `garments/${garmentId}/${image.name}`;

  // TODO: sharp for thumbnails
  await s3Client.putObject(S3_BUCKET, key, Buffer.from(buffer));

  await db
    .update(garmentsTable)
    .set({ image: key })
    .where(eq(garmentsTable.id, Number(garmentId)));
}
