import OutfitEditForm from "@/components/outfits/editForm";

import { readOutfit } from "@/lib/outfits";

import DeleteOutfitButton from "@/components/outfits/deleteButton";
import { OutfitImage } from "@/components/outfits/image";
import GarmentsOfOutfit from "@/components/outfits/garments/garmentsOfOutfit";
import Breadcrumbs from "@/components/breadcrumbs";

export default async function Outfit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const outfit = await readOutfit(Number(id));

  return (
    <div>
      <Breadcrumbs />

      <div className="grid gap-6 grid-cols-2 my-4">
        <OutfitImage outfit={outfit} />
        <OutfitEditForm outfit={outfit} />

        <div className="col-span-full">
          <GarmentsOfOutfit outfit={outfit} />
        </div>
      </div>
    </div>
  );
}
