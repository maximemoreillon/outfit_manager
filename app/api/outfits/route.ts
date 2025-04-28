import { createOutfit, readOutfits } from "@/lib/outfits";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const outfits = await readOutfits(Object.fromEntries(searchParams.entries()));
  return Response.json(outfits);
}

export async function POST(request: Request) {
  const properties = await request.json();
  const newOutfit = await createOutfit(properties);
  return Response.json(newOutfit);
}
