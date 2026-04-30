"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { List, Grid2X2 } from "lucide-react";

type DisplayMode = "cards" | "table";

type Props = {
  value: DisplayMode;
  onValueChange: (value: DisplayMode) => void;
};

export default function DisplayModeToggle({ value, onValueChange }: Props) {
  return (
    <ToggleGroup
      className="my-4"
      type="single"
      value={value}
      onValueChange={(v: DisplayMode) => {
        if (v) onValueChange(v);
      }}
    >
      <ToggleGroupItem value="table">
        <List />
      </ToggleGroupItem>
      <ToggleGroupItem value="cards">
        <Grid2X2 />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
