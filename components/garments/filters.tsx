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
import { useEffect, useState } from "react";
import { readBrands, readColors, readTypes } from "@/lib/misc";

const formSchema = z.object({
  search: z.string(),
  color: z.string().nullable(),
  brand: z.string().nullable(),
  type: z.string().nullable(),
});

type Props = {
  useSearchParams?: boolean;
  onUpdate?: (values: z.infer<typeof formSchema>) => void;
};

export default function GarmentsFilters(props: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // TODO: Have a single state for all
  const [types, setTypes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      // TODO: Have a single state for all
      setBrands(await readBrands());
      setColors(await readColors());
      setTypes(await readTypes());
    })();
  }, []);

  const defaultValues = {
    search: "",
    type: "",
    brand: "",
    color: "",
  };

  // Populate default values from search params if required
  if (props.useSearchParams) {
    (Object.keys(defaultValues) as Array<keyof typeof defaultValues>).forEach(
      (k) => {
        defaultValues[k] = searchParams.get(k) || "";
      }
    );
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
          name="type"
          render={({ field }) => (
            <FormItem className="grow-1">
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null!}>Any</SelectItem>
                    {types.map((e, i) => (
                      <SelectItem value={e} key={i}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem className="grow-1">
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null!}>Any</SelectItem>
                    {brands.map((e, i) => (
                      <SelectItem value={e} key={i}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem className="grow-1">
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null!}>Any</SelectItem>
                    {colors.map((e, i) => (
                      <SelectItem value={e} key={i}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Set</Button>
      </form>
    </Form>
  );
}
