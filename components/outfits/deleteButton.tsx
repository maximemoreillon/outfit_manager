"use client";

import { Button } from "@/components/ui/button";
import { deleteOutfit } from "@/lib/outfits";
import { Loader2Icon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: number;
};

export default function DeleteOutfitButton(props: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this outfit?")) return;
    setDeleting(true);
    await deleteOutfit(props.id);
    router.push("/outfits");
    setDeleting(false);
  }

  return (
    <Button variant="destructive" onClick={handleDelete}>
      {deleting ? <Loader2Icon className="animate-spin" /> : <Trash />}
    </Button>
  );
}
