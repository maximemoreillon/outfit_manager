import { Button } from "@/components/ui/button";
import { readGarments } from "@/lib/garments";
import Link from "next/link";
export default async function Garments() {
  return (
    <div>
      <div>Outfir manager</div>
      <div>
        <Link href="/garments">Garments</Link>
      </div>
    </div>
  );
}
