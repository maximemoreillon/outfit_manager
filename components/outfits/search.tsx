"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Search } from "lucide-react";
import { ButtonGroup } from "../ui/button-group";

export default function OutfitsSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    defaultValues: { search: searchParams.get("search") ?? "" },
  });

  function onSubmit({ search }: { search: string }) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("offset");
    if (search) params.set("search", search);
    else params.delete("search");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 items-end my-4"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>Search</FormLabel>
              <ButtonGroup className="w-full">
                <FormControl>
                  <Input placeholder="Summer look..." {...field} />
                </FormControl>
                <Button
                  type="submit"
                  // className="size-8"
                  variant="outline"
                >
                  <Search />
                </Button>
              </ButtonGroup>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
