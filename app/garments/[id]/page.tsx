import GarmentEditForm from "@/components/garments/editForm";

import { readGarment } from "@/lib/garments";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DeleteGarmentButton from "@/components/garments/deleteButton";
import { GarmentImage } from "@/components/garments/image";
import Breadcrumbs from "@/components/breadcrumbs";

export default async function Garment({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const garment = await readGarment(Number(id));
  return (
    <div>
      <Breadcrumbs />
      {garment && (
        <div>
          <div className="flex justify-between">
            <h2 className="text-3xl my-4">{garment.name}</h2>
            <DeleteGarmentButton id={garment.id} />
          </div>

          <div className="grid gap-4 grid-cols-2">
            <GarmentEditForm garment={garment} />

            <GarmentImage garment={garment} />
          </div>
        </div>
      )}
    </div>
  );
}
