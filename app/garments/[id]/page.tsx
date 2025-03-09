import ImageUploadForm from "@/components/imageUploadForm";
import { readGarment } from "@/lib/garments";
import Link from "next/link";

export default async function Garment({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const garment = await readGarment(Number(id));
  return (
    <div>
      <div>
        <Link href="/garments">Back</Link>
      </div>
      {garment && (
        <div>
          <div>{garment.name}</div>

          <div>
            <ImageUploadForm garmentId={Number(id)} />
          </div>

          <div>
            {garment?.image && (
              <img src={`/garments/${id}/image`} alt={garment.name} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
