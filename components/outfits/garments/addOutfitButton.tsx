import { addAction } from "@/actions/outfitGarments";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { startTransition, useActionState } from "react";

type Props = {
  outfit_id: number;
  garment_id: number;
  onAdd?: () => void;
};

export default function AddOutfitButton({ outfit_id, garment_id }: Props) {
  const [state, action, pending] = useActionState(addAction, null);

  function onClick() {
    startTransition(() => action({ outfit_id, garment_id }));
  }

  return (
    <Button onClick={onClick} disabled={pending}>
      <PlusIcon />
    </Button>
  );
}
