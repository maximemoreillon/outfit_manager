"use server";

import { db } from "@/db";
import { S3_BUCKET, s3Client } from "./s3";
import { garmentsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

export async function uploadGarmentImage(id: number, image: File) {
  const key = await uploadImage(image);

  const [garment] = await db
    .update(garmentsTable)
    .set({ image: key })
    .where(eq(garmentsTable.id, id))
    .returning();

  return garment;
}

export async function uploadImage(image: File) {
  // const key = `garments/${id}/${image.name}`;
  const key = `${uuid()}/${image.name}`;

  const buffer = await image.arrayBuffer();

  // TODO: sharp for thumbnails
  await s3Client.putObject(S3_BUCKET, key, Buffer.from(buffer));
  return key;
}
