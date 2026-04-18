import GarmentEditForm from "@/components/garments/editForm";
import TemplateEditForm from "@/components/garments/templateEditForm";
import { readGarment, readGarmentsByParent } from "@/lib/garments";
import { GarmentImage } from "@/components/garments/image";
import Breadcrumbs from "@/components/breadcrumbs";
import OutfitsOfGarment from "@/components/garments/outfits/outfitsOfGarments";
import GarmentsList from "@/components/garments/list";
import { notFound } from "next/navigation";

export default async function Garment({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const garment = await readGarment(Number(id));
  if (!garment) notFound();

  const instances = garment.is_template
    ? await readGarmentsByParent(garment.id)
    : [];

  return (
    <div>
      <Breadcrumbs />
      <h2 className="text-3xl my-4">{garment.name}</h2>
      <div className="grid gap-4 grid-cols-2">
        {garment.is_template ? (
          <TemplateEditForm garment={garment} />
        ) : (
          <GarmentEditForm garment={garment} />
        )}
        <GarmentImage garment={garment} />
        {garment.is_template ? (
          instances.length > 0 && (
            <div className="col-span-full">
              <h3 className="text-2xl my-4">Garments of this type</h3>
              <GarmentsList garments={instances} />
            </div>
          )
        ) : (
          <OutfitsOfGarment garment={garment} className="col-span-2" />
        )}
      </div>
    </div>
  );
}
