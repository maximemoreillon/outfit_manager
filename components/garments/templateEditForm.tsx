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
import { readAllGarmentTemplates } from "@/lib/garments";
import GarmentTemplateSelector from "./templateSelector";
import DeleteGarmentButton from "./deleteButton";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string(),
  brand: z.string(),
  type: z.string(),
  color: z.string(),
  size: z.string(),
  parent_id: z.number().nullable(),
  is_template: z.boolean(),
});

type Props = { garment: typeof garmentsTable.$inferSelect };

export default function TemplateEditForm(props: Props) {
  const [types, setTypes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [templates, setTemplates] = useState<
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
      size: props.garment.size || "",
      parent_id: props.garment.parent_id ?? null,
      is_template: props.garment.is_template,
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
    readAllGarmentTemplates().then(setTemplates);
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
    if (state?.success) toast("Template saved");
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
          name="is_template"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <Switch checked={field.value} onCheckedChange={field.onChange} />
              <FormLabel className="!mt-0">Template</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="White dress shirt" {...field} />
              </FormControl>
              <FormDescription>Name of this garment type</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="parent_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent type</FormLabel>
              <GarmentTemplateSelector
                templates={templates}
                value={field.value}
                onChange={field.onChange}
                excludeId={props.garment.id}
                placeholder="Select a parent type"
              />
              <FormDescription>A more generic type this one belongs to</FormDescription>
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
                <ComboboxInput placeholder="Shirt" showClear />
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
                <ComboboxInput placeholder="White" showClear />
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Slim fit, French cuffs" {...field} />
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
      </form>
    </Form>
  );
}
