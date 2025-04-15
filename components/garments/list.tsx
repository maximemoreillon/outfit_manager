"use client";
import { garmentsTable } from "@/db/schema";
import { useState } from "react";
import GarmentsTable from "./table";
import GarmentCards from "./cards";
import { Button } from "../ui/button";

type Props = {
  garments: (typeof garmentsTable.$inferSelect)[];
  onSelect?: (garment: typeof garmentsTable.$inferSelect) => void;
  onRemove?: (garment: typeof garmentsTable.$inferSelect) => void;
};

export default function GarmentsList(props: Props) {
  const [mode, setMode] = useState<"cards" | "table">("cards");
  return (
    <>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            setMode("cards");
          }}
        >
          Cards
        </Button>
        <Button
          onClick={() => {
            setMode("table");
          }}
        >
          Table
        </Button>
      </div>
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
