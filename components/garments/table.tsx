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
import { buttonVariants } from "../ui/button";

type Props = {
  garments: (typeof garmentsTable.$inferSelect)[];
};

export default async function GarmentsTable(props: Props) {
  return (
    <Table>
      <TableCaption>Garments</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>See</TableHead>
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
              <Link
                href={`/garments/${garment.id}`}
                className={buttonVariants({})}
              >
                See
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
