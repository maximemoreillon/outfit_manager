import Link from "next/link";
import { outfitsTable } from "@/db/schema";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
};

export default function OutfitPreviewCard(props: Props) {
  return (
    <Link href={`/outfits/${props.outfit.id}`}>
      <img
        className="w-full aspect-2/3 object-cover rounded-xl shadow-sm"
        src={
          props.outfit.image
            ? `/api/outfits/${props.outfit.id}/thumbnail`
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"
        }
        alt=""
      />
    </Link>
  );
}
