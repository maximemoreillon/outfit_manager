"use client";

import { Button } from "@/components/ui/button";
import { deleteGarment } from "@/lib/garments";
import { Loader2Icon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: number;
};

export default function DeleteGarmentButton(props: Props) {
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);

  // TODO: loader
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this garment?")) return;
    setDeleting(true);
    await deleteGarment(props.id);
    router.push("/garments");
    setDeleting(false);
  }
  return (
    <Button
      onClick={handleDelete}
      variant="outline"
      size="icon"
      disabled={deleting}
    >
      {deleting ? <Loader2Icon className="animate-spin" /> : <Trash />}
    </Button>
  );
}
