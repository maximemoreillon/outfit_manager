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
import { createOutfitAction } from "@/actions/outfits";

const formSchema = z.object({
  imageFileList: z.custom<FileList>(),
});

export default function OutfitCreateForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [state, action, pending] = useActionState(createOutfitAction, null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => action(values));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 items-end my-4"
      >
        <FormField
          control={form.control}
          name="imageFileList"
          render={() => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <Input {...form.register("imageFileList")} type="file" />
              </FormControl>
              <FormDescription>Picture of the outfit</FormDescription>
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
