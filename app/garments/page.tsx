import GarmentPreviewCard from "@/components/garments/previewCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { readGarments } from "@/lib/garments";
import Link from "next/link";
export default async function Garments() {
  const garments = await readGarments();
  return (
    <div>
      <h2 className="text-2xl my-4">Garments</h2>
      <div className="my-4">
        <Link href="/garments/new" className={buttonVariants({})}>
          New garment
        </Link>
      </div>
      <div className="grid gap-4 grid-cols-3">
        {garments.map((garment) => (
          <GarmentPreviewCard garment={garment} key={garment.id} />
        ))}
      </div>
    </div>
  );
}
