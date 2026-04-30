"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { garmentsTable } from "@/db/schema";
import { useState } from "react";
import { EyeOffIcon, TrashIcon } from "lucide-react";
import ImagePlaceholder from "@/components/ui/imagePlaceholder";

type Props = {
  garment: typeof garmentsTable.$inferSelect;
  showGenericBadge?: boolean;
  onSelect?: (garment: typeof garmentsTable.$inferSelect) => void;
  onRemove?: (
    garment: typeof garmentsTable.$inferSelect,
  ) => void | Promise<void>;
};

export default function GarmentPreviewCard(props: Props) {
  const [removing, setRemoving] = useState(false);
  const href = `/garments/${props.garment.id}`;

  async function handleRemove(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!props.onRemove) return;
    setRemoving(true);
    try {
      await props.onRemove(props.garment);
    } finally {
      setRemoving(false);
    }
  }

  const card = (
    <Card className="pt-0 overflow-hidden">
      <div className="relative">
        {props.garment.image ? (
          <img
            className="w-full aspect-2/3 object-cover"
            src={`/api/garments/${props.garment.id}/thumbnail?size=sm`}
            alt=""
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder className="w-full aspect-2/3" />
        )}
        {props.showGenericBadge && props.garment.is_generic && (
          <span className="absolute top-2 left-2 z-10 text-xs bg-black/60 text-white px-2 py-0.5 rounded-full">
            Generic
          </span>
        )}
        {props.garment.hidden && (
          <span className="absolute top-2 right-2 z-10 bg-black/60 text-white p-1 rounded-full">
            <EyeOffIcon size={12} />
          </span>
        )}
        {props.garment.quantity > 1 && (
          <span className="absolute bottom-2 right-2 z-10 text-xs bg-black/60 text-white px-2 py-0.5 rounded-full">
            ×{props.garment.quantity}
          </span>
        )}
      </div>
      <CardHeader>
        <CardTitle className="truncate">{props.garment.name}</CardTitle>
        {(props.garment.type || props.garment.brand) && (
          <CardDescription className="flex justify-between">
            <span>{props.garment.type ?? "—"}</span>
            <span>{props.garment.brand ?? "—"}</span>
          </CardDescription>
        )}
        {(props.garment.size || props.garment.color) && (
          <CardDescription className="flex justify-between">
            <span>{props.garment.size ?? "—"}</span>
            <span>{props.garment.color ?? "—"}</span>
          </CardDescription>
        )}
      </CardHeader>

      {props.onRemove && (
        <CardFooter className="flex gap-2 justify-end">
          <Button
            variant="destructive"
            disabled={removing}
            onClick={handleRemove}
          >
            <TrashIcon />
          </Button>
        </CardFooter>
      )}
    </Card>
  );

  if (props.onSelect)
    return (
      <div
        className="cursor-pointer"
        onClick={() => props.onSelect!(props.garment)}
      >
        {card}
      </div>
    );
  return <Link href={href}>{card}</Link>;
}
