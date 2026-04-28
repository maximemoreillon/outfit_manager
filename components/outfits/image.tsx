"use client";

import { outfitsTable } from "@/db/schema";
import { useState } from "react";
import ImageUploadForm from "./imageUpdateForm";
import ImagePlaceholder from "@/components/ui/imagePlaceholder";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
};

export function OutfitImage(props: Props) {
  const [image, setImage] = useState(props.outfit.image);

  return (
    <div>
      {image ? (
        <Dialog>
          <DialogTrigger asChild>
            <img
              className="w-full rounded-xl cursor-zoom-in"
              src={`/api/outfits/${props.outfit.id}/thumbnail`}
              alt=""
            />
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 flex items-center justify-center overflow-hidden">
            <VisuallyHidden.Root>
              <DialogTitle>Full image</DialogTitle>
            </VisuallyHidden.Root>
            <img
              className="h-full w-full rounded-xl object-cover"
              src={`/api/images/outfits/${props.outfit.id}/${image}`}
              alt=""
            />
          </DialogContent>
        </Dialog>
      ) : (
        <ImagePlaceholder className="w-full aspect-2/3 rounded-xl" />
      )}
      <ImageUploadForm outfit={props.outfit} onUpdate={setImage} />
    </div>
  );
}
