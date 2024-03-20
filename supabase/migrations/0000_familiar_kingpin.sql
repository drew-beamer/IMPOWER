CREATE TABLE IF NOT EXISTS "award" (
	"award_id" integer PRIMARY KEY NOT NULL,
	"award_name" varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event" (
	"event_id" varchar(16) PRIMARY KEY NOT NULL,
	"event_type" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"week" integer,
	"end_date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event_type" (
	"event_type" integer PRIMARY KEY NOT NULL,
	"description" varchar(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_award" (
	"team_id" varchar(12),
	"event_id" varchar(16),
	"award_id" integer,
	"is_district_team" boolean,
	CONSTRAINT "team_award_team_id_event_id_award_id_pk" PRIMARY KEY("team_id","event_id","award_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"team_id" varchar(12) PRIMARY KEY NOT NULL,
	"team_name" varchar(255) NOT NULL,
	"subregion" varchar(64),
	"country" varchar(40) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_event_type_event_type_event_type_fk" FOREIGN KEY ("event_type") REFERENCES "event_type"("event_type") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_award" ADD CONSTRAINT "team_award_team_id_teams_team_id_fk" FOREIGN KEY ("team_id") REFERENCES "teams"("team_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_award" ADD CONSTRAINT "team_award_event_id_event_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_award" ADD CONSTRAINT "team_award_award_id_award_award_id_fk" FOREIGN KEY ("award_id") REFERENCES "award"("award_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
