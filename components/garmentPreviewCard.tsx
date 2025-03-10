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

type Props = {
  garment: {
    name: string;
    description: string;
    image: string;
    id: number;
  };
};

export default function GarmentPreviewCard(props: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.garment.name}</CardTitle>
        <CardDescription>{props.garment.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {props.garment.image ? (
          <img src={`/images/${props.garment.image}`} alt="" />
        ) : (
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png" />
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/garments/${props.garment.id}`}>See</Link>
      </CardFooter>
    </Card>
  );
}
