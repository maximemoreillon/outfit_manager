"use client";

import { outfitsTable } from "@/db/schema";
import { useState } from "react";
import ImageUploadForm from "./imagUpdateForm";
import ImagePlaceholder from "@/components/ui/imagePlaceholder";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
};

export function OutfitImage(props: Props) {
  const [image, setImage] = useState(props.outfit.image);

  return (
    <div>
      {image ? (
        <img
          className="w-full rounded-xl"
          src={`/api/images/outfits/${props.outfit.id}/${image}`}
          alt=""
        />
      ) : (
        <ImagePlaceholder className="w-full aspect-2/3 rounded-xl" />
      )}
      <ImageUploadForm outfit={props.outfit} onUpdate={setImage} />
    </div>
  );
}
