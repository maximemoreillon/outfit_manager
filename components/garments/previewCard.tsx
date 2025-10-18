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
import React from "react";
import { PlusIcon, TrashIcon } from "lucide-react";
import AddOutfitButton from "../outfits/garments/addOutfitButton";

type Props = {
  garment: typeof garmentsTable.$inferSelect;
  onSelect?: (garment: typeof garmentsTable.$inferSelect) => void;
  onRemove?: (garment: typeof garmentsTable.$inferSelect) => void;
  onAdd?: (garment: typeof garmentsTable.$inferSelect) => void; // Experimental
};

interface WrapperProps<T> extends Props {
  children: React.ReactNode;
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
  return (
    // TODO: not super clean
    <Wrapper {...props}>
      <Card className="pt-0 overflow-hidden">
        <img
          className="w-full aspect-2/3  object-cover"
          src={
            props.garment.image
              ? `/api/garments/${props.garment.id}/thumbnail`
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"
          }
          alt=""
        />
        <CardHeader>
          <CardTitle className="truncate">{props.garment.name}</CardTitle>
          <CardDescription className="flex justify-between">
            <span>{props.garment.brand}</span>
            <span>{props.garment.color}</span>
          </CardDescription>
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
            {props.onAdd && (
              <AddOutfitButton
                outfit_id={1} // TODO: get actual value
                garment_id={props.garment.id}
                onAdd={() => {
                  if (props.onAdd) props.onAdd(props.garment);
                }}
              />
            )}

            {props.onRemove && (
              <Button
                variant="destructive"
                onClick={() => {
                  if (props.onRemove) props.onRemove(props.garment);
                }}
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
