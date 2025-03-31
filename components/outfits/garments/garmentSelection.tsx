"use client";

import GarmentPreviewCard from "@/components/garments/previewCard";
import { garmentsTable, outfitsTable } from "@/db/schema";
import { addGarmentToOutfit } from "@/lib/outfitGarments";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
  garments: (typeof garmentsTable.$inferSelect)[];
};

export default function GarmentSelection(props: Props) {
  async function handleSelect(garment_id: number) {
    await addGarmentToOutfit({ garment_id, outfit_id: props.outfit.id });
  }
  return (
    <>
      {props.garments.map((garment) => (
        <GarmentPreviewCard
          garment={garment}
          key={garment.id}
          selectable
          onSelect={() => handleSelect(garment.id)}
        />
      ))}
    </>
  );
}
