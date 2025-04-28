import { thumbnailFilename } from "@/lib/config";
import { generateOutfitThumbnail } from "@/lib/images";
import { S3_BUCKET, s3Client } from "@/lib/s3";
import { Readable } from "stream";

type Params = Promise<{ id: string }>;

export async function GET(_: Request, { params }: { params: Params }) {
  const { id } = await params;

  const prefix = `outfits/${id}`;

  const key = `${prefix}/${thumbnailFilename}`;

  let stream: Readable;

  try {
    stream = await s3Client.getObject(S3_BUCKET, key);
  } catch (error: any) {
    if (error.code === "NoSuchKey") {
      await generateOutfitThumbnail(Number(id));
      stream = await s3Client.getObject(S3_BUCKET, key);
    }
  }

  // // yeah but it works...
  // @ts-ignore
  return new Response(stream);
}
