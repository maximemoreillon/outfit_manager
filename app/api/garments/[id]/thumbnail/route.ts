import { thumbnailFilename, thumbnailSmFilename } from "@/lib/config";
import { generateGarmentThumbnail } from "@/lib/images";
import { S3_BUCKET, s3Client } from "@/lib/s3";
import { NextRequest } from "next/server";
import { Readable } from "stream";

type Options = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Options) {
  const { id } = await params;
  const small = new URL(req.url).searchParams.get("size") === "sm";
  const key = `garments/${id}/${small ? thumbnailSmFilename : thumbnailFilename}`;

  let stream: Readable;
  try {
    stream = await s3Client.getObject(S3_BUCKET, key);
  } catch (error) {
    if ((error as { code?: string }).code !== "NoSuchKey") throw error;
    await generateGarmentThumbnail(Number(id), small);
    stream = await s3Client.getObject(S3_BUCKET, key);
  }

  return new Response(Readable.toWeb(stream) as ReadableStream, {
    headers: { "Cache-Control": "public, max-age=86400" },
  });
}
