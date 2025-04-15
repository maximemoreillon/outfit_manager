"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { readGarments } from "@/lib/garments";
import { garmentsTable, outfitsTable } from "@/db/schema";
import { addGarmentToOutfit } from "@/lib/outfitGarments";
import GarmentsFilters from "@/components/garments/filters";
import ClientPagination from "@/components/clientPagination";
import GarmentCards from "@/components/garments/cards";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
  onAdd: Function;
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
    await addGarmentToOutfit({
      garment_id: garment.id,
      outfit_id: props.outfit.id,
    });
    props.onAdd(garment);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add garments</Button>
      </DialogTrigger>
      {/* TODO: Fix alignment problem */}
      <DialogContent className="sm:max-w-[Npx] ">
        <DialogHeader>
          <DialogTitle>Add garments</DialogTitle>
          <DialogDescription>Add garments to this outfit</DialogDescription>
        </DialogHeader>

        <GarmentsFilters onUpdate={setFetchParams} />
        <div className="overflow-y-auto max-h-[calc(100vh-300px)] ">
          {data && (
            <>
              <GarmentCards garments={data.items} onSelect={handleSelect} />
              <ClientPagination
                total={data.total}
                limit={data.limit}
                offset={data.offset}
                onPageChange={(newParams) => {
                  setFetchParams({ ...fetchParams, ...newParams });
                }}
              />
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
