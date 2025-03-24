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
import { createGarment } from "@/lib/garments";

import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export default function OutfitCreateForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "New garment",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { id } = await createGarment(values);

    router.push(`/garments/${id}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Navy blazer" {...field} />
              </FormControl>
              <FormDescription>Name of the garment</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save item</Button>
      </form>
    </Form>
  );
}
