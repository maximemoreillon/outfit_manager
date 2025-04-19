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
import { outfitsTable } from "@/db/schema";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
};

export default function OutfitPreviewCard(props: Props) {
  return (
    <Link href={`/outfits/${props.outfit.id}`}>
      <Card>
        {/* <CardHeader>
          <CardTitle>{props.outfit.name}</CardTitle>
          <CardDescription>{props.outfit.image}</CardDescription>
        </CardHeader> */}
        <CardContent>
          <img
            className="w-full"
            src={
              props.outfit.image
                ? `/api/images/outfits/${props.outfit.id}/${props.outfit.image}`
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
