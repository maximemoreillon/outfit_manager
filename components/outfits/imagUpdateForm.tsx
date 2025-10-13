"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { outfitsTable } from "@/db/schema";
import { uploadImageAction } from "@/actions/outfits";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

// TODO: refine
const formSchema = z.object({
  imageFileList: z.custom<FileList>(),
});

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
  onUpdate: Function;
};

export default function ImageUploadForm(props: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const actionWithId = uploadImageAction.bind(null, props.outfit.id);
  const [state, action, pending] = useActionState(actionWithId, null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => action(values));
  }

  useEffect(() => {
    if (state?.success) props.onUpdate(state.data?.image);
    else if (state?.error) toast(state.error);
  }, [state]);

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
              {/* <FormDescription>Picture of the outfit</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={pending}>
          Upload
        </Button>
      </form>
    </Form>
  );
}
