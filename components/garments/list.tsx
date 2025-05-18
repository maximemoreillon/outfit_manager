"use client";
import { garmentsTable } from "@/db/schema";
import { useState } from "react";
import GarmentsTable from "./table";
import GarmentCards from "./cards";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Table, GalleryHorizontal } from "lucide-react";

type Props = {
  garments: (typeof garmentsTable.$inferSelect)[];
  onSelect?: (garment: typeof garmentsTable.$inferSelect) => void;
  onRemove?: (garment: typeof garmentsTable.$inferSelect) => void;
};

export default function GarmentsList(props: Props) {
  const [mode, setMode] = useState<"cards" | "table">("cards");
  return (
    <>
      <ToggleGroup
        className="my-4"
        type="single"
        value={mode}
        onValueChange={(a: "table" | "cards") => {
          setMode(a);
        }}
      >
        <ToggleGroupItem value="table">
          <Table />
        </ToggleGroupItem>
        <ToggleGroupItem value="cards">
          <GalleryHorizontal />
        </ToggleGroupItem>
      </ToggleGroup>

      <div>
        {mode === "cards" && (
          <GarmentCards
            garments={props.garments}
            onSelect={props.onSelect}
            onRemove={props.onRemove}
          />
        )}
        {mode === "table" && (
          <GarmentsTable
            garments={props.garments}
            onSelect={props.onSelect}
            onRemove={props.onRemove}
          />
        )}
      </div>
    </>
  );
}
