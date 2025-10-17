import { thumbnailFilename } from "@/lib/config";
import { generateGarmentThumbnail } from "@/lib/images";
import { S3_BUCKET, s3Client } from "@/lib/s3";
import { NextRequest } from "next/server";
import { Readable } from "stream";

type Options = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: Options) {
  const { id } = await params;

  const prefix = `garments/${id}`;

  const key = `${prefix}/${thumbnailFilename}`;

  let stream: Readable;

  try {
    stream = await s3Client.getObject(S3_BUCKET, key);
  } catch (error: any) {
    if (error.code === "NoSuchKey") {
      await generateGarmentThumbnail(Number(id));
      stream = await s3Client.getObject(S3_BUCKET, key);
    }
  }

  // // yeah but it works...
  // @ts-ignore
  return new Response(stream);
}
