"use client";

import { garmentsTable } from "@/db/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NONE = "__none__";

type Props = {
  templates: (typeof garmentsTable.$inferSelect)[];
  value: number | null;
  onChange: (id: number | null) => void;
  excludeId?: number;
  placeholder?: string;
};

export default function GarmentGenericSelector({
  templates,
  value,
  onChange,
  excludeId,
  placeholder = "Select a template",
}: Props) {
  const filtered = excludeId
    ? templates.filter((t) => t.id !== excludeId)
    : templates;

  return (
    <Select
      value={value !== null ? String(value) : NONE}
      onValueChange={(v) => onChange(v === NONE ? null : Number(v))}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={NONE}>None</SelectItem>
        {filtered.map((t) => (
          <SelectItem key={t.id} value={String(t.id)}>
            {t.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
