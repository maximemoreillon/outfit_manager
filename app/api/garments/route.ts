import { createGarment, readGarments } from "@/lib/garments";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const garments = await readGarments(
    Object.fromEntries(searchParams.entries())
  );
  return Response.json(garments);
}

export async function POST(request: Request) {
  const properties = await request.json();
  const newGarment = await createGarment(properties);
  return Response.json(newGarment);
}
