"use client";

import { garmentsTable } from "@/db/schema";
import { useState } from "react";
import ImageUploadForm from "./imageUploadForm";

type Props = {
  garment: typeof garmentsTable.$inferSelect;
};

export function GarmentImage(props: Props) {
  const [image, setImage] = useState(props.garment.image);

  return (
    <div>
      <img
        className="w-full"
        src={
          image
            ? `/api/images/garments/${props.garment.id}/${image}`
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"
        }
        alt=""
      />
      <ImageUploadForm garment={props.garment} onUpdate={setImage} />
    </div>
  );
}
