import { S3_BUCKET, s3Client } from "@/lib/s3";

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
