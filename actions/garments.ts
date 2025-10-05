"use server";

import { createGarment } from "@/lib/garments";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createGarmentAction(state: any, formData: FormData) {
  const schema = z.object({
    name: z.string(),
  });

  const { data, error } = schema.safeParse({
    name: formData.get("name"),
  });

  if (error) return { error: error.message };

  const { id } = await createGarment(data);
  return redirect(`/garments/${id}`);
}
