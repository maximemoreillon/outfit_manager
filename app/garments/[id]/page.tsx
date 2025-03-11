import GarmentEditForm from "@/components/garmentEditForm";
import ImageUploadForm from "@/components/imageUploadForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { readGarment, updateGarment } from "@/lib/garments";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function Garment({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const garment = await readGarment(Number(id));
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/garments">Garments</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {garment && (
        <div>
          <h2 className="text-3xl my-4">{garment.name}</h2>

          <div className="flex gap-2">
            <div>
              <div>
                {garment?.image && (
                  <img src={`/images/${garment.image}`} alt={garment.name} />
                )}
              </div>
            </div>
            <div>
              <GarmentEditForm garment={garment} />

              <ImageUploadForm garment={garment} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
