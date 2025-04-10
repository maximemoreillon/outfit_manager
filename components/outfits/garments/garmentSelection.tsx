"use client";

import ClientPagination from "@/components/clientPagination";
import GarmentsFilters from "@/components/garments/garmentsFilters";
import GarmentPreviewCard from "@/components/garments/previewCard";
import { garmentsTable, outfitsTable } from "@/db/schema";
import { readGarments } from "@/lib/garments";
import { addGarmentToOutfit } from "@/lib/outfitGarments";
import { useEffect, useState } from "react";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
  onSelect: Function;
};

export default function GarmentSelection(props: Props) {
  // TODO: infer type from readGarments
  const [data, setData] = useState<Awaited<
    ReturnType<typeof readGarments>
  > | null>(null);
  // const [garments, setGarments] = useState<
  //   (typeof garmentsTable.$inferSelect)[]
  // >([]);
  const [isLoading, setLoading] = useState(true);

  // TODO: typing
  async function fetchGarments(params: any) {
    setLoading(true);
    const d = await readGarments(params);
    setData(d);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      fetchGarments({});
    })();
  }, []);

  async function handleSelect(garment: typeof garmentsTable.$inferSelect) {
    await addGarmentToOutfit({
      garment_id: garment.id,
      outfit_id: props.outfit.id,
    });
    props.onSelect(garment);
  }

  // TODO: Is this good enough?
  // TODO: typing
  function handleFiltersUpdate(filters: any) {
    (async () => {
      fetchGarments(filters);
    })();
  }
  return (
    <>
      <GarmentsFilters onUpdate={handleFiltersUpdate} />
      {data && (
        <>
          {data.items.map((garment) => (
            <GarmentPreviewCard
              garment={garment}
              key={garment.id}
              selectable
              onSelect={() => handleSelect(garment)}
            />
          ))}

          <ClientPagination
            total={data.total}
            limit={data.limit}
            offset={data.offset}
            onPageChange={fetchGarments}
          />
        </>
      )}
      {/* TODO: Pagination */}
    </>
  );
}
