"use client";

import { deleteGarmentAction } from "@/actions/garments";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Trash } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

type ActionFn = (
  state: unknown,
  id: number
) => Promise<{ error?: string } | void>;

type Props = {
  id: number;
  action?: ActionFn;
};

export default function DeleteGarmentButton({ id, action: customAction }: Props) {
  const [state, action, pending] = useActionState(
    customAction ?? deleteGarmentAction,
    null
  );

  async function onClick() {
    if (!confirm("Are you sure you want to delete this garment?")) return;
    startTransition(() => action(id));
  }

  useEffect(() => {
    if (state?.error) toast(state?.error);
  }, [state]);

  return (
    <Button onClick={onClick} variant="destructive" disabled={pending}>
      {pending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <>
          <Trash /> Delete
        </>
      )}
    </Button>
  );
}
