"use server";

import { db } from "@/db";
import { S3_BUCKET, s3Client } from "./s3";
import { garmentsTable, outfitsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

export async function uploadImage(image: File, prefix = uuid()) {
  // const key = `garments/${id}/${image.name}`;
  const key = `${prefix}/${image.name}`;

  const buffer = await image.arrayBuffer();

  // TODO: sharp for thumbnails
  await s3Client.putObject(S3_BUCKET, key, Buffer.from(buffer));
  return key;
}

export async function uploadGarmentImage(id: number, image: File) {
  const prefix = `garments/${id}`;
  await uploadImage(image, prefix);

  const [garment] = await db
    .update(garmentsTable)
    .set({ image: image.name })
    .where(eq(garmentsTable.id, id))
    .returning();

  return garment;
}

export async function uploadOutfitImage(id: number, image: File) {
  const prefix = `outfits/${id}`;
  await uploadImage(image, prefix);

  const [outfit] = await db
    .update(outfitsTable)
    .set({ image: image.name })
    .where(eq(outfitsTable.id, id))
    .returning();

  return outfit;
}
