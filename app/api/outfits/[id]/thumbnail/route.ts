import { thumbnailFilename } from "@/lib/config";
import { generateOutfitThumbnail } from "@/lib/images";
import { S3_BUCKET, s3Client } from "@/lib/s3";
import { NextRequest } from "next/server";
import { Readable } from "stream";

type Options = {
  params: Promise<{ id: string }>;
};

export async function GET(_: NextRequest, { params }: Options) {
  const { id } = await params;

  const key = `outfits/${id}/${thumbnailFilename}`;

  let stream: Readable;
  try {
    stream = await s3Client.getObject(S3_BUCKET, key);
  } catch (error) {
    if ((error as { code?: string }).code !== "NoSuchKey") throw error;
    await generateOutfitThumbnail(Number(id));
    stream = await s3Client.getObject(S3_BUCKET, key);
  }

  return new Response(Readable.toWeb(stream) as ReadableStream);
}
