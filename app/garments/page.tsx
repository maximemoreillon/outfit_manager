import GarmentPreviewCard from "@/components/garmentPreviewCard";
import { Button } from "@/components/ui/button";
import { readGarments } from "@/lib/garments";
import Link from "next/link";
export default async function Garments() {
  const garments = await readGarments();
  return (
    <div>
      <div>Garments</div>
      <div>
        <Link href="/garments/new">New garment</Link>
      </div>
      <div className="grid">
        {garments.map((garment) => (
          <GarmentPreviewCard garment={garment} key={garment.id} />
        ))}
      </div>
    </div>
  );
}
