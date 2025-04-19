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
      <Card>
        <CardHeader>
          <CardTitle className="truncate">{props.garment.name}</CardTitle>
          <CardDescription className="flex justify-between">
            <span>{props.garment.brand}</span>
            <span>{props.garment.color}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: Thumbnail */}
          <img
            className="w-full aspect-2/3  object-cover"
            src={
              props.garment.image
                ? `/api/images/garments/${props.garment.id}/${props.garment.image}`
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
