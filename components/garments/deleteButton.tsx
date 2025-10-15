"use client";

import { deleteGarmentAction } from "@/actions/garments";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Trash } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  id: number;
};

export default function DeleteGarmentButton(props: Props) {
  const [state, action, pending] = useActionState(deleteGarmentAction, null);

  async function onClick() {
    if (!confirm("Are you sure you want to delete this outfit?")) return;
    startTransition(() => action(props.id));
  }

  useEffect(() => {
    if (state?.error) toast(state?.error);
  }, [state]);

  return (
    <Button
      onClick={onClick}
      variant="destructive"
      size="icon"
      disabled={pending}
    >
      {pending ? <Loader2Icon className="animate-spin" /> : <Trash />}
    </Button>
  );
}
