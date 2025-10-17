"use server";

import { db } from "@/db";
import { S3_BUCKET, s3Client } from "./s3";
import { garmentsTable, outfitsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import { stream2Buffer } from "./utils";
import sharp from "sharp";
import { thumbnailFilename } from "./config";

export async function uploadImage(image: File, prefix = uuid()) {
  const key = `${prefix}/${image.name}`;

  const buffer = await image.arrayBuffer();

  // TODO: create thumbnails

  await s3Client.putObject(S3_BUCKET, key, Buffer.from(buffer));
  return key;
}

// TODO: have one function to replace those two
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

async function generateThumbnail(prefix: string, image: string) {
  const originalImageKey = `${prefix}/${image}`;

  const originalImageStream = await s3Client.getObject(
    S3_BUCKET,
    originalImageKey
  );

  const originalImageBuffer = await stream2Buffer(originalImageStream);

  const thumbnailKey = `${prefix}/${thumbnailFilename}`;

  // TODO: find way to keep rotation
  const thumbnailBuffer = await sharp(originalImageBuffer, {
    failOnError: true,
  })
    .rotate()
    .resize({
      width: 800,
      height: 800,
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFormat("png")
    .withMetadata()
    .toBuffer();

  await s3Client.putObject(S3_BUCKET, thumbnailKey, thumbnailBuffer);

  return thumbnailKey;
}

// TODO: have one function to replace those two
export async function generateGarmentThumbnail(id: number) {
  const prefix = `garments/${id}`;

  const [item] = await db
    .select()
    .from(garmentsTable)
    .where(eq(garmentsTable.id, id));

  if (!item) throw new Error("Garment not found");
  if (!item.image) throw new Error("Garment does not have an image");

  return await generateThumbnail(prefix, item.image);
}

export async function generateOutfitThumbnail(id: number) {
  const prefix = `outfits/${id}`;

  const [item] = await db
    .select()
    .from(outfitsTable)
    .where(eq(outfitsTable.id, id));

  if (!item) throw new Error("Outfit not found");
  if (!item.image) throw new Error("Outfit does not have an image");

  return await generateThumbnail(prefix, item.image);
}
