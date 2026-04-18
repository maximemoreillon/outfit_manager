"use client";

import { garmentsTable } from "@/db/schema";
import { useState } from "react";
import ImageUploadForm from "./imageUploadForm";
import ImagePlaceholder from "@/components/ui/imagePlaceholder";

type Props = {
  garment: typeof garmentsTable.$inferSelect;
};

export function GarmentImage(props: Props) {
  const [image, setImage] = useState(props.garment.image);

  return (
    <div>
      {image ? (
        <img
          className="w-full rounded-xl"
          src={`/api/images/garments/${props.garment.id}/${image}`}
          alt=""
        />
      ) : (
        <ImagePlaceholder className="w-full aspect-2/3 rounded-xl" />
      )}
      <ImageUploadForm garment={props.garment} onUpdate={setImage} />
    </div>
  );
}
