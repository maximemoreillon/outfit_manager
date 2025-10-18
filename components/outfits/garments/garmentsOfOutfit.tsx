"use client";
import {
  readOutfitGarments,
  removeGarmentFromOutfit,
} from "@/lib/outfitGarments";
import Link from "next/link";
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
    // TODO: this should be an action
    await removeGarmentFromOutfit(props.outfit.id, garment.id);
    setGarments(garments.filter((g) => g.id !== garment.id));
  }

  function onAdd(addedGarment: typeof garmentsTable.$inferSelect) {
    setGarments([...garments, addedGarment]);
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
      <div>
        <GarmentsList garments={garments} onRemove={removeGarment} />
      </div>

      {/* TODO: pagination */}
    </div>
  );
}
