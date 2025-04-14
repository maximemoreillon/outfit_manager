import OutfitPreviewCard from "@/components/outfits/previewCard";
import ServerPagination from "@/components/serverPagination";
import { Button, buttonVariants } from "@/components/ui/button";
import { auth } from "@/auth";
import Link from "next/link";
import { readOutfits } from "@/lib/outfits";

import Breadcrumbs from "@/components/breadcrumbs";
export default async function Outfits({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const {
    items: outfits,
    total,
    offset,
    limit,
  } = await readOutfits(await searchParams);

  return (
    <div>
      <Breadcrumbs />

      <h2 className="text-2xl my-4">Outfits</h2>
      <div className="my-4">
        <Link href="/outfits/new" className={buttonVariants({})}>
          New outfit
        </Link>
      </div>
      <div className="grid gap-4 grid-cols-3">
        {outfits.map((outfit) => (
          <OutfitPreviewCard outfit={outfit} key={outfit.id} />
        ))}
      </div>
      <div className="my-4">
        <ServerPagination total={total} limit={limit} offset={offset} />
      </div>
    </div>
  );
}
