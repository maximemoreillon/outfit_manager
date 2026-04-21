ALTER TABLE "garments" ALTER COLUMN "description" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "outfits" ALTER COLUMN "description" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "garments" ADD COLUMN "hidden" boolean DEFAULT false NOT NULL;