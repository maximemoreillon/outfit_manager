"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { readGarments } from "@/lib/garments";
import { addAction } from "@/actions/outfitGarments";
import { garmentsTable, outfitsTable } from "@/db/schema";
import GarmentsFilters from "@/components/garments/queryParams";
import GarmentsList from "@/components/garments/list";
import CallbackPagination from "@/components/callbackPagination";
import { PlusIcon } from "lucide-react";

type View = "generic" | "specific";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
  onAdd: (garment: typeof garmentsTable.$inferSelect) => void;
  added: number[];
};

export default function AddGarmentOufits(props: Props) {
  const [view, setView] = useState<View>("generic");
  const [fetchParams, setFetchParams] = useState<Record<string, unknown>>({});
  const [data, setData] = useState<Awaited<ReturnType<typeof readGarments>> | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setFetchParams({});
  }, [view]);

  useEffect(() => {
    setLoading(true);
    readGarments({ ...fetchParams, is_generic: view === "generic" ? "true" : "false" })
      .then(setData)
      .catch((e) => toast.error(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [fetchParams, view]);

  async function handleSelect(garment: typeof garmentsTable.$inferSelect) {
    const result = await addAction(null, {
      garment_id: garment.id,
      outfit_id: props.outfit.id,
    });
    if (result.error) {
      toast.error(result.error);
      return;
    }
    props.onAdd(garment);
    toast(`${garment.name} added to outfit`);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> Add
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Add garments</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2">
          <Button
            variant={view === "generic" ? "default" : "outline"}
            onClick={() => setView("generic")}
          >
            Any (generic type)
          </Button>
          <Button
            variant={view === "specific" ? "default" : "outline"}
            onClick={() => setView("specific")}
          >
            Specific garment
          </Button>
        </div>

        <GarmentsFilters
          onUpdate={(values) => setFetchParams({ ...values, offset: 0 })}
          defaultValues={fetchParams}
        />

        <div className="overflow-y-auto max-h-[calc(100vh-380px)]">
          {data && (
            <>
              <GarmentsList
                garments={data.items.filter((g) => !props.added.includes(g.id))}
                onSelect={handleSelect}
              />
              <CallbackPagination
                className="mt-4"
                total={data.total}
                limit={data.limit}
                offset={data.offset}
                onPageChange={(newParams) =>
                  setFetchParams({ ...fetchParams, ...newParams })
                }
              />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
