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
import { Switch } from "@/components/ui/switch";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { readFilters } from "@/lib/misc";
import { Search } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";

const ANY = "__any__";

const filterSchemaProperties = {
  color: z.string().nullable(),
  brand: z.string().nullable(),
  type: z.string().nullable(),
};

const formSchema = z.object({
  search: z.string(),
  is_generic: z.string(),
  ...filterSchemaProperties,
});

type Filters = {
  search?: string;
  type?: string;
  brand?: string;
  color?: string;
  is_generic?: string;
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
    is_generic: "false",
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
      },
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

  // TODO: have this just for search
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (props.onUpdate) props.onUpdate(values);
    if (props.useSearchParams) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("offset");

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
        <div className="flex gap-4 items-center">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Search</FormLabel>
                <ButtonGroup className="w-full">
                  <Input placeholder="Grey jacket" {...field} />
                  {/* <Button variant="outline">Search</Button> */}
                  <Button
                    type="submit"
                    // className="size-8"
                    variant="outline"
                  >
                    <Search />
                  </Button>
                </ButtonGroup>
                {/* <FormControl></FormControl> */}
                <FormMessage />
              </FormItem>
            )}
          />

          {props.useSearchParams && (
            <FormField
              control={form.control}
              name="is_generic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 mt-6">
                  <Switch
                    checked={field.value === "true"}
                    onCheckedChange={(checked) => {
                      field.onChange(checked ? "true" : "false");
                      form.handleSubmit(onSubmit)();
                    }}
                  />
                  <FormLabel className="!mt-0">Generic</FormLabel>
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="flex gap-4">
          {Object.keys(availableFilters).map((f) => (
            <FormField
              key={f}
              control={form.control}
              name={f as keyof typeof availableFilters}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{f}</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || ANY}
                      onValueChange={(e) => {
                        field.onChange(e === ANY ? null : e);
                        form.handleSubmit(onSubmit)();
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ANY}>Any</SelectItem>
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

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </form>
    </Form>
  );
}
