"use client";
import { removeAction } from "@/actions/outfitGarments";
import { readOutfitGarments } from "@/lib/outfitGarments";
import { garmentsTable, outfitsTable } from "@/db/schema";
import AddGarmentOufits from "./addOutfitGarmentsDialog";
import { useEffect, useState } from "react";
import GarmentsList from "@/components/garments/list";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
};

export default function GarmentsOfOutfit(props: Props) {
  const [garments, setGarments] = useState<
    (typeof garmentsTable.$inferSelect)[]
  >([]);

  async function fetchGarments() {
    const items = await readOutfitGarments(Number(props.outfit.id));
    setGarments(items);
  }

  useEffect(() => {
    fetchGarments();
  }, []);

  async function removeGarment(garment: typeof garmentsTable.$inferSelect) {
    await removeAction(null, {
      outfit_id: props.outfit.id,
      garment_id: garment.id,
    });
    await fetchGarments();
  }

  function onAdd(addedGarment: typeof garmentsTable.$inferSelect) {
    setGarments((prev) => [...prev, addedGarment]);
  }

  return (
    <div>
      <div className="flex justify-between my-4 items-center">
        <h3 className="my-4 text-2xl">Garments in this outfit</h3>
        <AddGarmentOufits
          outfit={props.outfit}
          onAdd={onAdd}
          added={garments.map((g) => g.id)}
        />
      </div>
      <GarmentsList garments={garments} onRemove={removeGarment} />
    </div>
  );
}
