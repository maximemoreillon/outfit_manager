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
import { garmentsTable } from "@/db/schema";
import { toast } from "sonner";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { updateGarmentAction } from "@/actions/garments";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { readTypes, readBrands, readColors } from "@/lib/misc";
import DeleteGarmentButton from "./deleteButton";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string(),
  comment: z.string(),
  quantity: z.coerce.number(),
  brand: z.string(),
  type: z.string(),
  color: z.string(),
});

type Props = { garment: typeof garmentsTable.$inferSelect };

export default function GarmentEditForm(props: Props) {
  const [types, setTypes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.garment.name,
      type: props.garment.type || "",
      color: props.garment.color || "",
      brand: props.garment.brand || "",
      description: props.garment.description || "",
      comment: props.garment.comment || "",

      quantity: props.garment.quantity,
    },
  });

  const actionWithId = updateGarmentAction.bind(null, props.garment.id);
  const [state, action, pending] = useActionState(actionWithId, null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => action(values));
  }

  useEffect(() => {
    readTypes().then(setTypes);
    readBrands().then(setBrands);
    readColors().then(setColors);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        form.handleSubmit(onSubmit)();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [form, onSubmit]);

  useEffect(() => {
    if (state?.success) toast(`Garment saved`);
    else if (state?.error) toast(state.error);
  }, [state]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between">
          <Button type="submit" disabled={pending}>
            {pending ? (
              <>
                <Loader2Icon className="animate-spin" /> Saving
              </>
            ) : (
              <>
                <SaveIcon /> Save
              </>
            )}
          </Button>

          <DeleteGarmentButton id={props.garment.id} />
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Grey jacket" {...field} />
              </FormControl>
              <FormDescription>Name of the garment</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Combobox
                items={types}
                inputValue={field.value}
                onInputValueChange={(val, { reason }) => {
                  if (reason !== "input-clear") field.onChange(val);
                }}
              >
                <ComboboxInput placeholder="Pants" showClear />
                <ComboboxContent>
                  <ComboboxEmpty>No existing types.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <FormDescription>Type of the garment</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <Combobox
                items={brands}
                inputValue={field.value}
                onInputValueChange={(val, { reason }) => {
                  if (reason !== "input-clear") field.onChange(val);
                }}
              >
                <ComboboxInput placeholder="Uniqlo" showClear />
                <ComboboxContent>
                  <ComboboxEmpty>No existing brands.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <FormDescription>Brand of the garment</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <Combobox
                items={colors}
                inputValue={field.value}
                onInputValueChange={(val, { reason }) => {
                  if (reason !== "input-clear") field.onChange(val);
                }}
              >
                <ComboboxInput placeholder="Navy" showClear />
                <ComboboxContent>
                  <ComboboxEmpty>No existing colors.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <FormDescription>Color of the garment</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Slim fit" {...field} />
              </FormControl>
              <FormDescription>Description of the item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Input placeholder="Has inner pockets" {...field} />
              </FormControl>
              <FormDescription>Comment about item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="2" {...field} type="number" />
              </FormControl>
              <FormDescription>Quantity of said item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
