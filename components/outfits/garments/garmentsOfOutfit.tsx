"use client";
import { removeAction } from "@/actions/outfitGarments";
import { readOutfitGarments } from "@/lib/outfitGarments";
import { garmentsTable, outfitsTable } from "@/db/schema";
import AddGarmentOufits from "./addOutfitGarmentsDialog";
import { useEffect, useState } from "react";
import GarmentsList from "@/components/garments/list";
import ClientPagination from "@/components/clientPagination";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
};

const LIMIT = 9;

export default function GarmentsOfOutfit(props: Props) {
  const [garments, setGarments] = useState<
    (typeof garmentsTable.$inferSelect)[]
  >([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  async function fetchGarments(newOffset = offset) {
    setLoading(true);
    const { items, total } = await readOutfitGarments(
      Number(props.outfit.id),
      LIMIT,
      newOffset
    );
    setGarments(items);
    setTotal(total);
    setLoading(false);
  }

  useEffect(() => {
    fetchGarments(0);
  }, []);

  async function removeGarment(garment: typeof garmentsTable.$inferSelect) {
    await removeAction(null, {
      outfit_id: props.outfit.id,
      garment_id: garment.id,
    });
    await fetchGarments(offset);
  }

  function onAdd(addedGarment: typeof garmentsTable.$inferSelect) {
    setGarments((prev) => [...prev, addedGarment]);
    setTotal((prev) => prev + 1);
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
      <ClientPagination
        className="my-4"
        total={total}
        limit={LIMIT}
        offset={offset}
        onPageChange={({ offset: newOffset }) => {
          setOffset(newOffset);
          fetchGarments(newOffset);
        }}
      />
    </div>
  );
}
