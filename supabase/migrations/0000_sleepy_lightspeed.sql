CREATE TABLE IF NOT EXISTS "OrderItemTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"item_id" integer NOT NULL,
	"price" numeric NOT NULL,
	"unit" varchar(10) NOT NULL,
	"quality" numeric NOT NULL,
	"price_per_unit" numeric NOT NULL,
	"total_price" numeric NOT NULL,
	"amount" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "OrderTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_id" integer NOT NULL,
	"delivery_date" timestamp DEFAULT now() NOT NULL,
	"total" numeric NOT NULL,
	"status" timestamp DEFAULT now() NOT NULL,
	"paid" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ProductCategoryTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ProductTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"price" numeric NOT NULL,
	"stock" numeric NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ProviderTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"phone" varchar(15) NOT NULL,
	"email" text NOT NULL,
	"address" text NOT NULL,
	"address_details" text NOT NULL,
	"company_name" text NOT NULL,
	"role" boolean NOT NULL,
	CONSTRAINT "ProviderTable_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UsersTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"phone" varchar(15) NOT NULL,
	"email" text NOT NULL,
	"address_details" text NOT NULL,
	"company_name" text NOT NULL,
	"role" boolean NOT NULL,
	CONSTRAINT "UsersTable_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OrderItemTable" ADD CONSTRAINT "OrderItemTable_order_id_OrderTable_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."OrderTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OrderItemTable" ADD CONSTRAINT "OrderItemTable_item_id_ProductTable_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."ProductTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OrderTable" ADD CONSTRAINT "OrderTable_client_id_UsersTable_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."UsersTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
