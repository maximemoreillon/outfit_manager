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
import { readFilters } from "@/lib/misc";

const filterSchemaProperties = {
  color: z.string().nullable(),
  brand: z.string().nullable(),
  type: z.string().nullable(),
};

const formSchema = z.object({
  search: z.string(),
  ...filterSchemaProperties,
});

type Filters = {
  search?: string;
  type?: string;
  brand?: string;
  color?: string;
};

type Props = {
  useSearchParams?: boolean;
  onUpdate?: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: Filters;
};

export default function GarmentsFilters(props: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [availableFilters, setAvailableFilters] = useState<{
    type: string[];
    color: string[];
    brand: string[];
  }>({
    type: [],
    color: [],
    brand: [],
  });

  const defaultValues = {
    search: "",
    type: "",
    brand: "",
    color: "",
    ...props.defaultValues,
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

  useEffect(() => {
    (async () => {
      setAvailableFilters(await readFilters());
    })();
  }, []);

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
        className="flex flex-col gap-2"
      >
        <div className="flex gap-4">
          {Object.keys(availableFilters).map((f) => (
            <FormField
              key={f}
              control={form.control}
              name={f as keyof typeof availableFilters}
              render={({ field }) => (
                <FormItem className="grow-1">
                  <FormLabel>{f}</FormLabel>
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
                        {availableFilters[
                          f as keyof typeof availableFilters
                        ].map((e, i) => (
                          <SelectItem value={e} key={i}>
                            {e}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {/* <FormDescription>Search</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="flex gap-4 items-end">
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
          <Button type="submit">Set</Button>
        </div>
      </form>
    </Form>
  );
}
