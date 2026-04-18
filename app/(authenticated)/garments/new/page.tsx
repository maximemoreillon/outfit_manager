import GarmentCreateForm from "@/components/garments/createForm";
import Link from "next/link";

export default async function NewGarment({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const isTemplate = sp.is_template === "true";

  return (
    <div>
      <h2 className="my-4 text-2xl">
        {isTemplate ? "Add template" : "Create new garment"}
      </h2>
      <div>
        <Link href={isTemplate ? "/garments?is_template=true" : "/garments"}>
          Back
        </Link>
      </div>
      <GarmentCreateForm isTemplate={isTemplate} />
    </div>
  );
}
