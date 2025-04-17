"use client";

import { readGarmentOutfits } from "@/lib/outfitGarments";
import { garmentsTable, outfitsTable } from "@/db/schema";
import { useEffect, useState } from "react";
import OutfitPreviewCard from "@/components/outfits/previewCard";

type Props = {
  garment: typeof garmentsTable.$inferSelect;
};

export default function OutfitsOfGarment(props: Props) {
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
      <div className="grid gap-4 grid-cols-3">
        {outfits.map((outfit) => (
          <OutfitPreviewCard outfit={outfit} key={outfit.id} />
        ))}
      </div>

      {/* <div className="my-4">
        <ServerPagination total={total} limit={limit} offset={offset} />
      </div> */}
    </div>
  );
}
