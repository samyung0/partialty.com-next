import { sqliteTable, AnySQLiteColumn, numeric, text, foreignKey, blob, uniqueIndex, integer, primaryKey } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const drizzleMigrations = sqliteTable("__drizzle_migrations", {
	id: numeric("id").primaryKey(),
	hash: text("hash").notNull(),
	createdAt: numeric("created_at"),
});

export const emailVerificationToken = sqliteTable("email_verification_token", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => profiles.id),
	expires: blob("expires"),
});

export const muxAssets = sqliteTable("mux_assets", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => profiles.id),
	name: text("name").notNull(),
});

export const profiles = sqliteTable("profiles", {
	id: text("id").primaryKey().notNull(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
	email: text("email"),
	phone: text("phone"),
	role: text("role").default("free").notNull(),
	stripeId: text("stripe_id"),
	username: text("username"),
	avatarUrl: text("avatar_url").notNull(),
	githubId: text("github_id"),
	googleId: text("google_id"),
	nickname: text("nickname").notNull(),
	emailVerified: integer("email_verified").default(false).notNull(),
	accessibleCoursesRead: text("accessible_courses_read"),
	accessibleCourses: text("accessible_courses"),
	githubInstallationId: text("github_installation_id"),
	favouriteCourses: blob("favourite_courses"),
},
(table) => {
	return {
		emailUnique: uniqueIndex("profiles_email_unique").on(table.email),
	}
});

export const userKey = sqliteTable("user_key", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => profiles.id),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
	hashedPassword: text("hashed_password"),
});

export const userSession = sqliteTable("user_session", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => profiles.id),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
	activeExpires: blob("active_expires").notNull(),
	idleExpires: blob("idle_expires").notNull(),
});

export const tag = sqliteTable("tag", {
	id: text("id").primaryKey().notNull(),
	slug: text("slug").notNull(),
	name: text("name").notNull(),
	link: text("link").notNull(),
	contentIndexId: blob("content_index_id").notNull(),
	approved: integer("approved").default(true).notNull(),
});

export const contentCategory = sqliteTable("content_category", {
	id: text("id").primaryKey().notNull(),
	slug: text("slug").notNull(),
	name: text("name").notNull(),
	link: text("link").notNull(),
	contentIndexId: blob("content_index_id").notNull(),
	approved: integer("approved").default(true).notNull(),
});

export const contentIndex = sqliteTable("content_index", {
	id: text("id").primaryKey().notNull(),
	slug: text("slug").notNull(),
	name: text("name").notNull(),
	chapterOrder: blob("chapter_order").notNull(),
	link: text("link"),
	isLocked: integer("is_locked").default(false).notNull(),
	isPremium: integer("is_premium").default(false).notNull(),
	isPrivate: integer("is_private").default(false).notNull(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
	updatedAt: text("updated_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
	isSinglePage: integer("is_single_page").default(false).notNull(),
	author: text("author").notNull(),
	tags: blob("tags"),
	category: text("category"),
	createdByAdmin: integer("created_by_admin").default(false).notNull(),
	lang: text("lang").notNull(),
	supportedLang: blob("supported_lang").notNull(),
	description: text("description").default("").notNull(),
	isDeleted: integer("is_deleted").default(false).notNull(),
	difficulty: text("difficulty").default("easy").notNull(),
	shortDescription: text("short_description").default("").notNull(),
	isGuide: integer("is_guide").default(false).notNull(),
	usePlate: integer("use_plate"),
});

export const contentUserQuiz = sqliteTable("content_user_quiz", {
	userId: text("user_id").notNull().references(() => profiles.id),
	contentIndexId: text("content_index_id").notNull().references(() => contentIndex.id),
	contentId: text("content_id").notNull().references(() => content.id),
	attempts: integer("attempts").default(0).notNull(),
	correctAttempts: integer("correct_attempts").default(0).notNull(),
},
(table) => {
	return {
		pk0: primaryKey({ columns: [table.contentId, table.contentIndexId, table.userId], name: "content_user_quiz_content_id_content_index_id_user_id_pk"})
	}
});

export const content = sqliteTable("content", {
	id: text("id").primaryKey().notNull(),
	indexId: text("index_id").notNull().references(() => contentIndex.id),
	slug: text("slug"),
	name: text("name").notNull(),
	link: text("link"),
	renderedHtml: text("renderedHTML"),
	contentSlate: text("content_slate"),
	isLocked: integer("is_locked").default(false).notNull(),
	isPremium: integer("is_premium").default(false).notNull(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
	updatedAt: text("updated_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
	audioTrackPlaybackId: text("audio_track_playback_id"),
	audioTrackAssetId: text("audio_track_asset_id"),
	isDeleted: integer("is_deleted").default(false).notNull(),
	isCheckpoint: integer("is_checkpoint").default(false).notNull(),
});

export const courseApproval = sqliteTable("course_approval", {
	id: text("id").primaryKey().notNull(),
	courseId: text("course_id").notNull().references(() => contentIndex.id),
	link: text("link").notNull(),
	readyForApproval: integer("ready_for_approval").default(false).notNull(),
	addedCategories: text("added_categories"),
	status: text("status").notNull(),
	description: text("description").notNull(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
	rejectedReason: text("rejected_reason"),
	needAmendmentReason: text("need_amendment_reason"),
	updatedAt: text("updated_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
	addedTags: blob("added_tags"),
});

export const contentUserProgress = sqliteTable("content_user_progress", {
	id: text("id").primaryKey().notNull(),
	indexId: text("index_id").notNull().references(() => contentIndex.id),
	startedDate: text("started_date").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
	finishedDate: text("finished_date"),
	userId: text("user_id").notNull().references(() => profiles.id),
	progress: blob("progress").notNull(),
});

export const contentShareToken = sqliteTable("content_share_token", {
	id: text("id").primaryKey().notNull(),
	indexId: text("index_id").notNull().references(() => contentIndex.id),
	expires: blob("expires"),
});