import { db } from "@/db";
import { garmentsTable } from "@/db/schema";
import { S3_BUCKET, s3Client } from "@/lib/s3";
import { eq } from "drizzle-orm";

type Params = Promise<{ key: string }>;
export async function GET(request: Request, { params }: { params: Params }) {
  let { key } = await params;

  if (Array.isArray(key)) key = key.join("/");

  const stream = await s3Client.getObject(S3_BUCKET, key);

  if (!stream) throw "No stream available";

  // yeah but it works...
  // @ts-ignore
  return new Response(stream);
}
