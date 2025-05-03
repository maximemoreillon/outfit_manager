import ServerPagination from "@/components/serverPagination";
import { Button, buttonVariants } from "@/components/ui/button";
import { readGarments } from "@/lib/garments";
import Link from "next/link";

import GarmentsFilters from "@/components/garments/queryParams";
import GarmentsList from "@/components/garments/list";
import Breadcrumbs from "@/components/breadcrumbs";

export default async function Garments({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = { ...(await searchParams), limit: "9" };

  const { items, total, offset, limit } = await readGarments(params);

  return (
    <div>
      <Breadcrumbs />

      <div className="my-4 flex justify-between">
        <h2 className="text-2xl">Garments</h2>
        <Link href="/garments/new" className={buttonVariants({})}>
          New garment
        </Link>
      </div>
      <GarmentsFilters useSearchParams />

      <GarmentsList garments={items} />

      <ServerPagination
        className="my-4"
        total={total}
        limit={limit}
        offset={offset}
      />
    </div>
  );
}
