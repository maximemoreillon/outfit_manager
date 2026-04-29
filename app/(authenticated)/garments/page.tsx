import LinkPagination from "@/components/linkPagination";
import { buttonVariants } from "@/components/ui/button";
import { readGarments } from "@/lib/garments";
import Link from "next/link";
import GarmentsFilters from "@/components/garments/queryParams";
import GarmentsList from "@/components/garments/list";
import Breadcrumbs from "@/components/breadcrumbs";
import { Plus } from "lucide-react";
import { Suspense } from "react";

export default async function Garments({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const isGeneric = sp.is_generic === "true";
  const params = {
    ...sp,
    limit: "12",
    is_generic: isGeneric ? "true" : "false",
  };
  const { items, total, offset, limit } = await readGarments(params);

  return (
    <div>
      <Breadcrumbs />
      <div className="my-4 flex justify-between">
        <h2 className="text-2xl">{isGeneric ? "Generic" : "Garments"}</h2>
        <Link
          href={`/garments/new${isGeneric ? "?is_generic=true" : ""}`}
          className={buttonVariants({})}
        >
          <Plus /> New
        </Link>
      </div>

      <Suspense>
        <GarmentsFilters useSearchParams />
      </Suspense>

      <GarmentsList garments={items} total={total} />

      <LinkPagination
        className="my-4"
        total={total}
        limit={limit}
        offset={offset}
      />
    </div>
  );
}
