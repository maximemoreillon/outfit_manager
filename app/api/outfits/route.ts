import { createOutfit, readOutfits } from "@/lib/outfits";

export async function GET(request: Request) {
  const outfits = await readOutfits({});
  return Response.json(outfits);
}

export async function POST(request: Request) {
  const properties = await request.json();
  const newOutfit = await createOutfit(properties);
  return Response.json(newOutfit);
}
