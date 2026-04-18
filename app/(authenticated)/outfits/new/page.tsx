import OutfitCreateForm from "@/components/outfits/createForm";

import Link from "next/link";

export default function NewOutfit() {
  return (
    <div>
      <h2 className="my-4 text-2xl">Create new outfit</h2>
      <div>
        <Link href="/outfits">Back</Link>
      </div>
      <OutfitCreateForm />
    </div>
  );
}
