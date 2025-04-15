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
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.garments.map((garment: any) => (
          <TableRow key={garment.id}>
            <TableCell>
              <img
                className="size-32 object-contain"
                src={
                  garment.image
                    ? `/api/images/${garment.image}`
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"
                }
                alt=""
              />
            </TableCell>
            <TableCell>{garment.name}</TableCell>
            <TableCell>
              {/* <Link
                href={`/garments/${garment.id}`}
                className={buttonVariants({})}
              >
                See
              </Link> */}

              {props.onSelect && (
                <Button
                  onClick={() => {
                    if (props.onSelect) props.onSelect(garment);
                  }}
                >
                  Select
                </Button>
              )}

              {props.onRemove && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (props.onRemove) props.onRemove(garment);
                  }}
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
