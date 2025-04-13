"use client";
import { garmentsTable } from "@/db/schema";
import GarmentPreviewCard from "./previewCard";

type Props = {
  garments: (typeof garmentsTable.$inferSelect)[];
};

export default function GarmentsList(props: Props) {
  return (
    <div className="grid gap-4 grid-cols-3">
      {props.garments.map((garment: any) => (
        <GarmentPreviewCard garment={garment} key={garment.id} />
      ))}
    </div>
  );
}
