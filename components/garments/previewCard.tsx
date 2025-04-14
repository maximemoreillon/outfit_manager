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

type Props = {
  garment: typeof garmentsTable.$inferSelect;
  removable?: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
};

export default function GarmentPreviewCard(props: Props) {
  return (
    // <Link href={`/garments/${props.garment.id}`}>
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

      <CardFooter>
        {props.onSelect && (
          <Button
            onClick={() => {
              if (props.onSelect) props.onSelect();
            }}
          >
            Select
          </Button>
        )}

        {props.removable && (
          <Button
            variant="destructive"
            onClick={() => {
              if (props.onRemove) props.onRemove();
            }}
          >
            Remove
          </Button>
        )}

        {!props.removable && !props.onSelect && (
          <Link
            href={`/garments/${props.garment.id}`}
            className={buttonVariants({})}
          >
            See
          </Link>
        )}
      </CardFooter>
    </Card>
    // </Link>
  );
}
