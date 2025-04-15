"use client";
import GarmentPreviewCard from "@/components/garments/previewCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { auth } from "@/auth";
import { readGarmentOutfits } from "@/lib/outfitGarments";
import Link from "next/link";
import { garmentsTable, outfitsTable } from "@/db/schema";
import { useEffect, useState } from "react";
import OutfitPreviewCard from "@/components/outfits/previewCard";

type Props = {
  garment: typeof outfitsTable.$inferSelect;
};

export default function OutfitsOfGarment(props: Props) {
  // TODO: get the outfit id from the url or props
  // const { items: garments } = await readOutfitGarments(1);

  // TODO: find how to refresh once a garment is added?
  const [outfits, setOutfits] = useState<(typeof outfitsTable.$inferSelect)[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { items } = await readGarmentOutfits(Number(props.garment.id));
      setOutfits(items);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <div className="flex justify-between my-4">
        <h3 className="my-4 text-2xl">Outfits using this garment</h3>
      </div>
      {/* TODO: allow different viewing styles, e.g. tables */}
      <div className="grid gap-4 grid-cols-3">
        {outfits.map((outfit) => (
          <OutfitPreviewCard outfit={outfit} />
        ))}
      </div>

      {/* <div className="my-4">
        <ServerPagination total={total} limit={limit} offset={offset} />
      </div> */}
    </div>
  );
}
