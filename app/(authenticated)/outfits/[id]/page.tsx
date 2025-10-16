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

      <div>
        <div className="flex justify-between">
          <h2 className="text-3xl my-4">{outfit.id}</h2>
          <DeleteOutfitButton id={outfit.id} />
        </div>

        <div className="grid gap-4 grid-cols-2">
          <OutfitEditForm outfit={outfit} />

          <OutfitImage outfit={outfit} />

          <div className="col-span-full">
            <GarmentsOfOutfit outfit={outfit} />
          </div>
        </div>
      </div>
    </div>
  );
}
