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
import { startTransition, useActionState } from "react";
import { Loader2Icon, Save } from "lucide-react";
import { createGarmentAction } from "@/actions/garments";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export default function GarmentCreateForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "New garment",
    },
  });

  const [state, action, pending] = useActionState(createGarmentAction, null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => action(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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

        <Button type="submit" disabled={pending}>
          {pending ? (
            <>
              <Loader2Icon className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save />
              <span>Save </span>
            </>
          )}
        </Button>
        {state?.error && (
          <div className="text-red-700 text-center">{state.error}</div>
        )}
      </form>
    </Form>
  );
}
