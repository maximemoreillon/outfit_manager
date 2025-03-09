import { db } from "@/db";
import { garmentsTable } from "@/db/schema";
import { S3_BUCKET, s3Client } from "@/lib/s3";
import { eq } from "drizzle-orm";

type Params = Promise<{ id: string }>;
export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = await params;

  const [garment] = await db
    .select()
    .from(garmentsTable)
    .where(eq(garmentsTable.id, Number(id)));

  if (!garment) throw "Garment not found";
  if (!garment.image) throw "No image available";

  const stream = await s3Client.getObject(S3_BUCKET, garment.image);

  if (!stream) throw "No stream available";

  // yeah but it works...
  // @ts-ignore
  return new Response(stream);
}
