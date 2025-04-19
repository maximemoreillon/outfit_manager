import { readOutfit } from "@/lib/outfits";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const outfit = await readOutfit(Number(id));
  return Response.json(outfit);
}
