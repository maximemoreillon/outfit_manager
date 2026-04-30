"use client";
import { garmentsTable } from "@/db/schema";
import { useEffect, useState } from "react";
import GarmentsTable from "./table";
import GarmentCards from "./cards";
import DisplayModeToggle from "./display-mode-toggle";

type Props = {
  garments: (typeof garmentsTable.$inferSelect)[];
  total?: number;
  onSelect?: (garment: typeof garmentsTable.$inferSelect) => void;
  onRemove?: (garment: typeof garmentsTable.$inferSelect) => void;
};

export default function GarmentsList(props: Props) {
  const [mode, setMode] = useState<"cards" | "table">("cards");

  useEffect(() => {
    const saved = localStorage.getItem("garments-display-mode") as "cards" | "table" | null;
    if (saved) setMode(saved);
  }, []);

  const handleModeChange = (value: "cards" | "table") => {
    setMode(value);
    localStorage.setItem("garments-display-mode", value);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <DisplayModeToggle value={mode} onValueChange={handleModeChange} />
        {props.total !== undefined && (
          <span className="text-sm text-muted-foreground">
            {props.total} garments
          </span>
        )}
      </div>

      {props.garments.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No garments found.
        </p>
      ) : (
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
      )}
    </>
  );
}
