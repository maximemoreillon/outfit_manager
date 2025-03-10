"use server";

import { db } from "@/db";
import { S3_BUCKET, s3Client } from "./s3";
import { garmentsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function uploadImage(id: number, image: File) {
  const buffer = await image.arrayBuffer();

  const key = `garments/${id}/${image.name}`;

  // TODO: sharp for thumbnails
  await s3Client.putObject(S3_BUCKET, key, Buffer.from(buffer));

  await db
    .update(garmentsTable)
    .set({ image: key })
    .where(eq(garmentsTable.id, Number(id)));
}
