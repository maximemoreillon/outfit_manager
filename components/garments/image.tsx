"use client";

import { garmentsTable } from "@/db/schema";
import { useState } from "react";
import ImageUploadForm from "./imageUploadForm";
import ImagePlaceholder from "@/components/ui/imagePlaceholder";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

type Props = {
  garment: typeof garmentsTable.$inferSelect;
};

export function GarmentImage(props: Props) {
  const [image, setImage] = useState(props.garment.image);

  return (
    <div>
      {image ? (
        <Dialog>
          <DialogTrigger asChild>
            <img
              className="w-full rounded-xl cursor-zoom-in"
              src={`/api/garments/${props.garment.id}/thumbnail`}
              alt=""
            />
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] max-h-[90vh] p-4 flex items-center justify-center overflow-hidden">
            <VisuallyHidden.Root>
              <DialogTitle>Full image</DialogTitle>
            </VisuallyHidden.Root>
            <img
              className="max-h-full max-w-full w-auto rounded-xl"
              src={`/api/images/garments/${props.garment.id}/${image}`}
              alt=""
            />
          </DialogContent>
        </Dialog>
      ) : (
        <ImagePlaceholder className="w-full aspect-2/3 rounded-xl" />
      )}
      <ImageUploadForm garment={props.garment} onUpdate={setImage} />
    </div>
  );
}
