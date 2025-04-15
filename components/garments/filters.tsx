"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const formSchema = z.object({
  search: z.string(),
  color: z.string(),
  brand: z.string(),
});

type Props = {
  useSearchParams?: boolean;
  onUpdate?: (values: z.infer<typeof formSchema>) => void;
};

export default function GarmentsFilters(props: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // TODO: query colors, brands, etc
  const defaultValues = {
    search: "",
    brand: "",
    color: "",
  };

  // Populate default values from search params if required
  if (props.useSearchParams) {
    defaultValues.search = searchParams.get("search") || "";
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (props.onUpdate) props.onUpdate(values);
    if (props.useSearchParams) {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(values)) {
        if (value) params.set(key, value);
        else params.delete(key);
      }

      router.push(pathname + "?" + params.toString());
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-end gap-4 my-4"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="grow-1">
              <FormLabel>Search</FormLabel>
              <FormControl>
                <Input placeholder="Grey jacket" {...field} />
              </FormControl>
              {/* <FormDescription>Search</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem className="grow-1">
              <FormLabel>Search</FormLabel>
              <FormControl>
                {/* TODO: check if value is OK */}
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null!}>Any</SelectItem>
                    <SelectItem value="Uniqlo">Uniqlo</SelectItem>
                    <SelectItem value="Zara">Zara</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              {/* <FormDescription>Search</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Set</Button>
      </form>
    </Form>
  );
}
