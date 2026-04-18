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
import { PlusIcon, TrashIcon } from "lucide-react";
import AddOutfitButton from "../outfits/garments/addOutfitButton";
import ImagePlaceholder from "@/components/ui/imagePlaceholder";

type Props = {
  garment: typeof garmentsTable.$inferSelect;
  onSelect?: (garment: typeof garmentsTable.$inferSelect) => void;
  onRemove?: (garment: typeof garmentsTable.$inferSelect) => void | Promise<void>;
  onAdd?: (garment: typeof garmentsTable.$inferSelect) => void; // Experimental
  outfit_id?: number; // Required when onAdd is used
};

interface WrapperProps<T> extends Props {
  children: ReactNode;
}

const Wrapper = <T extends HTMLElement>({
  children,
  ...props
}: WrapperProps<T>) => {
  return (
    <>
      {!props.onRemove && !props.onSelect ? (
        <Link href={`/garments/${props.garment.id}`}>{children}</Link>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default function GarmentPreviewCard(props: Props) {
  const [removing, setRemoving] = useState(false);

  async function handleRemove() {
    if (!props.onRemove) return;
    setRemoving(true);
    try {
      await props.onRemove(props.garment);
    } finally {
      setRemoving(false);
    }
  }

  return (
    // TODO: not super clean
    <Wrapper {...props}>
      <Card className="pt-0 overflow-hidden">
        {props.garment.image ? (
          <img
            className="w-full aspect-2/3 object-cover"
            src={`/api/garments/${props.garment.id}/thumbnail`}
            alt=""
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
              <Button
                onClick={() => {
                  if (props.onSelect) props.onSelect(props.garment);
                }}
              >
                Select
              </Button>
            )}

            {/* This is experimental */}
            {props.onAdd && props.outfit_id !== undefined && (
              <AddOutfitButton
                outfit_id={props.outfit_id}
                garment_id={props.garment.id}
              />
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
                <Link href={`/garments/${props.garment.id}`}>See</Link>
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </Wrapper>
  );
}
