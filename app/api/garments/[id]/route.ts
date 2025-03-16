import { readGarment } from "@/lib/garments";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const garment = await readGarment(Number(id));
  return Response.json(garment);
}
