-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `__drizzle_migrations` (
	`id` numeric PRIMARY KEY,
	`hash` text NOT NULL,
	`created_at` numeric
);
--> statement-breakpoint
CREATE TABLE `email_verification_token` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires` blob,
	FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `mux_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`email` text,
	`phone` text,
	`role` text DEFAULT 'free' NOT NULL,
	`stripe_id` text,
	`username` text,
	`avatar_url` text NOT NULL,
	`github_id` text,
	`google_id` text,
	`nickname` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`accessible_courses_read` text,
	`accessible_courses` text,
	`github_installation_id` text,
	`favourite_courses` blob
);
--> statement-breakpoint
CREATE TABLE `user_key` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`hashed_password` text,
	FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`active_expires` blob NOT NULL,
	`idle_expires` blob NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tag` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`link` text NOT NULL,
	`content_index_id` blob NOT NULL,
	`approved` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `content_category` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`link` text NOT NULL,
	`content_index_id` blob NOT NULL,
	`approved` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `content_index` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`chapter_order` blob NOT NULL,
	`link` text,
	`is_locked` integer DEFAULT false NOT NULL,
	`is_premium` integer DEFAULT false NOT NULL,
	`is_private` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`is_single_page` integer DEFAULT false NOT NULL,
	`author` text NOT NULL,
	`tags` blob,
	`category` text,
	`created_by_admin` integer DEFAULT false NOT NULL,
	`lang` text NOT NULL,
	`supported_lang` blob NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`is_deleted` integer DEFAULT false NOT NULL,
	`difficulty` text DEFAULT 'easy' NOT NULL,
	`short_description` text DEFAULT '' NOT NULL,
	`is_guide` integer DEFAULT false NOT NULL,
	`use_plate` integer
);
--> statement-breakpoint
CREATE TABLE `content_user_quiz` (
	`user_id` text NOT NULL,
	`content_index_id` text NOT NULL,
	`content_id` text NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`correct_attempts` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`content_id`, `content_index_id`, `user_id`),
	FOREIGN KEY (`content_id`) REFERENCES `content`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`content_index_id`) REFERENCES `content_index`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `content` (
	`id` text PRIMARY KEY NOT NULL,
	`index_id` text NOT NULL,
	`slug` text,
	`name` text NOT NULL,
	`link` text,
	`renderedHTML` text,
	`content_slate` text,
	`is_locked` integer DEFAULT false NOT NULL,
	`is_premium` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`audio_track_playback_id` text,
	`audio_track_asset_id` text,
	`is_deleted` integer DEFAULT false NOT NULL,
	`is_checkpoint` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`index_id`) REFERENCES `content_index`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `course_approval` (
	`id` text PRIMARY KEY NOT NULL,
	`course_id` text NOT NULL,
	`link` text NOT NULL,
	`ready_for_approval` integer DEFAULT false NOT NULL,
	`added_categories` text,
	`status` text NOT NULL,
	`description` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`rejected_reason` text,
	`need_amendment_reason` text,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`added_tags` blob,
	FOREIGN KEY (`course_id`) REFERENCES `content_index`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `content_user_progress` (
	`id` text PRIMARY KEY NOT NULL,
	`index_id` text NOT NULL,
	`started_date` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`finished_date` text,
	`user_id` text NOT NULL,
	`progress` blob NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`index_id`) REFERENCES `content_index`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `content_share_token` (
	`id` text PRIMARY KEY NOT NULL,
	`index_id` text NOT NULL,
	`expires` blob,
	FOREIGN KEY (`index_id`) REFERENCES `content_index`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_email_unique` ON `profiles` (`email`);
*/