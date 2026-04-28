import Link from "next/link";
import { outfitsTable } from "@/db/schema";
import ImagePlaceholder from "@/components/ui/imagePlaceholder";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
};

export default function OutfitPreviewCard(props: Props) {
  return (
    <Link href={`/outfits/${props.outfit.id}`}>
      {props.outfit.image ? (
        <img
          className="w-full aspect-2/3 object-cover rounded-xl shadow-sm"
          src={`/api/outfits/${props.outfit.id}/thumbnail?size=sm`}
          alt=""
          loading="lazy"
        />
      ) : (
        <ImagePlaceholder className="w-full aspect-2/3 rounded-xl" />
      )}
    </Link>
  );
}
