"use client";

import { outfitsTable } from "@/db/schema";
import { useState } from "react";
import ImageUploadForm from "./imagUpdateForm";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
};

export function OutfitImage(props: Props) {
  const [image, setImage] = useState(props.outfit.image);

  return (
    <div>
      <img
        className="w-full"
        src={
          image
            ? `/api/images/outfits/${props.outfit.id}/${image}`
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"
        }
        alt=""
      />
      <ImageUploadForm outfit={props.outfit} onUpdate={setImage} />
    </div>
  );
}
