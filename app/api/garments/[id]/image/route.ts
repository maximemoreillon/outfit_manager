import { uploadGarmentImage } from "@/lib/images";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const formData = await req.formData();
  const file = formData.get("image") as File | null;

  if (!file) throw new Error("Missing file");

  await uploadGarmentImage(Number(id), file);
  return Response.json({ id });
}
