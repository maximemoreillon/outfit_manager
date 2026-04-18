CREATE TABLE "garments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text DEFAULT 'Unnnamed garment' NOT NULL,
	"description" text DEFAULT 'No description',
	"image" text,
	"color" text,
	"brand" text,
	"comment" text,
	"type" text,
	"size" text,
	"quantity" integer DEFAULT 1 NOT NULL,
	"rating" integer,
	"condition" integer DEFAULT 100 NOT NULL,
	"is_generic" boolean DEFAULT false NOT NULL,
	"parent_id" integer,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE "outfit_garments" (
	"id" serial PRIMARY KEY NOT NULL,
	"outfit_id" integer NOT NULL,
	"garment_id" integer NOT NULL,
	CONSTRAINT "outfit_garments_outfit_id_garment_id_unique" UNIQUE("outfit_id","garment_id")
);
--> statement-breakpoint
CREATE TABLE "outfits" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" text,
	"description" text DEFAULT 'No description',
	"comment" text,
	"rating" integer,
	"user_id" text
);
--> statement-breakpoint
ALTER TABLE "garments" ADD CONSTRAINT "garments_parent_id_garments_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."garments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outfit_garments" ADD CONSTRAINT "outfit_garments_outfit_id_outfits_id_fk" FOREIGN KEY ("outfit_id") REFERENCES "public"."outfits"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outfit_garments" ADD CONSTRAINT "outfit_garments_garment_id_garments_id_fk" FOREIGN KEY ("garment_id") REFERENCES "public"."garments"("id") ON DELETE cascade ON UPDATE no action;