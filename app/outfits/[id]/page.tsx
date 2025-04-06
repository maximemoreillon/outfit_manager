import OutfitEditForm from "@/components/outfits/editForm";

import { readOutfit } from "@/lib/outfits";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DeleteOutfitButton from "@/components/outfits/deleteButton";
import { OutfitImage } from "@/components/outfits/image";
import AddOutfitGarments from "@/components/outfits/garments/addOutfitGarments";
import GarmentsOfOutfit from "@/components/outfits/garments/garmentsOfOutfit";
import { readOutfitGarments } from "@/lib/outfitGarments";

export default async function Outfit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const outfit = await readOutfit(Number(id));

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/outfits">Outfits</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {outfit && (
        <div>
          <div className="flex justify-between">
            <h2 className="text-3xl my-4">{outfit.id}</h2>
            <DeleteOutfitButton id={outfit.id} />
          </div>

          <div className="grid gap-4 grid-cols-2">
            <OutfitEditForm outfit={outfit} />

            <OutfitImage outfit={outfit} />

            <div className="col-span-2">
              <GarmentsOfOutfit outfit={outfit} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
