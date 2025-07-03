"use client";

import { Button } from "@/components/ui/button";
import { uploadGarmentImage } from "@/lib/images";
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
import { garmentsTable } from "@/db/schema";
import { useState } from "react";
import { Upload } from "lucide-react";

// TODO: refine
const formSchema = z.object({
  imageFileList: z.custom<FileList>(),
});

type Props = {
  garment: typeof garmentsTable.$inferSelect;
  onUpdate: Function;
};

export default function ImageUploadForm(props: Props) {
  const [uploading, setUploading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit({ imageFileList }: z.infer<typeof formSchema>) {
    setUploading(true);
    const [imageFile] = imageFileList;
    const { image: imageKey } = await uploadGarmentImage(
      props.garment.id,
      imageFile
    );

    props.onUpdate(imageKey);
    setUploading(false);
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
            <FormItem className="w-full">
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <Input {...form.register("imageFileList")} type="file" />
              </FormControl>
              {/* <FormDescription>Picture of the garment</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={uploading}>
          <Upload />
        </Button>
      </form>
    </Form>
  );
}
