"use client";

import { deleteOutfitAction } from "@/actions/outfits";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Trash } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  id: number;
};

export default function DeleteOutfitButton(props: Props) {
  const [state, action, pending] = useActionState(deleteOutfitAction, null);

  async function onClick() {
    if (!confirm("Are you sure you want to delete this outfit?")) return;
    startTransition(() => action(props.id));
  }

  useEffect(() => {
    if (state?.error) toast(state?.error);
  }, [state]);

  return (
    <Button variant="destructive" onClick={onClick}>
      {pending ? <Loader2Icon className="animate-spin" /> : <Trash />}
    </Button>
  );
}
