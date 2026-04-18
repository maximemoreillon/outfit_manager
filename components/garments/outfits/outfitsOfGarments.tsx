"use client";

import { readGarmentOutfits } from "@/lib/outfitGarments";
import { garmentsTable, outfitsTable } from "@/db/schema";
import { useEffect, useState } from "react";
import OutfitPreviewCard from "@/components/outfits/previewCard";
import { Loader2Icon } from "lucide-react";

type Props = {
  garment: typeof garmentsTable.$inferSelect;
  className?: string;
};

export default function OutfitsOfGarment(props: Props) {
  const [outfits, setOutfits] = useState<(typeof outfitsTable.$inferSelect)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { items } = await readGarmentOutfits(Number(props.garment.id));
      setOutfits(items);
      setLoading(false);
    })();
  }, [props.garment.id]);

  return (
    <div className={props.className}>
      <h3 className="my-4 text-2xl">Outfits using this garment</h3>
      {loading ? (
        <Loader2Icon className="animate-spin" />
      ) : outfits.length === 0 ? (
        <p className="text-muted-foreground">No outfits found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-3">
          {outfits.map((outfit) => (
            <OutfitPreviewCard outfit={outfit} key={outfit.id} />
          ))}
        </div>
      )}
    </div>
  );
}
