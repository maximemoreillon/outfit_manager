"use client";

import { Button } from "@/components/ui/button";
import { uploadImage } from "@/lib/images";
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

// TODO: refine
const formSchema = z.object({
  imageFileList: z.custom<FileList>(),
});

type Props = {
  garment: any;
};

export default function ImageUploadForm(props: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   image: "",
    // },
  });

  async function onSubmit({ imageFileList }: z.infer<typeof formSchema>) {
    const [image] = imageFileList;
    console.log(image);
    await uploadImage(props.garment.id, image);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="imageFileList"
            render={() => (
              <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <Input {...form.register("imageFileList")} type="file" />
                </FormControl>
                <FormDescription>Picture of the garment</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Save item</Button>
        </form>
      </Form>
    </div>
  );
}
