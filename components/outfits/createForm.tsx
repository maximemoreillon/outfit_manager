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
import { uploadImage } from "@/lib/images";
import { createOutfit } from "@/lib/outfits";

const formSchema = z.object({
  imageFileList: z.custom<FileList>(),
});

export default function OutfitCreateForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit({ imageFileList }: z.infer<typeof formSchema>) {
    const [imageFile] = imageFileList;
    const key = await uploadImage(imageFile);

    const { id } = await createOutfit({ image: key });
    router.push(`/outfits/${id}`);
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

        <Button type="submit">Upload</Button>
      </form>
    </Form>
  );
}
