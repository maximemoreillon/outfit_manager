// "use client";
// Needs to be a client component for interactivity (filter update)

import GarmentPreviewCard from "@/components/garments/previewCard";
import ServerPagination from "@/components/serverPagination";
import { Button, buttonVariants } from "@/components/ui/button";
import { readGarments } from "@/lib/garments";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import GarmentsFilters from "@/components/garments/garmentsFilters";

export default async function Garments({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { items, total, offset, limit } = await readGarments(
    await searchParams
  );

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink>Garments</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-2xl my-4">Garments</h2>
      <div className="my-4">
        <Link href="/garments/new" className={buttonVariants({})}>
          New garment
        </Link>
      </div>
      <GarmentsFilters useSearchParams />

      <>
        <div className="grid gap-4 grid-cols-3">
          {items.map((garment: any) => (
            <GarmentPreviewCard garment={garment} key={garment.id} />
          ))}
        </div>

        <div className="my-4">
          <ServerPagination total={total} limit={limit} offset={offset} />
        </div>
      </>
    </div>
  );
}
