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
import { readAllGenericGarments } from "@/lib/garments";
import GarmentGenericSelector from "./genericSelector";
import DeleteGarmentButton from "./deleteButton";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string(),
  comment: z.string(),
  quantity: z.coerce.number(),
  brand: z.string(),
  type: z.string(),
  color: z.string(),
  size: z.string(),
  parent_id: z.number().nullable(),
  is_generic: z.boolean(),
  hidden: z.boolean(),
});

type Props = { garment: typeof garmentsTable.$inferSelect };

export default function GarmentEditForm(props: Props) {
  const [types, setTypes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [generics, setGenerics] = useState<
    (typeof garmentsTable.$inferSelect)[]
  >([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.garment.name,
      type: props.garment.type || "",
      color: props.garment.color || "",
      brand: props.garment.brand || "",
      description: props.garment.description || "",
      comment: props.garment.comment || "",
      size: props.garment.size || "",
      quantity: props.garment.quantity,
      parent_id: props.garment.parent_id ?? null,
      is_generic: props.garment.is_generic,
      hidden: props.garment.hidden,
    },
  });

  const isGeneric = form.watch("is_generic");
  const parentId = form.watch("parent_id");
  const parent = generics.find((g) => g.id === parentId) ?? null;

  const actionWithId = updateGarmentAction.bind(null, props.garment.id);
  const [state, action, pending] = useActionState(actionWithId, null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => action(values));
  }

  useEffect(() => {
    readTypes().then(setTypes);
    readBrands().then(setBrands);
    readColors().then(setColors);
    readAllGenericGarments().then(setGenerics);
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
    if (state?.success) toast("Garment saved");
    else if (state?.error) toast(state.error);
  }, [state]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between ">
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

        <div className="flex flex-col sm:flex-row gap-6">
          <FormField
            control={form.control}
            name="is_generic"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FormLabel className="!mt-0">Generic</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hidden"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FormLabel className="!mt-0">Hidden</FormLabel>
              </FormItem>
            )}
          />
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
              <FormMessage />
            </FormItem>
          )}
        />

        {!isGeneric && (
          <FormField
            control={form.control}
            name="parent_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Generic type</FormLabel>
                <GarmentGenericSelector
                  templates={generics}
                  value={field.value}
                  onChange={field.onChange}
                  excludeId={props.garment.id}
                  placeholder="Link to a generic garment"
                />
                <FormDescription>
                  The generic garment this is an instance of
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {parent && (
          <div className="space-y-1 rounded-md border px-3 py-2 text-sm">
            <p className="font-medium text-muted-foreground text-xs mb-2">
              Inherited from{" "}
              <Link
                href={`/garments/${parent.id}`}
                className="font-semibold text-foreground underline underline-offset-2"
              >
                {parent.name}
              </Link>
            </p>
            {parent.type && (
              <p>
                <span className="text-muted-foreground">Type:</span>{" "}
                {parent.type}
              </p>
            )}
            {parent.brand && (
              <p>
                <span className="text-muted-foreground">Brand:</span>{" "}
                {parent.brand}
              </p>
            )}
            {parent.color && (
              <p>
                <span className="text-muted-foreground">Color:</span>{" "}
                {parent.color}
              </p>
            )}
            {parent.size && (
              <p>
                <span className="text-muted-foreground">Size:</span>{" "}
                {parent.size}
              </p>
            )}
          </div>
        )}

        {!parent?.type && (
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
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {!parent?.brand && (
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
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {!parent?.color && (
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
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Slim fit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <Input placeholder="M" {...field} />
              </FormControl>
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
                <Input placeholder="1" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
