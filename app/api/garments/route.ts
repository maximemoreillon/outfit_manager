import { readGarments } from "@/lib/garments";

export async function GET(request: Request) {
  const garments = await readGarments();
  return Response.json(garments);
}
