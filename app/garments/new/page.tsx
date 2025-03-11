import GarmentCreateForm from "@/components/garmentCreateForm";

import Link from "next/link";

export default function NewGarment() {
  return (
    <div>
      <h2 className="my-4 text-2xl">Create new garment</h2>
      <div>
        <Link href="/garments">Back</Link>
      </div>
      <GarmentCreateForm />
    </div>
  );
}
