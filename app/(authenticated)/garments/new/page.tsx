import GarmentCreateForm from "@/components/garments/createForm";
import Link from "next/link";

export default async function NewGarment({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const isGeneric = sp.is_generic === "true";

  return (
    <div>
      <h2 className="my-4 text-2xl">
        {isGeneric ? "Add generic garment" : "Create new garment"}
      </h2>
      <div>
        <Link href={isGeneric ? "/garments?is_generic=true" : "/garments"}>
          Back
        </Link>
      </div>
      <GarmentCreateForm isGeneric={isGeneric} />
    </div>
  );
}
