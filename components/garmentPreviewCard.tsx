import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { garmentsTable } from "@/db/schema";

type Props = {
  garment: typeof garmentsTable.$inferSelect;
};

export default function GarmentPreviewCard(props: Props) {
  return (
    <Link href={`/garments/${props.garment.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{props.garment.name}</CardTitle>
          <CardDescription>{props.garment.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            className="w-full"
            src={
              props.garment.image
                ? `/images/${props.garment.image}`
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"
            }
            alt=""
          />
        </CardContent>
        {/* <CardFooter></CardFooter> */}
      </Card>
    </Link>
  );
}
