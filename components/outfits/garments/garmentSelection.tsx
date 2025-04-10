"use client";

import GarmentsFilters from "@/components/garments/garmentsFilters";
import GarmentPreviewCard from "@/components/garments/previewCard";
import { garmentsTable, outfitsTable } from "@/db/schema";
import { readGarments } from "@/lib/garments";
import { addGarmentToOutfit } from "@/lib/outfitGarments";
import { useEffect, useState } from "react";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
  onSelect: Function;
};

export default function GarmentSelection(props: Props) {
  const [garments, setGarments] = useState<
    (typeof garmentsTable.$inferSelect)[]
  >([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // TODO: deal with pagination
      const { items } = await readGarments({});
      setGarments(items);
      setLoading(false);
    })();
  }, []);

  async function handleSelect(garment: typeof garmentsTable.$inferSelect) {
    await addGarmentToOutfit({
      garment_id: garment.id,
      outfit_id: props.outfit.id,
    });
    props.onSelect(garment);
  }

  // TODO: Is this good enough?
  // TODO: typing
  function handleFiltersUpdate(filters: any) {
    setLoading(true);
    (async () => {
      const { items } = await readGarments(filters);
      setGarments(items);
      setLoading(false);
    })();
  }
  return (
    <>
      <GarmentsFilters onUpdate={handleFiltersUpdate} />
      {garments.map((garment) => (
        <GarmentPreviewCard
          garment={garment}
          key={garment.id}
          selectable
          onSelect={() => handleSelect(garment)}
        />
      ))}
      {/* TODO: Pagination */}
    </>
  );
}
