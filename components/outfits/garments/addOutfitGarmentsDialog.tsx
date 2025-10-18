"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { readGarments } from "@/lib/garments";
import { garmentsTable, outfitsTable } from "@/db/schema";
import { addGarmentToOutfit } from "@/lib/outfitGarments";
import GarmentsFilters from "@/components/garments/queryParams";
import ClientPagination from "@/components/clientPagination";
import GarmentsList from "@/components/garments/list";
import { PlusIcon } from "lucide-react";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
  onAdd: Function;
  added: number[];
};

export default function AddGarmentOufits(props: Props) {
  // TODO: typing
  const [fetchParams, setFetchParams] = useState({});

  const [data, setData] = useState<Awaited<
    ReturnType<typeof readGarments>
  > | null>(null);

  const [isLoading, setLoading] = useState(true);

  async function fetchGarments() {
    setLoading(true);
    const d = await readGarments(fetchParams);
    setData(d);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      fetchGarments();
    })();
  }, [fetchParams]);

  async function handleSelect(garment: typeof garmentsTable.$inferSelect) {
    // TODO: not sure if this is better here opr on the parent. probably the parent
    // TODO: this should be a server action
    await addGarmentToOutfit({
      garment_id: garment.id,
      outfit_id: props.outfit.id,
    });
    props.onAdd(garment);
    toast(`${garment.name} added to outfit`);
  }

  function handleOpenChange(open: boolean) {
    // if (open) fetchGarments();
    // if (!open) setData(null);
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> Add
        </Button>
      </DialogTrigger>
      {/* TODO: Fix alignment problem */}
      <DialogContent className="sm:max-w-[Npx] max-w-5xl">
        <DialogHeader>
          <DialogTitle>Add garments</DialogTitle>
          {/* <DialogDescription>Add garments to this outfit</DialogDescription> */}
        </DialogHeader>

        <GarmentsFilters
          onUpdate={setFetchParams}
          defaultValues={fetchParams}
        />
        <div className="overflow-y-auto max-h-[calc(100vh-300px)] ">
          {data && (
            <>
              <GarmentsList
                garments={data.items.filter((g) => !props.added.includes(g.id))}
                onSelect={handleSelect}
              />
              {/* <GarmentCards garments={data.items} onSelect={handleSelect} /> */}
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
        {/* <DialogFooter>
          <Button type="submit">Close</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
