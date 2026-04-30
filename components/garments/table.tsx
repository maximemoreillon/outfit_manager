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
import { Button } from "../ui/button";
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
          <TableHead className="hidden sm:table-cell"></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="hidden md:table-cell">Brand</TableHead>
          <TableHead className="hidden md:table-cell">Size</TableHead>
          <TableHead className="hidden lg:table-cell">Color</TableHead>
          <TableHead className="hidden md:table-cell">Qty</TableHead>
          {(props.onSelect || props.onRemove) && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.garments.map((garment) => (
          <TableRow key={garment.id}>
            <TableCell className="hidden sm:table-cell">
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
              <Link href={`/garments/${garment.id}`} className="flex items-center gap-2 hover:underline">
                {garment.name}
                {garment.hidden && <EyeOffIcon size={14} className="text-muted-foreground shrink-0" />}
              </Link>
            </TableCell>
            <TableCell>{garment.type ?? "—"}</TableCell>
            <TableCell className="hidden md:table-cell">{garment.brand ?? "—"}</TableCell>
            <TableCell className="hidden md:table-cell">{garment.size ?? "—"}</TableCell>
            <TableCell className="hidden lg:table-cell">{garment.color ?? "—"}</TableCell>
            <TableCell className="hidden md:table-cell">{garment.quantity}</TableCell>
            {(props.onSelect || props.onRemove) && (
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
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
