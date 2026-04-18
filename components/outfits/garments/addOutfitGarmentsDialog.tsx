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
import ClientPagination from "@/components/clientPagination";
import GarmentsList from "@/components/garments/list";
import { PlusIcon } from "lucide-react";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
  onAdd: (garment: typeof garmentsTable.$inferSelect) => void;
  added: number[];
};

export default function AddGarmentOufits(props: Props) {
  const [fetchParams, setFetchParams] = useState({});

  const [data, setData] = useState<Awaited<
    ReturnType<typeof readGarments>
  > | null>(null);

  const [isLoading, setLoading] = useState(true);

  async function fetchGarments() {
    setLoading(true);
    try {
      const d = await readGarments(fetchParams);
      setData(d);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGarments();
  }, [fetchParams]);

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
      <DialogContent className="sm:max-w-[Npx] max-w-5xl">
        <DialogHeader>
          <DialogTitle>Add garments</DialogTitle>
        </DialogHeader>

        <GarmentsFilters
          onUpdate={setFetchParams}
          defaultValues={fetchParams}
        />
        <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
          {data && (
            <>
              <GarmentsList
                garments={data.items.filter((g) => !props.added.includes(g.id))}
                onSelect={handleSelect}
              />
              <div className="mt-4">
                <ClientPagination
                  total={data.total}
                  limit={data.limit}
                  offset={data.offset}
                  onPageChange={(newParams) => {
                    setFetchParams({ ...fetchParams, ...newParams });
                  }}
                />
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
