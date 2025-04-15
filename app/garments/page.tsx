import ServerPagination from "@/components/serverPagination";
import { Button, buttonVariants } from "@/components/ui/button";
import { readGarments } from "@/lib/garments";
import Link from "next/link";

import GarmentsFilters from "@/components/garments/filters";
import GarmentsList from "@/components/garments/list";
import Breadcrumbs from "@/components/breadcrumbs";

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
      <Breadcrumbs />

      <div className="my-4 flex justify-between">
        <h2 className="text-2xl my-4">Garments</h2>
        <Link href="/garments/new" className={buttonVariants({})}>
          New garment
        </Link>
      </div>
      <GarmentsFilters useSearchParams />

      <>
        <GarmentsList garments={items} />

        <div className="my-4">
          <ServerPagination total={total} limit={limit} offset={offset} />
        </div>
      </>
    </div>
  );
}
