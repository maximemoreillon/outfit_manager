"use client";
import GarmentPreviewCard from "@/components/garments/previewCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { auth } from "@/auth";
import {
  readOutfitGarments,
  removeGarmentFromOutfit,
} from "@/lib/outfitGarments";
import Link from "next/link";
import { garmentsTable, outfitsTable } from "@/db/schema";
import AddGarmentOufits from "./addOutfitGarmentsDialog";
import { useEffect, useState } from "react";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
};

export default function GarmentsOfOutfit(props: Props) {
  // TODO: get the outfit id from the url or props
  // const { items: garments } = await readOutfitGarments(1);

  // TODO: find how to refresh once a garment is added?
  const [garments, setGarments] = useState<
    (typeof garmentsTable.$inferSelect)[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { items } = await readOutfitGarments(Number(props.outfit.id));
      setGarments(items);
      setLoading(false);
    })();
  }, []);

  async function removeGarment(garment: typeof garmentsTable.$inferSelect) {
    await removeGarmentFromOutfit(props.outfit.id, garment.id);
    setGarments(garments.filter((g) => g.id !== garment.id));
  }

  return (
    <div>
      <div className="flex justify-between my-4">
        <h3 className="my-4 text-2xl">Garments in this outfit</h3>
        <AddGarmentOufits
          outfit={props.outfit}
          onAdd={(addedGarment: typeof garmentsTable.$inferSelect) => {
            setGarments([...garments, addedGarment]);
          }}
        />
      </div>
      {/* TODO: allow different viewing styles, e.g. tables */}
      <div className="grid gap-4 grid-cols-3">
        {garments.map((garment) => (
          <GarmentPreviewCard
            garment={garment}
            key={garment.id}
            removable
            onRemove={() => removeGarment(garment)}
          />
        ))}
      </div>

      {/* <div className="my-4">
        <ServerPagination total={total} limit={limit} offset={offset} />
      </div> */}
    </div>
  );
}
