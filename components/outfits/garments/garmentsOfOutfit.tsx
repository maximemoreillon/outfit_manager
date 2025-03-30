import GarmentPreviewCard from "@/components/garments/previewCard";
import ServerPagination from "@/components/serverPagination";
import { Button, buttonVariants } from "@/components/ui/button";
import { auth } from "@/auth";
import { readOutfitGarments } from "@/lib/outfitGarments";
import Link from "next/link";

export default async function GarmentsOfOutfit() {
  const { items: garments } = await readOutfitGarments(1);

  return (
    <div>
      {/* TODO: allow different viewing styles, e.g. tables */}
      <div className="grid gap-4 grid-cols-3">
        {garments.map((garment) => (
          <GarmentPreviewCard garment={garment} key={garment.id} />
        ))}
      </div>

      {/* <div className="my-4">
        <ServerPagination total={total} limit={limit} offset={offset} />
      </div> */}
    </div>
  );
}
