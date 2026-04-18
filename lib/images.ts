"use server";

import { db } from "@/db";
import { S3_BUCKET, s3Client } from "./s3";
import { garmentsTable, outfitsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import { stream2Buffer } from "./utils";
import sharp from "sharp";
import { thumbnailFilename } from "./config";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function uploadImage(image: File, prefix = uuid()) {
  if (!image.type.startsWith("image/"))
    throw new Error(`Invalid file type "${image.type}". Only images are allowed`);

  if (image.size > MAX_SIZE)
    throw new Error("File too large. Maximum size is 10MB");

  const safeName = image.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `${prefix}/${safeName}`;

  const buffer = await image.arrayBuffer();

  await s3Client.putObject(S3_BUCKET, key, Buffer.from(buffer));
  return { key, safeName };
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

async function uploadEntityImage(
  table: typeof garmentsTable | typeof outfitsTable,
  entity: "garments" | "outfits",
  id: number,
  image: File
) {
  const prefix = `${entity}/${id}`;
  const { safeName } = await uploadImage(image, prefix);
  await generateThumbnail(prefix, safeName);

  const [result] = await db
    .update(table as typeof garmentsTable)
    .set({ image: safeName })
    .where(eq((table as typeof garmentsTable).id, id))
    .returning();

  return result;
}

export async function uploadGarmentImage(id: number, image: File) {
  return uploadEntityImage(garmentsTable, "garments", id, image);
}

export async function uploadOutfitImage(id: number, image: File) {
  return uploadEntityImage(outfitsTable, "outfits", id, image);
}

async function generateEntityThumbnail(
  table: typeof garmentsTable | typeof outfitsTable,
  entity: "garments" | "outfits",
  id: number
) {
  const prefix = `${entity}/${id}`;

  const [item] = await db
    .select()
    .from(table as typeof garmentsTable)
    .where(eq((table as typeof garmentsTable).id, id));

  if (!item) throw new Error(`${entity} not found`);
  if (!item.image) throw new Error(`${entity} does not have an image`);

  return generateThumbnail(prefix, item.image);
}

export async function generateGarmentThumbnail(id: number) {
  return generateEntityThumbnail(garmentsTable, "garments", id);
}

export async function generateOutfitThumbnail(id: number) {
  return generateEntityThumbnail(outfitsTable, "outfits", id);
}
