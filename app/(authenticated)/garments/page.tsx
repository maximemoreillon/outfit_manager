import LinkPagination from "@/components/linkPagination";
import { buttonVariants } from "@/components/ui/button";
import { readGarments } from "@/lib/garments";
import Link from "next/link";
import GarmentsFilters from "@/components/garments/queryParams";
import GarmentsList from "@/components/garments/list";
import Breadcrumbs from "@/components/breadcrumbs";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

export default async function Garments({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const isTemplate = sp.is_template === "true";
  const params = { ...sp, limit: "9", is_template: isTemplate ? "true" : "false" };
  const { items, total, offset, limit } = await readGarments(params);

  return (
    <div>
      <Breadcrumbs />
      <div className="my-4 flex justify-between">
        <h2 className="text-2xl">{isTemplate ? "Templates" : "Garments"}</h2>
        <Link
          href={`/garments/new${isTemplate ? "?is_template=true" : ""}`}
          className={buttonVariants({})}
        >
          <Plus /> New
        </Link>
      </div>

      <div className="flex gap-2 mb-4">
        <Link
          href="/garments"
          className={buttonVariants({
            variant: !isTemplate ? "default" : "outline",
            size: "sm",
          })}
        >
          Physical
        </Link>
        <Link
          href="/garments?is_template=true"
          className={buttonVariants({
            variant: isTemplate ? "default" : "outline",
            size: "sm",
          })}
        >
          Templates
        </Link>
      </div>

      <Suspense>
        <GarmentsFilters useSearchParams />
      </Suspense>

      <GarmentsList garments={items} />

      <LinkPagination className="my-4" total={total} limit={limit} offset={offset} />
    </div>
  );
}
