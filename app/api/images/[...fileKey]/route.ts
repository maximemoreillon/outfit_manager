import { readGarment } from "@/lib/garments";
import { readOutfit } from "@/lib/outfits";
import { S3_BUCKET, s3Client } from "@/lib/s3";
import { Readable } from "stream";

type Params = Promise<{ fileKey: string[] }>;

const notFound = () => Response.json({ message: "Not found" }, { status: 404 });

export async function GET(_: Request, { params }: { params: Params }) {
  const { fileKey } = await params;

  // Only "<garments|outfits>/<id>/<filename>" is served, and only the image
  // currently attached to an entity owned by the requesting user.
  if (fileKey.length !== 3) return notFound();
  const [entity, rawId, filename] = fileKey;
  const id = Number(rawId);
  if (!Number.isInteger(id)) return notFound();

  const item =
    entity === "garments"
      ? await readGarment(id)
      : entity === "outfits"
        ? await readOutfit(id)
        : undefined;

  if (!item || !item.image || item.image !== filename) return notFound();

  const stream = await s3Client.getObject(S3_BUCKET, `${entity}/${id}/${filename}`);

  return new Response(Readable.toWeb(stream) as ReadableStream, {
    headers: { "Cache-Control": "private, max-age=86400" },
  });
}
