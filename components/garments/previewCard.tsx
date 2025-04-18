"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { garmentsTable } from "@/db/schema";
import React from "react";

type Props = {
  garment: typeof garmentsTable.$inferSelect;
  onSelect?: (garment: typeof garmentsTable.$inferSelect) => void;
  onRemove?: (garment: typeof garmentsTable.$inferSelect) => void;
};

// href={`/garments/${props.garment.id}`}

export default function GarmentPreviewCard(props: Props) {
  const isLink = !props.onRemove && !props.onSelect;
  const Wrapper = isLink ? Link : React.Fragment;
  return (
    <Wrapper href={`/garments/${props.garment.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{props.garment.name}</CardTitle>
          <CardDescription>{props.garment.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            className="size-32"
            src={
              props.garment.image
                ? `/api/images/${props.garment.image}`
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"
            }
            alt=""
          />
        </CardContent>

        <CardFooter className="flex gap-2">
          {(props.onSelect || props.onRemove) && (
            <Link
              href={`/garments/${props.garment.id}`}
              className={buttonVariants({})}
            >
              See
            </Link>
          )}

          {props.onSelect && (
            <Button
              onClick={() => {
                if (props.onSelect) props.onSelect(props.garment);
              }}
            >
              Select
            </Button>
          )}

          {props.onRemove && (
            <Button
              variant="destructive"
              onClick={() => {
                if (props.onRemove) props.onRemove(props.garment);
              }}
            >
              Remove
            </Button>
          )}
        </CardFooter>
      </Card>
    </Wrapper>
  );
}
