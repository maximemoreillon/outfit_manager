import OutfitPreviewCard from "@/components/outfits/previewCard";
import ServerPagination from "@/components/serverPagination";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { readOutfits } from "@/lib/outfits";

import Breadcrumbs from "@/components/breadcrumbs";

export default async function Outfits({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = { ...(await searchParams), limit: "9" };
  const { items: outfits, total, offset, limit } = await readOutfits(params);

  return (
    <div>
      <Breadcrumbs />

      <div className="my-4 flex justify-between">
        <h2 className="text-2xl">Outfits</h2>
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
