"use client";

import { Button } from "@/components/ui/button";
import { deleteOutfit } from "@/lib/outfits";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export default function DeleteOutfitButton(props: Props) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this outfit?")) return;
    await deleteOutfit(props.id);
    router.push("/outfits");
  }

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete item
    </Button>
  );
}
