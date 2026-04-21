"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { garmentsTable } from "@/db/schema";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { EyeOffIcon } from "lucide-react";
import ImagePlaceholder from "@/components/ui/imagePlaceholder";

type Props = {
  garments: (typeof garmentsTable.$inferSelect)[];
  onSelect?: (garment: typeof garmentsTable.$inferSelect) => void;
  onRemove?: (garment: typeof garmentsTable.$inferSelect) => void;
};

export default function GarmentsTable(props: Props) {
  return (
    <Table>
      <TableCaption>Garments</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.garments.map((garment) => (
          <TableRow key={garment.id}>
            <TableCell>
              {garment.image ? (
                <img
                  className="size-16 object-cover rounded-md"
                  src={`/api/garments/${garment.id}/thumbnail`}
                  alt=""
                />
              ) : (
                <ImagePlaceholder className="size-16 rounded-md" />
              )}
            </TableCell>
            <TableCell>
              <span className="flex items-center gap-2">
                {garment.name}
                {garment.hidden && <EyeOffIcon size={14} className="text-muted-foreground shrink-0" />}
              </span>
            </TableCell>
            <TableCell>{garment.brand ?? "—"}</TableCell>
            <TableCell>{garment.type ?? "—"}</TableCell>
            <TableCell>{garment.color ?? "—"}</TableCell>
            <TableCell>
              {props.onSelect && (
                <Button onClick={() => props.onSelect!(garment)}>
                  Select
                </Button>
              )}

              {props.onRemove && (
                <Button
                  variant="destructive"
                  onClick={() => props.onRemove!(garment)}
                >
                  Remove
                </Button>
              )}

              {!props.onRemove && !props.onSelect && (
                <Link
                  href={`/garments/${garment.id}`}
                  className={buttonVariants({})}
                >
                  See
                </Link>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
