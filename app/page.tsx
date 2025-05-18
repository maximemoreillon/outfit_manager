import Link from "next/link";
import { Shirt, PersonStanding } from "lucide-react";
export default async function Garments() {
  const className =
    "flex flex-col justify-center items-center flex-grow-1 border gap-2 p-4";
  return (
    <div className="flex gap-4">
      <Link href="/garments" className={className}>
        <Shirt size={50} />
        <span>Garments</span>
      </Link>

      <Link href="/outfits" className={className}>
        <PersonStanding size={50} />
        <span>Outfits</span>
      </Link>
    </div>
  );
}
