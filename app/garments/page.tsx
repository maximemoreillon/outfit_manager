"use client";
// Needs to be a client component for interactivity
import GarmentPreviewCard from "@/components/garments/previewCard";
import ServerPagination from "@/components/serverPagination";
import { Button, buttonVariants } from "@/components/ui/button";
import { auth } from "@/auth";
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
import { useCallback, useEffect, useState } from "react";
import { garmentsTable } from "@/db/schema";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Garments() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // const {
  //   items: garments,
  //   total,
  //   offset,
  //   limit,
  // } = await readGarments(await searchParams);

  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { search }: any = searchParams;
      const d = await readGarments({ search });
      setData(d);
      setLoading(false);
    })();
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // TODO: typing
  async function handleFiltersUpdate(newFilters: any) {
    router.push(
      pathname + "?" + createQueryString("search", newFilters.search)
    );
    // setLoading(true);
    // const d = await readGarments(newFilters);
    // setData(d);
    // setLoading(false);
  }

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
      <GarmentsFilters onUpdate={(filters) => handleFiltersUpdate(filters)} />

      {data && (
        <>
          <div className="grid gap-4 grid-cols-3">
            {data.items.map((garment: any) => (
              <GarmentPreviewCard garment={garment} key={garment.id} />
            ))}
          </div>

          <div className="my-4">
            <ServerPagination
              total={data.total}
              limit={data.limit}
              offset={data.offset}
            />
          </div>
        </>
      )}
    </div>
  );
}
