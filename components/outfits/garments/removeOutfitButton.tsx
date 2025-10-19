import { removeAction } from "@/actions/outfitGarments";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { startTransition, useActionState } from "react";

type Props = {
  outfit_id: number;
  garment_id: number;
  onRemove?: () => void;
};

export default function RemoveOutfitButton({ outfit_id, garment_id }: Props) {
  const [state, action, pending] = useActionState(removeAction, null);

  function onClick() {
    startTransition(() => action({ outfit_id, garment_id }));
  }

  return (
    <Button disabled={pending} onClick={onClick}>
      <TrashIcon />
    </Button>
  );
}
