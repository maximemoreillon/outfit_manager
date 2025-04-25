"use client";

import { Button } from "@/components/ui/button";
import { deleteGarment } from "@/lib/garments";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export default function DeleteGarmentButton(props: Props) {
  const router = useRouter();
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this garment?")) return;
    await deleteGarment(props.id);
    router.push("/garments");
  }
  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  );
}
