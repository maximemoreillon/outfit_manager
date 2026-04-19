"use client";
import { removeAction } from "@/actions/outfitGarments";
import { readOutfitGarments } from "@/lib/outfitGarments";
import { garmentsTable, outfitsTable } from "@/db/schema";
import AddGarmentOufits from "./addOutfitGarmentsDialog";
import { useEffect, useState } from "react";
import GarmentPreviewCard from "@/components/garments/previewCard";
import { Loader2Icon } from "lucide-react";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
};

export default function GarmentsOfOutfit(props: Props) {
  const [garments, setGarments] = useState<(typeof garmentsTable.$inferSelect)[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGarments() {
    setLoading(true);
    const items = await readOutfitGarments(Number(props.outfit.id));
    setGarments(items);
    setLoading(false);
  }

  useEffect(() => {
    fetchGarments();
  }, [props.outfit.id]);

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
      {loading ? (
        <Loader2Icon className="animate-spin" />
      ) : garments.length === 0 ? (
        <p className="text-muted-foreground">No garments added yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3 grid-cols-2">
          {garments.map((garment) => (
            <GarmentPreviewCard
              key={garment.id}
              garment={garment}
              onRemove={removeGarment}
              showGenericBadge
            />
          ))}
        </div>
      )}
    </div>
  );
}
