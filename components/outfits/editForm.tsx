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
import { updateOutfit } from "@/lib/outfits";
import { outfitsTable } from "@/db/schema";

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateOutfit(props.outfit.id, { ...props.outfit, ...values });
  }

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

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
