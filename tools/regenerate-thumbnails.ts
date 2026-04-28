import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function main() {
  const { db } = await import("@/db");
  const { garmentsTable, outfitsTable } = await import("@/db/schema");
  const { generateGarmentThumbnail, generateOutfitThumbnail } = await import(
    "@/lib/images"
  );
  const { isNotNull } = await import("drizzle-orm");

  const garments = await db
    .select({ id: garmentsTable.id })
    .from(garmentsTable)
    .where(isNotNull(garmentsTable.image));

  const outfits = await db
    .select({ id: outfitsTable.id })
    .from(outfitsTable)
    .where(isNotNull(outfitsTable.image));

  console.log(
    `Found ${garments.length} garments and ${outfits.length} outfits with images`
  );

  for (const { id } of garments) {
    try {
      await generateGarmentThumbnail(id);
      await generateGarmentThumbnail(id, true);
      console.log(`garment ${id}: ok`);
    } catch (err) {
      console.error(`garment ${id}: failed`, err);
    }
  }

  for (const { id } of outfits) {
    try {
      await generateOutfitThumbnail(id);
      await generateOutfitThumbnail(id, true);
      console.log(`outfit ${id}: ok`);
    } catch (err) {
      console.error(`outfit ${id}: failed`, err);
    }
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
