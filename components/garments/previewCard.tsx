"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { garmentsTable } from "@/db/schema";
import { ReactNode, useState } from "react";
import { EyeOffIcon, TrashIcon } from "lucide-react";
import ImagePlaceholder from "@/components/ui/imagePlaceholder";

type Props = {
  garment: typeof garmentsTable.$inferSelect;
  showGenericBadge?: boolean;
  onSelect?: (garment: typeof garmentsTable.$inferSelect) => void;
  onRemove?: (garment: typeof garmentsTable.$inferSelect) => void | Promise<void>;
};

export default function GarmentPreviewCard(props: Props) {
  const [removing, setRemoving] = useState(false);
  const href = `/garments/${props.garment.id}`;

  async function handleRemove() {
    if (!props.onRemove) return;
    setRemoving(true);
    try {
      await props.onRemove(props.garment);
    } finally {
      setRemoving(false);
    }
  }

  const card = (
    <Card className="pt-0 overflow-hidden relative">
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
      <CardHeader>
        <CardTitle className="truncate">{props.garment.name}</CardTitle>
        {(props.garment.brand || props.garment.color) && (
          <CardDescription className="flex justify-between">
            <span>{props.garment.brand}</span>
            <span>{props.garment.color}</span>
          </CardDescription>
        )}
      </CardHeader>

      {(props.onRemove || props.onSelect) && (
        <CardFooter className="flex gap-2">
          {props.onSelect && (
            <Button onClick={() => props.onSelect!(props.garment)}>
              Select
            </Button>
          )}
          {props.onRemove && (
            <Button
              variant="destructive"
              disabled={removing}
              onClick={handleRemove}
            >
              <TrashIcon />
            </Button>
          )}
          {(props.onSelect || props.onRemove) && (
            <Button asChild variant="secondary" className="ml-auto">
              <Link href={href}>See</Link>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );

  if (props.onSelect || props.onRemove) return card;
  return <Link href={href}>{card}</Link>;
}
