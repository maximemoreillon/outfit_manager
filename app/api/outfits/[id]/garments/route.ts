import { addGarmentToOutfit } from "@/lib/outfitGarments";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: outfit_id } = await params;
  const { garment_id } = await request.json();
  const { id } = await addGarmentToOutfit({
    outfit_id: Number(outfit_id),
    garment_id,
  });
  return Response.json({ id });
}
