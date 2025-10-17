CREATE TABLE "achievement" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"date" text,
	"category" text
);
--> statement-breakpoint
CREATE TABLE "activity" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"date" text NOT NULL,
	"extracurricular_id" integer
);
--> statement-breakpoint
CREATE TABLE "career" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"details" text NOT NULL,
	"date" text NOT NULL,
	"image_url" text NOT NULL,
	"content" text NOT NULL,
	"published_at" text NOT NULL,
	"author" text,
	CONSTRAINT "event_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "extracurricular" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"category" text,
	"icon" text,
	"image" text,
	"established" text,
	"member_count" integer,
	"achievement_count" integer,
	"year_established" integer,
	"meetings_per_week" integer,
	"coach" text,
	"schedule" text,
	"location" text,
	"fee" text,
	"full_description" text,
	"requirements" jsonb,
	"activities" jsonb,
	"registration_open" boolean,
	"registration_period" text,
	"contact_info" text,
	"statistics" jsonb,
	"registration_info" jsonb,
	CONSTRAINT "extracurricular_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "job_title" (
	"id" serial PRIMARY KEY NOT NULL,
	"icon" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kapro_profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"jabatan" text NOT NULL,
	"kapro_name" text NOT NULL,
	"quote" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "major_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"logo" text NOT NULL,
	"short" text NOT NULL,
	"name_major" text NOT NULL,
	"header_color" text NOT NULL,
	"bg_color" text NOT NULL,
	"hover_bg_color" text NOT NULL,
	"text_color" text NOT NULL,
	"btn_color" text NOT NULL,
	"description" text NOT NULL,
	"prerequisites" jsonb NOT NULL,
	"related_courses" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "major_topic" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"subtitle" text NOT NULL,
	"thumbnail" text NOT NULL,
	"tags" jsonb NOT NULL,
	"content" text NOT NULL,
	"published_at" text NOT NULL,
	"author" text,
	CONSTRAINT "news_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "organization" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"nickname" text,
	"logo" text NOT NULL,
	"logo_description" text,
	"description" text NOT NULL,
	"history" text,
	"established" text,
	"contact_info" jsonb,
	"statistics" jsonb NOT NULL,
	"leadership" jsonb NOT NULL,
	"sections" jsonb NOT NULL,
	"photos" jsonb,
	"recruitment_poster" text,
	"recruitment_period" text,
	CONSTRAINT "organization_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "organization_activity" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer NOT NULL,
	"activity_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "staff" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"name" text NOT NULL,
	"position" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teacher" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"degree" text,
	"university" text,
	"quote" text,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "teacher_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"pagination" text NOT NULL,
	"description" text NOT NULL,
	"classes" jsonb NOT NULL,
	"materials_by_class" jsonb NOT NULL,
	"teaching_focus" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teacher_category_teacher" (
	"id" serial PRIMARY KEY NOT NULL,
	"teacher_category_id" integer NOT NULL,
	"teacher_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "timeline" (
	"id" serial PRIMARY KEY NOT NULL,
	"year" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"icon" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "activity" ADD CONSTRAINT "activity_extracurricular_id_extracurricular_id_fk" FOREIGN KEY ("extracurricular_id") REFERENCES "public"."extracurricular"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_activity" ADD CONSTRAINT "organization_activity_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_activity" ADD CONSTRAINT "organization_activity_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_category_teacher" ADD CONSTRAINT "teacher_category_teacher_teacher_category_id_teacher_category_id_fk" FOREIGN KEY ("teacher_category_id") REFERENCES "public"."teacher_category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_category_teacher" ADD CONSTRAINT "teacher_category_teacher_teacher_id_teacher_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teacher"("id") ON DELETE cascade ON UPDATE no action;