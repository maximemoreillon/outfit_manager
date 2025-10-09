"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { outfitsTable } from "@/db/schema";
import { toast } from "sonner";
import { startTransition, useActionState, useEffect } from "react";
import { Loader2Icon, Save } from "lucide-react";
import { updateOutfitAction } from "@/actions/outfits";

const formSchema = z.object({
  description: z.string(),
  comment: z.string(),
});

type Props = { outfit: typeof outfitsTable.$inferSelect };

export default function OutfitEditForm(props: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: props.outfit.description || "",
      comment: props.outfit.comment || "",
    },
  });

  const actionWithId = updateOutfitAction.bind(null, props.outfit.id);
  const [state, action, pending] = useActionState(actionWithId, null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => action(values));
  }

  useEffect(() => {
    if (state?.success) toast(`Garment saved`);
  }, [state]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Beige dominant casual outfit" {...field} />
              </FormControl>
              <FormDescription>Description of the outfit</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Input placeholder="Too many colors" {...field} />
              </FormControl>
              <FormDescription>Comment about outfit</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={pending}>
          {pending ? (
            <>
              <Loader2Icon className="animate-spin" /> Saving
            </>
          ) : (
            <>
              <Save /> Save
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
