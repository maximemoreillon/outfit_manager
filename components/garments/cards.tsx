"use client";
import { garmentsTable } from "@/db/schema";
import GarmentPreviewCard from "./previewCard";

type Props = {
  garments: (typeof garmentsTable.$inferSelect)[];
  onSelect?: (garment: typeof garmentsTable.$inferSelect) => void;
  onRemove?: (garment: typeof garmentsTable.$inferSelect) => void;
};

export default function GarmentCards(props: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3 grid-cols-2">
      {props.garments.map((garment: any) => (
        <GarmentPreviewCard
          garment={garment}
          key={garment.id}
          onSelect={props.onSelect}
          onRemove={props.onRemove}
        />
      ))}
    </div>
  );
}
