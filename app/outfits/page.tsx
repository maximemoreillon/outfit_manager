import OutfitPreviewCard from "@/components/outfits/previewCard";
import ServerPagination from "@/components/serverPagination";
import { Button, buttonVariants } from "@/components/ui/button";
import { auth } from "@/auth";
import { readGarments } from "@/lib/garments";
import Link from "next/link";

export default async function Garments({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();
  if (!session?.user) return null;

  const {
    items: garments,
    total,
    offset,
    limit,
  } = await readGarments(await searchParams);

  return (
    <div>
      <h2 className="text-2xl my-4">Outfits</h2>
      <div className="my-4">
        <Link href="/garments/new" className={buttonVariants({})}>
          New outfit
        </Link>
      </div>
      {/* TODO: allow different viewing styles, e.g. tables */}
      <div className="grid gap-4 grid-cols-3">
        {garments.map((garment) => (
          <OutfitPreviewCard garment={garment} key={garment.id} />
        ))}
      </div>

      <div className="my-4">
        <ServerPagination total={total} limit={limit} offset={offset} />
      </div>
    </div>
  );
}
